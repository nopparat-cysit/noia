export interface PartnerItem {
  id: string;
  name: string;
  category: string;
  description: string;
  websiteUrl: string;
  logoUrl?: string;
  statusBadge: string;
  partnerType: string;
}

// Default 2 Partner Websites (Fallback data if Google Sheet is not yet configured)
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

/**
 * Fetch partners from a public Google Sheet (published as CSV or via gviz)
 * Sheet format columns expected:
 * id, name, category, description, websiteUrl, statusBadge, partnerType
 */
export async function fetchPartnersFromGoogleSheet(sheetUrlOrId?: string): Promise<PartnerItem[]> {
  if (!sheetUrlOrId) {
    return DEFAULT_PARTNERS;
  }

  try {
    let fetchUrl = sheetUrlOrId;
    // If user provided a raw Sheet ID, construct the Google CSV export URL
    if (!sheetUrlOrId.startsWith("http")) {
      fetchUrl = `https://docs.google.com/spreadsheets/d/${sheetUrlOrId}/gviz/tq?tqx=out:csv`;
    } else if (sheetUrlOrId.includes("docs.google.com/spreadsheets") && !sheetUrlOrId.includes("out:csv")) {
      // Extract sheet ID from standard Google Sheets share link
      const match = sheetUrlOrId.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        fetchUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/gviz/tq?tqx=out:csv`;
      }
    }

    const response = await fetch(fetchUrl, { next: { revalidate: 60 } });
    if (!response.ok) {
      console.warn("Could not fetch Google Sheet, using fallback data.");
      return DEFAULT_PARTNERS;
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    if (rows.length < 2) {
      return DEFAULT_PARTNERS;
    }

    // Skip header row
    const dataRows = rows.slice(1);
    const parsedPartners: PartnerItem[] = dataRows
      .filter((row) => row.length >= 5 && row[1]) // must have name and website
      .map((row, idx) => ({
        id: row[0] || `partner-${idx + 1}`,
        name: row[1] || `Partner ${idx + 1}`,
        category: row[2] || "Business Partner",
        description: row[3] || "พันธมิตรธุรกิจร่วมกับ NOIRE Luxury Cosmetics Hub",
        websiteUrl: row[4] ? formatUrl(row[4]) : "#",
        statusBadge: row[5] || "Official Partner",
        partnerType: row[6] || "Authorized Partner",
      }));

    return parsedPartners.length > 0 ? parsedPartners : DEFAULT_PARTNERS;
  } catch (error) {
    console.error("Error fetching Google Sheet partners:", error);
    return DEFAULT_PARTNERS;
  }
}

function formatUrl(url: string): string {
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function parseCSV(text: string): string[][] {
  const lines = text.split(/\r?\n/);
  return lines.map((line) => {
    // Basic CSV cell parsing handling quotes
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
