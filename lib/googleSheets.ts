export interface PartnerItem {
  id: string;
  name: string;
  category: string;
  description: string;
  websiteUrl: string;
  logoUrl?: string;
  imageUrl?: string;
  statusBadge: string;
  partnerType: string;
}

export const DEFAULT_GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1Ovfyx_npnC3COwX7TkLpBJ2OPc56kTqPUH9Bipn2qDY/edit?usp=sharing";

export const DEFAULT_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby91G0UtqFlxfvrcrc7rj9u2jY6_8-GXDtY3_vUcsDdb2EDAu0XopraHjh54sKg1oCcyQ/exec";

// Default 2 Partner Websites (Fallback data if Google Sheet is empty or loading)
export const DEFAULT_PARTNERS: PartnerItem[] = [
  {
    id: "partner-1",
    name: "NOIRE Global Logistics & Sourcing Network",
    category: "Official Logistics & Import Gateway",
    description:
      "ศูนย์กลางเครือข่ายโลจิสติกส์และการนำเข้าเครื่องสำอางระดับสากล บริหารจัดการพิธีการศุลกากรและตรวจสอบใบอนุญาต LPI ประจำภูมิภาค",
    websiteUrl: "https://porta.fda.moph.go.th/",
    statusBadge: "Verified Official Partner",
    partnerType: "Logistics & Compliance",
  },
  {
    id: "partner-2",
    name: "Couture Cosmetics Retail Alliance",
    category: "Premier Retail & Clinic Distribution Network",
    description:
      "พันธมิตรเครือข่ายร้านค้าปลีก คลินิกความงาม และศูนย์ความงามระดับไฮเอนด์ทั่วประเทศ จัดจำหน่ายเครื่องสำอางแบรนด์ NOIRE ภายใต้มาตรฐาน อย. 100%",
    websiteUrl: "https://pertento.fda.moph.go.th/FDA_SEARCH_CENTER/PRODUCT/FRM_SEARCH_CMT.aspx",
    statusBadge: "Authorized Distributor",
    partnerType: "B2B Retail Platform",
  },
];

export interface FetchPartnersResult {
  partners: PartnerItem[];
  source: "google_sheet" | "fallback_default";
  sheetUrl: string;
  hasCustomRows: boolean;
  message?: string;
}

/**
 * Robust fetcher that connects to any public Google Sheet link.
 * Supports auto-detection of column headers in both Thai and English.
 */
