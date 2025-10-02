import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User"; // ✅ Corrected Import
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    // ✅ Ensure DB Connection
    await dbConnect();

    // ✅ Parse request body
    const { name, email, phone, password } = await req.json();

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
    }

    // ✅ Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create & Save New User
    const newUser = new User({
      uuid: uuidv4(),
      name,
      email,
      phone,
      passwordHash: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ success: true, message: "User registered successfully" }, { status: 201 });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}