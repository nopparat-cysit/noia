export interface ProductItem {
  id: string;
  name: string;
  category: "makeup" | "lips" | "face" | "eyes" | "skincare" | "accessories";
  categoryLabel: string;
  badge?: string;
  status: "พร้อมส่ง" | "พรีออเดอร์";
  retailPrice: number;
  wholesalePrice: number;
  description: string;
  specs: {
    volume?: string;
    finish?: string;
    origin?: string;
    fdaNumber?: string;
    moq: number;
  };
  shades?: string[];
  imageUrl: string;
}

export interface WholesaleTier {
  id: "small" | "wholesale" | "bulk";
  tag: string;
  title: string;
  targetUser: string;
  moq: string;
  discountRange: string;
  features: string[];
  recommended?: boolean;
}

export interface PreorderStep {
  stepNumber: string;
  title: string;
  description: string;
  eta: string;
  detail: string;
}

export interface ComplianceItem {
  id: string;
  badgeYear: string;
  title: string;
  subtitle: string;
  detail: string;
  authority: string;
  statusText: string;
}

export interface ComparisonItem {
  criterion: string;
  grayMarket: {
    text: string;
    riskLevel: "high" | "critical";
    icon: string;
  };
  noireStandard: {
    text: string;
    verification: string;
    icon: string;
  };
}

