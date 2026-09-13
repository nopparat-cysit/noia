import { NextResponse } from "next/server";
import { fetchPartnersFromGoogleSheet } from "@/lib/googleSheets";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sheetParam = searchParams.get("sheetUrl") || undefined;

  const result = await fetchPartnersFromGoogleSheet(sheetParam);

  return NextResponse.json({
    success: true,
    source: result.source,
    sheetUrl: result.sheetUrl,
    hasCustomRows: result.hasCustomRows,
    message: result.message,
    count: result.partners.length,
    data: result.partners,
  });
}
