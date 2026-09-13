import { NextResponse } from "next/server";
import { fetchPartnersFromGoogleSheet, DEFAULT_PARTNERS } from "@/lib/googleSheets";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sheetParam = searchParams.get("sheetUrl") || process.env.GOOGLE_SHEETS_PARTNERS_URL;

  const partners = await fetchPartnersFromGoogleSheet(sheetParam || undefined);

  return NextResponse.json({
    success: true,
    source: sheetParam ? "google_sheet" : "default_database",
    count: partners.length,
    data: partners,
  });
}
