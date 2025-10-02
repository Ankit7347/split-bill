import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ResetToken from "@/models/ResetToken";
import User from "@/models/User";

export async function POST(req) {
	try {
		// Attempt to parse the JSON body
		let body;
		try {
			body = await req.json();
		} catch(error) {
			return NextResponse.json({ errors: "Invalid or missing JSON body",error:error }, { status: 400 });
		}
		const { email, otp } = body; // Destructure email and otp from the parsed body
		// Parse the request body

		if (!email || !otp) {
			return NextResponse.json({ error: "Missing params" }, { status: 400 });
		}

		await dbConnect();
		// Check if the email exists in the database
		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json({ success: false, error: "Email not found" }, { status: 404 });
		}

		await ResetToken.findOneAndUpdate(
			{ email },
			{
				email,
				token: otp,
				createdAt: new Date(), // Manually reset to extend TTL
			},
			{ upsert: true, new: true }
		);

		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
	}
}