export async function fetchPartnersFromGoogleSheet(
  sheetUrlOrId?: string
): Promise<FetchPartnersResult> {
  const targetUrl =
    sheetUrlOrId ||
    process.env.GOOGLE_SHEETS_PARTNERS_URL ||
    DEFAULT_GOOGLE_SHEET_URL;

  let csvExportUrl = targetUrl;
  const match = targetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  const sheetId = match ? match[1] : targetUrl;

  if (sheetId && !sheetId.startsWith("http")) {
    csvExportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
  }

  try {
    const response = await fetch(csvExportUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(`[GoogleSheets] HTTP ${response.status} fetching sheet, using fallback.`);
      return {
        partners: DEFAULT_PARTNERS,
        source: "fallback_default",
        sheetUrl: targetUrl,
        hasCustomRows: false,
        message: "ไม่สามารถเข้าถึง Google Sheet ได้ ชั่วคราวใช้ข้อมูลสำรอง",
      };
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText).filter((row) => row.some((cell) => cell.trim().length > 0));

    // If sheet has no rows or only 0 bytes
    if (rows.length === 0) {
      return {
        partners: DEFAULT_PARTNERS,
        source: "google_sheet",
        sheetUrl: targetUrl,
        hasCustomRows: false,
        message: "เชื่อมต่อ Google Sheet สำเร็จ แต่ยังไม่มีข้อมูลใน Sheet (กำลังแสดงข้อมูลตัวอย่าง 2 เว็บไซต์)",
      };
    }

    // Determine header mapping
    const headerRow = rows[0].map((h) => h.toLowerCase().trim());
    let nameIdx = -1;
    let urlIdx = -1;
    let catIdx = -1;
    let descIdx = -1;
    let badgeIdx = -1;
    let typeIdx = -1;

    headerRow.forEach((col, idx) => {
      if (col.includes("name") || col.includes("ชื่อ") || col.includes("แบรนด์") || col.includes("partner")) {
        if (nameIdx === -1) nameIdx = idx;
      } else if (
        col.includes("url") ||
        col.includes("link") ||
        col.includes("web") ||
        col.includes("เว็บ") ||
        col.includes("ลิงก์") ||
        col.includes("ลิ้งค์")
      ) {
        if (urlIdx === -1) urlIdx = idx;
      } else if (col.includes("cat") || col.includes("หมวด") || col.includes("ประเภทงาน")) {
        if (catIdx === -1) catIdx = idx;
      } else if (col.includes("desc") || col.includes("รายละ") || col.includes("คำอธิบาย") || col.includes("detail")) {
        if (descIdx === -1) descIdx = idx;
      } else if (col.includes("badge") || col.includes("status") || col.includes("สถานะ")) {
        if (badgeIdx === -1) badgeIdx = idx;
      } else if (col.includes("type") || col.includes("ประเภท") || col.includes("รูปแบบ")) {
        if (typeIdx === -1) typeIdx = idx;
      }
    });

    const isFirstRowHeader = nameIdx !== -1 || urlIdx !== -1 || catIdx !== -1;
    const dataRows = isFirstRowHeader ? rows.slice(1) : rows;

    if (dataRows.length === 0) {
      return {
        partners: DEFAULT_PARTNERS,
        source: "google_sheet",
        sheetUrl: targetUrl,
        hasCustomRows: false,
        message: "พบหัวตารางใน Google Sheet แต่ยังไม่มีแถวข้อมูล (กำลังแสดงข้อมูลตัวอย่าง 2 เว็บไซต์)",
      };
    }

    const parsedPartners: PartnerItem[] = [];

    dataRows.forEach((row, i) => {
      // Find URL if not strictly mapped
      let websiteUrl = "";
      if (urlIdx !== -1 && row[urlIdx]) {
        websiteUrl = row[urlIdx];
      } else {
        const foundUrl = row.find((cell) => isPotentialUrl(cell));
        if (foundUrl) websiteUrl = foundUrl;
      }

      // Find Name
      let name = "";
      if (nameIdx !== -1 && row[nameIdx]) {
        name = row[nameIdx];
      } else {
        const candidate = row.find((cell) => cell.trim() && cell !== websiteUrl);
        if (candidate) name = candidate;
      }

      if (!name && !websiteUrl) return; // skip completely blank row

      const category =
        (catIdx !== -1 && row[catIdx]) ||
        row.find((cell) => cell !== name && cell !== websiteUrl && cell.length < 40) ||
        "Official Partner";

      const description =
        (descIdx !== -1 && row[descIdx]) ||
        row.find((cell) => cell !== name && cell !== websiteUrl && cell !== category && cell.length > 20) ||
        "พันธมิตรธุรกิจร่วมกับ NOIRE Luxury Cosmetics Hub";

      const statusBadge = (badgeIdx !== -1 && row[badgeIdx]) || "Verified Partner";
      const partnerType = (typeIdx !== -1 && row[typeIdx]) || "Authorized Gateway";

      parsedPartners.push({
        id: `partner-${i + 1}`,
        name: name || `Partner ${i + 1}`,
        category,
        description,
        websiteUrl: formatUrl(websiteUrl || "https://porta.fda.moph.go.th/"),
        statusBadge,
        partnerType,
      });
    });

    if (parsedPartners.length === 0) {
      return {
        partners: DEFAULT_PARTNERS,
        source: "google_sheet",
        sheetUrl: targetUrl,
        hasCustomRows: false,
        message: "ไม่สามารถแปลงแถวข้อมูลใน Sheet ได้ จึงแสดงข้อมูลตัวอย่าง 2 เว็บไซต์",
      };
    }

    return {
      partners: parsedPartners,
      source: "google_sheet",
      sheetUrl: targetUrl,
      hasCustomRows: true,
    };
  } catch (error) {
    console.error("[GoogleSheets] Error fetching partners:", error);
    return {
      partners: DEFAULT_PARTNERS,
      source: "fallback_default",
      sheetUrl: targetUrl,
      hasCustomRows: false,
    };
  }
}

function isPotentialUrl(str: string): boolean {
  const s = str.trim().toLowerCase();
  return (
    s.startsWith("http://") ||
    s.startsWith("https://") ||
    s.startsWith("www.") ||
    s.includes(".com") ||
    s.includes(".co.th") ||
    s.includes(".go.th") ||
    s.includes(".org") ||
    s.includes(".net")
  );
}

function formatUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed || trimmed === "#") return "#";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function parseCSV(text: string): string[][] {
  const lines = text.split(/\r?\n/);
  return lines.map((line) => {
    const cells: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        cells.push(current.trim().replace(/^"(.*)"$/, "$1"));
        current = "";
      } else {
        current += char;
      }
    }
    cells.push(current.trim().replace(/^"(.*)"$/, "$1"));
    return cells;
  });
}
