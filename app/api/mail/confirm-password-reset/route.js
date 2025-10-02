// app/api/mail/reset-password/route.ts
import { NextResponse } from "next/server";
import ResetToken from "@/models/ResetToken";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { otp, password } = await req.json();
  await dbConnect();

  const tokenEntry = await ResetToken.findOne({ token: otp });
  if (!tokenEntry) return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.findOneAndUpdate({ email: tokenEntry.email }, { passwordHash: hashedPassword });
  await ResetToken.deleteOne({ token: otp }); // cleanup

  return NextResponse.json({ success: true });
}
