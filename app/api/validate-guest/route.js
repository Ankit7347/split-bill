import { getToken } from "next-auth/jwt";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    await dbConnect();

    const { guestId, guestName } = await req.json();
    // Check next-auth token
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (token?.user?.id) {
      // Logged-in user → return user info
      return NextResponse.json(
        {
          user: {
            uuid: token.user.id,
            name: token.user.name,
            isGuest: false,
          },
          updateUser: false,
        },
        { status: 200 }
      );
    }

    // Optionally, check guestId in DB
    const guest = await User.findOne({
      uuid: guestId,
      name: guestName,
      isGuest: true,
    });
    if (!guest) {
      // Invalid guest → don't overwrite localStorage
      return NextResponse.json({ message: "Invalid guest", updateUser: true }, { status: 200 });
    }

    // Valid guest → return guest info
    return NextResponse.json(
      {
        user: {
          uuid: guest.uuid,
          name: guest.name,
          isGuest: true,
        },
        updateUser: false,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
