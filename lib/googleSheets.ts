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

import {
  DEFAULT_GROW_ERA_16_9,
  DEFAULT_LANDSCAPE_16_9,
} from "@/data/defaultPartnerImages";

// Default 2 Partner Websites (matching user Google Sheet and reference design)
export const DEFAULT_PARTNERS: PartnerItem[] = [
  {
    id: "partner-1",
    name: "Glow Era",
    category: "ความงาม",
    description:
      "Glow Era ธุรกิจบริการเสริมสวยนอกสถานที่ รับแต่งหน้า ทำผม ทำเล็บ ต่อขนตา และสปาเท้า สำหรับลูกค้าที่ไม่สะดวกในการเดินทาง ทางเราพร้อมเสิร์ฟความสะดวกสบายให้คุณถึงที่",
    websiteUrl: "https://en.wikipedia.org/wiki/Google",
    statusBadge: "บริการเสริมสวยนอกสถานที่",
    partnerType: "Authorized Gateway",
    imageUrl: "",
    logoUrl: "",
  },
  {
    id: "partner-2",
    name: "MM Nail",
    category: "ความงาม",
    description:
      "MM Nail คือแบรนด์เล็บจากประเทศไทยที่เกิดขึ้นจากความตั้งใจที่จะทำให้การทำเล็บเป็นมากกว่าความสวยงาม แต่เป็นพื้นที่ให้ทุกคนได้แสดงออกถึง ตัวตน สไตล์ และความคิดสร้างสรรค์ของตัวเอง",
    websiteUrl: "http://mmnailstudio.my.canva.site/",
    statusBadge: "ร้านทำเล็บ",
    partnerType: "Authorized Gateway",
    imageUrl: "",
    logoUrl: "",
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
 * Supports RFC 4180 CSV parsing (with newlines inside quoted cells),
 * auto-detection of column headers in both Thai and English,
 * and smart image detection with Google Drive conversion and luxury 16:9 fallbacks.
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
      headers: {
        Accept: "text/csv,text/plain,*/*",
      },
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
    const rows = parseCSV(csvText);

    if (rows.length === 0) {
      return {
        partners: DEFAULT_PARTNERS,
        source: "google_sheet",
        sheetUrl: targetUrl,
        hasCustomRows: false,
        message: "เชื่อมต่อ Google Sheet สำเร็จ แต่ยังไม่มีข้อมูลใน Sheet",
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
    let imgIdx = -1;

    headerRow.forEach((col, idx) => {
      if (
        col.includes("name") ||
        col.includes("ชื่อ") ||
        col.includes("แบรนด์") ||
        col.includes("partner")
      ) {
        if (nameIdx === -1) nameIdx = idx;
      } else if (
        col.includes("image") ||
        col.includes("img") ||
        col.includes("photo") ||
        col.includes("pic") ||
        col.includes("รูป") ||
        col.includes("ภาพ") ||
        col.includes("logo") ||
        col.includes("โลโก้")
      ) {
        if (imgIdx === -1) imgIdx = idx;
      } else if (
        col.includes("url") ||
        col.includes("link") ||
        col.includes("web") ||
        col.includes("เว็บ") ||
        col.includes("ลิงก์") ||
        col.includes("ลิ้งค์")
      ) {
        if (urlIdx === -1) urlIdx = idx;
      } else if (
        col.includes("cat") ||
        col.includes("หมวด") ||
        col.includes("ประเภทงาน")
      ) {
        if (catIdx === -1) catIdx = idx;
      } else if (
        col.includes("desc") ||
        col.includes("รายละ") ||
        col.includes("คำอธิบาย") ||
        col.includes("detail")
      ) {
        if (descIdx === -1) descIdx = idx;
      } else if (
        col.includes("badge") ||
        col.includes("status") ||
        col.includes("สถานะ")
      ) {
        if (badgeIdx === -1) badgeIdx = idx;
      } else if (
        col.includes("type") ||
        col.includes("ประเภท") ||
        col.includes("รูปแบบ")
      ) {
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
        message: "พบหัวตารางใน Google Sheet แต่ยังไม่มีแถวข้อมูล",
      };
    }

    const parsedPartners: PartnerItem[] = [];

    dataRows.forEach((row, i) => {
      // Find URL
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
        const candidate = row.find(
          (cell) => cell.trim() && cell !== websiteUrl && !isImageUrl(cell)
        );
        if (candidate) name = candidate;
      }

      // Skip completely empty row
      if (!name && !websiteUrl) return;

      const category =
        (catIdx !== -1 && row[catIdx]) ||
        row.find(
          (cell) =>
            cell !== name &&
            cell !== websiteUrl &&
            !isImageUrl(cell) &&
            cell.length < 40
        ) ||
        "Official Partner";

      const description =
        (descIdx !== -1 && row[descIdx]) ||
        row.find(
          (cell) =>
            cell !== name &&
            cell !== websiteUrl &&
            cell !== category &&
            !isImageUrl(cell) &&
            cell.length > 20
        ) ||
        "พันธมิตรธุรกิจร่วมกับ NOIRE Luxury Cosmetics Hub";

      const statusBadge =
        (badgeIdx !== -1 && row[badgeIdx]) || (i === 0 ? "AC" : "Verified Partner");

      const partnerType =
        (typeIdx !== -1 && row[typeIdx]) || "Authorized Gateway";

      // 16:9 Image resolution:
      // 1) From designated image column
      let imageUrl = "";
      if (imgIdx !== -1 && row[imgIdx]) {
        imageUrl = formatGoogleDriveUrl(row[imgIdx]);
      }

      // 2) If not found in imgIdx, scan row for any image URL
      if (!imageUrl) {
        const foundImg = row.find((cell) => isImageUrl(cell));
        if (foundImg) imageUrl = formatGoogleDriveUrl(foundImg);
      }

      // 3) If no image URL is provided in the sheet, keep empty so input box is clean (PartnerCard renders luxury fallback)
      if (!imageUrl) {
        imageUrl = "";
      }

      parsedPartners.push({
        id: `partner-${i + 1}`,
        name: name || `Partner ${i + 1}`,
        category,
        description,
        websiteUrl: formatUrl(websiteUrl || "#"),
        statusBadge,
        partnerType,
        imageUrl,
        logoUrl: imageUrl,
      });
    });

    if (parsedPartners.length === 0) {
      return {
        partners: DEFAULT_PARTNERS,
        source: "google_sheet",
        sheetUrl: targetUrl,
        hasCustomRows: false,
        message: "ไม่สามารถแปลงแถวข้อมูลใน Sheet ได้ จึงแสดงข้อมูลตัวอย่าง",
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

/**
 * Converts Google Drive share links into direct viewable image URLs
 * e.g. https://drive.google.com/file/d/123/view -> https://lh3.googleusercontent.com/d/123
 */
export function formatGoogleDriveUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`;
  }
  const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
  }
  return trimmed;
}

export function isImageUrl(str: string): boolean {
  if (!str) return false;
  const s = str.trim().toLowerCase();
  return (
    s.startsWith("data:image/") ||
    s.includes("drive.google.com") ||
    s.includes("googleusercontent.com") ||
    s.includes("imgur.com") ||
    s.includes("unsplash.com") ||
    /\.(png|jpe?g|webp|svg|gif)($|\?)/i.test(s)
  );
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

/**
 * RFC 4180 compliant CSV parser.
 * Handles multiline quoted text cells, embedded commas, and escaped quotes ("").
 */
export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote: "" -> "
        currentCell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = "";
    } else if ((char === "\r" || char === "\n") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        i++; // skip \n in \r\n
      }
      currentRow.push(currentCell.trim());
      currentCell = "";
      if (currentRow.some((c) => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((c) => c.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

