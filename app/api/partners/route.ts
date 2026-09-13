import { NextResponse } from "next/server";
import { fetchPartnersFromGoogleSheet, PartnerItem, DEFAULT_PARTNERS } from "@/lib/googleSheets";
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
  } catch (err) {
    console.error("Failed to save customPartners.json:", err);
    return false;
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
    const { partners } = body;

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
      statusBadge: (p.statusBadge || "Verified Partner").trim(),
      partnerType: (p.partnerType || "Authorized Gateway").trim(),
    }));

    const saved = saveCustomPartners(cleanedPartners);
    if (!saved) {
      return NextResponse.json(
        { success: false, error: "Failed to persist partners to server" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      source: "web_custom",
      hasCustomRows: true,
      count: cleanedPartners.length,
      data: cleanedPartners,
      message: "บันทึกข้อมูลพาร์ทเนอร์บนเว็บสำเร็จแล้ว",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