export const NOIRE_PRODUCTS: ProductItem[] = [
  {
    id: "luminous-silk-foundation",
    name: "Luminous Silk Foundation",
    category: "face",
    categoryLabel: "ใบหน้า",
    badge: "NOIRE EXCLUSIVE",
    status: "พร้อมส่ง",
    retailPrice: 2500,
    wholesalePrice: 1800,
    description: "รองพื้นเนื้อลิควิดสัมผัสบางเบาดั่งใยไหม มอบงานผิวเรียบเนียนระดับไฮเอนด์ ผสานอนุภาคเมทัลลิกรีเฟล็กต์ช่วยกระจายแสงอย่างเป็นธรรมชาติ",
    specs: {
      volume: "30 ml",
      finish: "Luminous Satin Natural",
      origin: "ฝรั่งเศส (นำเข้าอย่างเป็นทางการ)",
      fdaNumber: "10-2-6600018492",
      moq: 12,
    },
    shades: ["#F6EDE3", "#EEDCC8", "#E2C7A8", "#D4B28E"],
    imageUrl: "/assets/products/foundation.png",
  },
  {
    id: "luminous-silk-lipstick",
    name: "Luminous Silk Lip Color",
    category: "lips",
    categoryLabel: "ริมฝีปาก",
    badge: "NOIRE EXCLUSIVE",
    status: "พร้อมส่ง",
    retailPrice: 2500,
    wholesalePrice: 1800,
    description: "ลิปสติกเคสแม่เหล็กสีดำด้านสลักตรา NOIRE เนื้อสัมผัสกำมะหยี่นุ่มละมุน ผสานไมโครโครเมียมพิกเมนต์ คมชัดติดทนนาน 12 ชั่วโมง",
    specs: {
      volume: "3.8 g",
      finish: "Velvet Satin Chrome",
      origin: "อิตาลี (นำเข้าอย่างเป็นทางการ)",
      fdaNumber: "10-2-6600021309",
      moq: 12,
    },
    shades: ["#89293B", "#B84852", "#9E3836", "#611C23"],
    imageUrl: "/assets/products/lipstick.png",
  },
  {
    id: "luminous-eyeshadow-palette",
    name: "Luminous Silk Eyeshadow Palette",
    category: "eyes",
    categoryLabel: "ดวงตา",
    badge: "NOIRE EXCLUSIVE",
    status: "พร้อมส่ง",
    retailPrice: 2500,
    wholesalePrice: 1800,
    description: "พาเลตต์อายแชโดว์ 9 เฉดสีระดับกูตูร์ ไล่เฉดจากชาร์โคลแมตต์ ซิลเวอร์โครมประกายระยิบระยับ จนถึงสีแชมเปญเมทัลลิก พิกเมนต์แน่นไม่ตกร่อง",
    specs: {
      volume: "12 g (9 shades)",
      finish: "Multi-Finish (Matte, Metallic, Foil)",
      origin: "ญี่ปุ่น (นำเข้าอย่างเป็นทางการ)",
      fdaNumber: "10-2-6600028741",
      moq: 12,
    },
    shades: ["#E7E7E9", "#A6A7AA", "#67686B", "#1C1D1F"],
    imageUrl: "/assets/products/eyeshadow.png",
  },
  {
    id: "luminous-silk-compact-powder",
    name: "Luminous Silk Compact Powder",
    category: "makeup",
    categoryLabel: "เมคอัพ",
    badge: "NOIRE EXCLUSIVE",
    status: "พรีออเดอร์",
    retailPrice: 2500,
    wholesalePrice: 1800,
    description: "แป้งอัดแข็งสูตรพรีเมียมในตลับโครเมียมทรงกลมหรูหรา ล็อคเมคอัพให้เนียนผ่อง ควบคุมความมันได้ยาวนานโดยไม่ทำให้ผิวแห้งกร้าน",
    specs: {
      volume: "10 g",
      finish: "Airbrush Soft-Focus",
      origin: "เกาหลีใต้ (นำเข้าตามมาตรฐาน LPI)",
      fdaNumber: "10-2-6600030514",
      moq: 24,
    },
    shades: ["#F9F4EE", "#F2E8DC", "#E6D6C3"],
    imageUrl: "/assets/products/cushion.png",
  },
  {
    id: "liquid-chrome-cell-serum",
    name: "Cellular Radiance Serum Elixir",
    category: "skincare",
    categoryLabel: "สกินแคร์",
    badge: "NOIRE EXCLUSIVE",
    status: "พร้อมส่ง",
    retailPrice: 2900,
    wholesalePrice: 2100,
    description: "เซรั่มเข้มข้นในขวดแก้วปรอทสะท้อนแสงทรงโมเดิร์น ฟื้นฟูเกราะป้องกันผิวล้ำลึก เสริมความเปล่งปลั่งและลดเลือนริ้วรอยด้วยเปปไทด์โครเมียมบริสุทธิ์",
    specs: {
      volume: "30 ml",
      finish: "Dewy Glow Absorption",
      origin: "สวิตเซอร์แลนด์ (นำเข้าอย่างเป็นทางการ)",
      fdaNumber: "10-2-6600041285",
      moq: 12,
    },
    imageUrl: "/assets/products/serum.png",
  },
  {
    id: "sculpting-chrome-brush-set",
    name: "Couture Chrome Sculpting Brush Set",
    category: "accessories",
    categoryLabel: "อุปกรณ์เสริม",
    badge: "NOIRE EXCLUSIVE",
    status: "พรีออเดอร์",
    retailPrice: 2200,
    wholesalePrice: 1550,
    description: "เซ็ตแปรงแต่งหน้าด้ามจับโลหะขัดเงาโครเมียม ขนแปรงวีแกนเกรดสังเคราะห์ระดับสูงสุด นุ่มละเอียดเกลี่ยผลิตภัณฑ์ได้แนบสนิทไร้ที่ติ",
    specs: {
      volume: "5 ชิ้นในเซ็ต พร้อมกระบอกหนังสีดำ",
      finish: "Liquid Chrome Ergonomic Handle",
      origin: "ญี่ปุ่น (นำเข้าตามมาตรฐาน อย.)",
      fdaNumber: "อุปกรณ์แต่งหน้ามาตรฐาน มอก./อย.",
      moq: 12,
    },
    imageUrl: "/assets/products/brushes.png",
  },
];

export const CATEGORIES = [
  { id: "all", label: "ทั้งหมด" },
  { id: "makeup", label: "เมคอัพ" },
  { id: "lips", label: "ริมฝีปาก" },
  { id: "face", label: "ใบหน้า" },
  { id: "eyes", label: "ดวงตา" },
  { id: "skincare", label: "สกินแคร์" },
  { id: "accessories", label: "อุปกรณ์เสริม" },
] as const;

