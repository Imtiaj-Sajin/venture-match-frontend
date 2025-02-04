import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as Blob;

  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(process.cwd(), "public/news", filename);
  const buffer = await file.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));

  return NextResponse.json({ imageUrl: `/news/${filename}` });
}
