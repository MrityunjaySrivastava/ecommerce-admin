import { NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinary";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { error: "No file uploaded" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "ecommerce-products" }, (err, res) => {
        if (err) reject(err);
        resolve(res);
      })
      .end(buffer);
  });

  return NextResponse.json({ url: result.secure_url });
}
