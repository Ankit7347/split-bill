import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ResetToken from "@/models/ResetToken";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const otp = searchParams.get("otp");

  if (!email || !otp) {
    return NextResponse.json({ valid: false });
  }

  await dbConnect();

  // Since TTL auto-deletes after 30 mins, just check for match
  const token = await ResetToken.findOne({
    email,
    token: otp,
  });

  return NextResponse.json({ valid: !!token });
}