export const WHOLESALE_TIERS: WholesaleTier[] = [
  {
    id: "small",
    tag: "SMALL ORDER",
    title: "สำหรับผู้เริ่มต้นธุรกิจ",
    targetUser: "ร้านค้าสตาร์ทอัพ, บิวตี้ครีเอเตอร์, ผู้เริ่มต้นสร้างแบรนด์หรือเปิดหน้าร้าน",
    moq: "ขั้นต่ำ 12 ชิ้น (คละหมวดหมู่ได้)",
    discountRange: "ส่วนลดราคาส่ง 28% จากราคาปลีก",
    features: [
      "สั่งซื้อขั้นต่ำเริ่มต้นเพียง 12 ชิ้น",
      "มีเอกสารรับรองมาตรฐาน อย. ครบถ้วน",
      "ฉลากภาษาไทยถูกต้องตาม พ.ร.บ. เครื่องสำอาง",
      "บริการจัดส่งทั่วประเทศ 1-2 วันทำการ",
      "รูปภาพและสื่อโปรโมทระดับพรีเมียมพร้อมใช้งาน",
    ],
  },
  {
    id: "wholesale",
    tag: "WHOLESALE",
    title: "สำหรับร้านค้าและตัวแทนจำหน่าย",
    targetUser: "ร้านค้าเครื่องสำอาง, คลินิกความงาม, บิวตี้สโตร์ที่มีหน้าร้านหรือช่องทางออนไลน์หลัก",
    moq: "ขั้นต่ำ 50 ชิ้นขึ้นไป",
    discountRange: "ส่วนลดราคาส่งสูงสุด 35% - 40%",
    features: [
      "สิทธิ์สั่งจองสต็อกล่วงหน้าก่อนเปิดตัวสาธารณะ",
      "รับประกันเอกสารนำเข้าผ่านระบบ LPI ทุกชิปเมนต์",
      "ระบบจัดส่งควบคุมอุณหภูมิพิเศษสำหรับเครื่องสำอาง",
      "ผู้จัดการดูแลบัญชีธุรกิจส่วนตัว (Dedicated Key Account)",
      "สิทธิ์เข้าร่วมแคมเปญโปรโมชั่นส่งเสริมการขายรายไตรมาส",
    ],
    recommended: true,
  },
  {
    id: "bulk",
    tag: "BULK ORDER",
    title: "สำหรับการสั่งซื้อและกระจายสินค้าจำนวนมาก",
    targetUser: "กลุ่มธุรกิจค้าปลีกขนาดใหญ่, ศูนย์กระจายสินค้า, แพลตฟอร์มมาร์เก็ตเพลสระดับประเทศ",
    moq: "ขั้นต่ำ 200+ ชิ้น หรือมูลค่าสั่งซื้อระดับล็อตใหญ่",
    discountRange: "เรตราคาส่งสั่งตัดพิเศษเฉพาะทาง (Custom Tier Pricing)",
    features: [
      "โครงสร้างราคาส่งที่ดีที่สุดสำหรับการแข่งขันในตลาด",
      "บริการนำเข้าตรงแบบชิปเมนต์เฉพาะราย (Dedicated Container)",
      "การจัดการและเคลียร์พิธีการศุลกากรแบบเบ็ดเสร็จ (F-I10-1 & LPI)",
      "บริการติดสติกเกอร์บาร์โค้ดและบรรจุภัณฑ์ตามสเปกของคลังสินค้า",
      "ข้อตกลงระดับการให้บริการ (SLA) รับประกันรอบส่งสินค้า",
    ],
  },
];

