import { NextResponse } from "next/server";
import {
  fetchPartnersFromGoogleSheet,
  PartnerItem,
  DEFAULT_PARTNERS,
  DEFAULT_APPS_SCRIPT_URL,
} from "@/lib/googleSheets";
import fs from "fs";
import path from "path";

const CUSTOM_FILE_PATH = path.join(process.cwd(), "data", "customPartners.json");

function getCustomPartners(): PartnerItem[] | null {
  try {
    if (fs.existsSync(CUSTOM_FILE_PATH)) {
      const fileData = fs.readFileSync(CUSTOM_FILE_PATH, "utf-8");
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Failed to read customPartners.json:", err);
  }
  return null;
}

function saveCustomPartners(partners: PartnerItem[]): boolean {
  try {
    const dir = path.dirname(CUSTOM_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CUSTOM_FILE_PATH, JSON.stringify(partners, null, 2), "utf-8");
    return true;
  } catch (err: any) {
    // Vercel Serverless environment has read-only filesystem (EROFS)
    console.warn(
      "Read-only filesystem on host (Vercel Serverless), skipping local file write:",
      err.message
    );
    return true;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sourceParam = searchParams.get("source"); // 'custom' | 'sheet' | 'auto'
  const sheetParam = searchParams.get("sheetUrl") || undefined;

  // 1. Explicitly requested custom data
  if (sourceParam === "custom") {
    const custom = getCustomPartners();
    if (custom) {
      return NextResponse.json({
        success: true,
        source: "web_custom",
        hasCustomRows: true,
        count: custom.length,
        data: custom,
      });
    }
  }

  // 2. Fetch from Google Sheet
  const sheetResult = await fetchPartnersFromGoogleSheet(sheetParam);

  // If sheet has custom rows or was explicitly requested
  if (sourceParam === "sheet" || sheetResult.hasCustomRows) {
    return NextResponse.json({
      success: true,
      source: sheetResult.source,
      sheetUrl: sheetResult.sheetUrl,
      hasCustomRows: sheetResult.hasCustomRows,
      message: sheetResult.message,
      count: sheetResult.partners.length,
      data: sheetResult.partners,
    });
  }

  // 3. Auto fallback: check if we have saved web custom partners
  const custom = getCustomPartners();
  if (custom) {
    return NextResponse.json({
      success: true,
      source: "web_custom",
      sheetUrl: sheetResult.sheetUrl,
      hasCustomRows: true,
      count: custom.length,
      data: custom,
    });
  }

  // 4. Default fallback
  return NextResponse.json({
    success: true,
    source: "default_database",
    sheetUrl: sheetResult.sheetUrl,
    hasCustomRows: false,
    message: sheetResult.message,
    count: DEFAULT_PARTNERS.length,
    data: DEFAULT_PARTNERS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { partners, appsScriptUrl } = body;

    if (!Array.isArray(partners) || partners.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid partners list provided" },
        { status: 400 }
      );
    }

    const cleanedPartners: PartnerItem[] = partners.map((p, idx) => ({
      id: p.id || `partner-${idx + 1}`,
      name: (p.name || `Partner ${idx + 1}`).trim(),
      category: (p.category || "Official Partner").trim(),
      description: (p.description || "").trim(),
      websiteUrl: (p.websiteUrl || "#").trim(),
      imageUrl: (p.imageUrl || p.logoUrl || "").trim() || undefined,
      logoUrl: (p.logoUrl || p.imageUrl || "").trim() || undefined,
      statusBadge: (p.statusBadge || "Verified Partner").trim(),
      partnerType: (p.partnerType || "Authorized Gateway").trim(),
    }));

    // Save to local file storage
    const saved = saveCustomPartners(cleanedPartners);
    if (!saved) {
      return NextResponse.json(
        { success: false, error: "Failed to persist partners to server" },
        { status: 500 }
      );
    }

    // Two-way sync: Forward to Google Apps Script Web App URL
    const scriptEndpoint =
      appsScriptUrl ||
      process.env.GOOGLE_APPS_SCRIPT_WEBAPP_URL ||
      DEFAULT_APPS_SCRIPT_URL;

    let sheetSyncResult: "synced_to_google_sheet" | "sync_failed" | "unauthorized" | null = null;

    if (scriptEndpoint && scriptEndpoint.startsWith("http")) {
      try {
        const scriptRes = await fetch(scriptEndpoint, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ partners: cleanedPartners }),
          redirect: "follow",
        });

        const resText = await scriptRes.text();
        const isUnauthorized =
          scriptRes.status === 401 ||
          scriptRes.url.includes("accounts.google.com") ||
          resText.includes("ServiceLogin") ||
          resText.includes("Sign in - Google Accounts");

        if (isUnauthorized) {
          console.warn("[GoogleAppsScript] Received 401 / Google Login redirect. Who has access must be set to Anyone.");
          sheetSyncResult = "unauthorized";
        } else if (scriptRes.ok || scriptRes.status === 200 || resText.includes('"success"')) {
          sheetSyncResult = "synced_to_google_sheet";
        } else {
          console.warn("[GoogleAppsScript] Sync returned non-ok status:", scriptRes.status, resText);
          sheetSyncResult = "sync_failed";
        }
      } catch (syncErr) {
        console.warn("Could not sync to Google Apps Script endpoint:", syncErr);
        sheetSyncResult = "sync_failed";
      }
    }

    let userMessage = "บันทึกข้อมูลพาร์ทเนอร์บนเว็บสำเร็จแล้ว";
    if (sheetSyncResult === "synced_to_google_sheet") {
      userMessage = "บันทึกบนเว็บและอัปเดตลง Google Sheet ของคุณเรียบร้อยแล้ว!";
    } else if (sheetSyncResult === "unauthorized") {
      userMessage =
        "บันทึกบนเว็บสำเร็จแล้ว (Google Apps Script ยังรอการตั้งค่าสิทธิ์เป็น 'Anyone / ทุกคน' เพื่อให้อัปเดตลง Sheet อัตโนมัติ)";
    }

    return NextResponse.json({
      success: true,
      source: "web_custom",
      hasCustomRows: true,
      count: cleanedPartners.length,
      data: cleanedPartners,
      sheetSync: sheetSyncResult,
      message: userMessage,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
