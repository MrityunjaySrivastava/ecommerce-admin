import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Admin from "../../../models/Admin";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await dbConnect();

    const exists = await Admin.findOne({ email: "admin@demo.com" });
    if (exists) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await Admin.create({
      email: "admin@demo.com",
      password: hashedPassword,
    });

    return NextResponse.json({
      message: "Dummy admin created",
      credentials: {
        email: "admin@demo.com",
        password: "Admin@123",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