export const PREORDER_STEPS: PreorderStep[] = [
  {
    stepNumber: "01",
    title: "เลือกสินค้า",
    description: "คัดสรรสินค้าเครื่องสำอางระดับลักชัวรีจากแคตตาล็อก NOIRE หรือระบุรายการสินค้าที่ต้องการสั่งนำเข้าเป็นพิเศษ",
    eta: "ขั้นตอนทันที",
    detail: "ตรวจสอบข้อมูลสเปก รายละเอียดสูตร และเฉดสีผ่านระบบแคตตาล็อก",
  },
  {
    stepNumber: "02",
    title: "แจ้งจำนวนที่ต้องการ",
    description: "ระบุปริมาณสินค้าตามระดับคำสั่งซื้อ (Small / Wholesale / Bulk) เพื่อให้ระบบคำนวณส่วนลดที่ดีที่สุด",
    eta: "ภายใน 15 นาที",
    detail: "ระบบประเมินโควตาราคาส่งและระยะเวลารอบการผลิตอย่างแม่นยำ",
  },
  {
    stepNumber: "03",
    title: "ยืนยันคำสั่งซื้อ",
    description: "รับใบเสนอราคาอย่างเป็นทางการ (Official Quotation) พร้อมเงื่อนไขการจัดส่งและเอกสารข้อตกลงทางธุรกิจ",
    eta: "ภายในวันทำการ",
    detail: "ออกเอกสารข้อกำหนดและการรับประกันความถูกต้องตามกฎหมาย",
  },
  {
    stepNumber: "04",
    title: "ชำระเงิน",
    description: "ดำเนินการชำระเงินผ่านช่องทางธุรกิจที่มีความปลอดภัยสูง พร้อมรับใบกำกับภาษีเต็มรูปแบบอย่างถูกต้อง",
    eta: "รับประกันความปลอดภัย",
    detail: "รองรับการโอนบัญชีนิติบุคคลพร้อมระบบออกใบเสร็จรับเงินอัตโนมัติ",
  },
  {
    stepNumber: "05",
    title: "รอสินค้าจากต่างประเทศ",
    description: "สินค้าผลิตและจัดส่งจากโรงงานต้นทาง ผ่านศูนย์กระจายสินค้าระหว่างประเทศเข้าสู่คลัง NOIRE",
    eta: "7 - 14 วันทำการ",
    detail: "ผ่านกระบวนการ LPI, กองด่านอาหารและยา และกรมศุลกากรอย่างถูกต้อง 100%",
  },
  {
    stepNumber: "06",
    title: "จัดส่งถึงคุณอย่างปลอดภัย",
    description: "ตรวจสอบคุณภาพสินค้า QC รอบสุดท้าย บรรจุหีบห่ออย่างแน่นหนา และส่งตรงถึงหน้าร้านหรือคลังของคุณ",
    eta: "1 - 2 วันในประเทศ",
    detail: "ระบบขนส่งควบคุมคุณภาพ พร้อมเลข Tracking ตรวจสอบสถานะได้ตลอด 24 ชม.",
  },
];

export const COMPLIANCE_DATA: ComplianceItem[] = [
  {
    id: "act-2558",
    badgeYear: "๒๕๕๘",
    title: "พระราชบัญญัติเครื่องสำอาง พ.ศ. 2558",
    subtitle: "รับประกันการปฏิบัติตามกรอบความปลอดภัยระดับชาติ",
    detail: "สินค้าทุกรายการภายใต้ NOIRE ปฏิบัติตามหลักเกณฑ์ วิธีการ และเงื่อนไขการผลิตหรือนำเข้าเครื่องสำอางอย่างเคร่งครัด ได้รับการตรวจสอบมาตรฐานสารต้องห้ามตามประกาศกระทรวงสาธารณสุข",
    authority: "กระทรวงสาธารณสุข ประเทศไทย",
    statusText: "รับรองความถูกต้องตามกรอบกฎหมาย",
  },
  {
    id: "act-2565",
    badgeYear: "๒๕๖๕",
    title: "พ.ร.บ. เครื่องสำอาง (ฉบับที่ 2) พ.ศ. 2565",
    subtitle: "สอดคล้องกับการปรับปรุงกฎหมายล่าสุด และผ่านการประเมินจากผู้เชี่ยวชาญ",
    detail: "อัปเดตกระบวนการควบคุมตามข้อบัญญัติฉบับปรับปรุง พ.ศ. 2565 ครอบคลุมการควบคุมการโฆษณา การประเมินความปลอดภัยจากผู้เชี่ยวชาญ และความโปร่งใสในห่วงโซ่อุปทาน",
    authority: "สำนักงานคณะกรรมการอาหารและยา",
    statusText: "ผ่านเกณฑ์การประเมินฉบับปรับปรุงใหม่",
  },
  {
    id: "fda-100",
    badgeYear: "100%",
    title: "ผ่านการจดแจ้งจาก อย. 100%",
    subtitle: "สินค้าขายส่งและพรีออเดอร์ทุกชิ้น ผ่านกลุ่มควบคุมเครื่องสำอางก่อนถึงมือคุณ",
    detail: "ทุกชิ้นมีเลขที่ใบรับจดแจ้งเครื่องสำอางอย่างเป็นทางการ มีฉลากภาษาไทยระบุชื่อผู้ผลิต ผู้นำเข้า เลขที่จดแจ้ง ส่วนประกอบ และวันหมดอายุชัดเจน ไม่มีความเสี่ยงเรื่องสินค้าสวมสิทธิ์",
    authority: "กองควบคุมเครื่องสำอางและวัตถุอันตราย (อย.)",
    statusText: "ตรวจสอบเลขที่จดแจ้งได้จริง 100%",
  },
];

