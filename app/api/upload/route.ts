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

    // Limit size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Target directory: public/uploads/partners/
    const uploadDir = path.join(process.cwd(), "public", "uploads", "partners");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Safe filename with timestamp
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
      message: "อัปโหลดรูปภาพเข้าโฟลเดอร์ public/uploads/partners สำเร็จแล้ว",
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
