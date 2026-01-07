import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Product from "../../../../models/Product";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await dbConnect();
  const product = await Product.findById(id);

  return NextResponse.json(product);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  await dbConnect();
  const updated = await Product.findByIdAndUpdate(id, body, {
    new: true,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await dbConnect();
  await Product.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