export const COMPARISON_DATA: ComparisonItem[] = [
  {
    criterion: "มาตรฐานการจัดหา (Sourcing Standards)",
    grayMarket: {
      text: "โรงงานที่ไม่สามารถยืนยันได้ (ไม่ทราบแหล่งผลิตจริง เสี่ยงสินค้าปลอมหรือตกสเปก)",
      riskLevel: "critical",
      icon: "Factory",
    },
    noireStandard: {
      text: "ยืนยันผ่านฐานข้อมูล อย. (THFDA Data Catalog: GMP Cosmetic) มีแหล่งกำเนิดโรงงานระดับสากลชัดเจน",
      verification: "ตรวจสอบผ่าน THFDA Data Catalog ได้ทันที",
      icon: "ShieldCheck",
    },
  },
  {
    criterion: "ความถูกต้องในการนำเข้า (Import Legality)",
    grayMarket: {
      text: "ลักลอบนำเข้า / เสี่ยงต่อการถูกยึดสินค้า ด่านศุลกากรสามารถอายัดได้ตลอดเวลา",
      riskLevel: "high",
      icon: "PackageX",
    },
    noireStandard: {
      text: "ถูกต้อง 100% ผ่านระบบ LPI (License per Invoice) และผ่านพิธีการศุลกากรอย่างสมบูรณ์",
      verification: "มีเอกสาร LPI และใบขนสินค้าขาเข้าทุกชิปเมนต์",
      icon: "CheckCircle2",
    },
  },
  {
    criterion: "ความเสี่ยงของร้านค้าปลีก (Retailer Liability)",
    grayMarket: {
      text: "รับความรับผิดชอบทางกฎหมายระดับสูง (เสี่ยงโดนปรับทางอาญา ยึดสินค้า หรือดำเนินคดี)",
      riskLevel: "critical",
      icon: "Gavel",
    },
    noireStandard: {
      text: "ไร้ความเสี่ยง ได้รับความคุ้มครองตาม พ.ร.บ. ปี 2565 พร้อมเอกสารสำแดงถูกต้องให้ตรวจสอบ",
      verification: "คุ้มครองร้านค้าปลีกด้วยเอกสารตัวจริงจากตัวแทนจำหน่าย",
      icon: "Scale",
    },
  },
];

export const LOGISTICS_NODES = {
  producer: {
    title: "ผู้ผลิตต่างประเทศ",
    subtitle: "โรงงานระดับลักชัวรีที่ได้มาตรฐาน GMP เครื่องสำอางสากล",
    steps: ["ตรวจสอบสูตรและใบรับรอง Certificate of Analysis (COA)", "บรรจุภัณฑ์ซีลสุญญากาศมาตรฐานพรีเมียม"],
  },
  hub: {
    title: "ศูนย์กลางโลจิสติกส์ NOIRE",
    subtitle: "ระบบควบคุมและบริหารจัดการนำเข้าแบบครบวงจร (Ecosystem Hub)",
    certifications: [
      {
        code: "การจดแจ้งกับกลุ่มควบคุมเครื่องสำอาง",
        desc: "ตรวจสอบส่วนผสมและสารต้องห้ามตามมาตรฐาน อย. ก่อนการนำเข้า",
        position: "top-left",
      },
      {
        code: "การยื่นขอ LPI (License per Invoice)",
        desc: "ยื่นขออนุญาตผ่านระบบ National Single Window สำหรับทุกชิปเมนต์",
        position: "top-right",
      },
      {
        code: "ยื่นแบบฟอร์ม F-I10-1",
        desc: "เอกสารรับรองสำหรับวัตถุดิบและส่วนประกอบระดับ Cosmetic Grade",
        position: "bottom-left",
      },
      {
        code: "เคลียร์พิธีการด่านศุลกากร และด่านอาหารและยา",
        desc: "ดำเนินกระบวนการตรวจปล่อยสินค้าพร้อมหนังสือมอบอำนาจถูกต้องตามระเบียบ",
        position: "bottom-right",
      },
    ],
  },
  retailer: {
    title: "ร้านค้าปลีกในไทย",
    subtitle: "กระจายสินค้าถึงหน้าร้าน คลินิก หรือคลังสินค้าอย่างปลอดภัย พร้อมขายได้ทันที",
    benefits: ["ฉลากภาษาไทยถูกต้อง 100%", "ใบเสร็จและใบกำกับภาษีครบถ้วน", "ไร้ความเสี่ยงทางกฎหมายทุกประการ"],
  },
};
