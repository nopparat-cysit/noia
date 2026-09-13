import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate mime type (images only)
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/png";

    // 1. Try saving to public/uploads/partners (works on local dev)
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "partners");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const extension = path.extname(file.name) || ".png";
      const cleanBaseName = path
        .basename(file.name, extension)
        .replace(/[^a-zA-Z0-9-_]/g, "_")
        .slice(0, 30);
      const filename = `partner_${Date.now()}_${cleanBaseName || "image"}${extension}`;
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/partners/${filename}`;

      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename,
        storageType: "local_disk",
        message: "อัปโหลดรูปภาพเข้าโฟลเดอร์ public/uploads/partners สำเร็จแล้ว",
      });
    } catch (fsErr: any) {
      // 2. Vercel Serverless fallback: Filesystem is read-only (EROFS).
      // Fallback safely to Base64 data URL so it NEVER crashes on Vercel!
      console.warn(
        "Serverless environment detected (read-only filesystem). Falling back to Base64 Data URL:",
        fsErr.message
      );

      const base64Data = buffer.toString("base64");
      const dataUrl = `data:${mimeType};base64,${base64Data}`;

      return NextResponse.json({
        success: true,
        url: dataUrl,
        filename: file.name,
        storageType: "base64_data_url",
        message: "อัปโหลดรูปภาพสำเร็จ (แปลงเป็น Data URL สำหรับ Serverless Host)",
      });
    }
  } catch (err: any) {
    console.error("Upload handler error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to process image" },
      { status: 500 }
    );
  }
}
