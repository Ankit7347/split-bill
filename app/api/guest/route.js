import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Room from "@/models/Room";
import { nanoid } from "nanoid";

export async function POST(req) {
  await dbConnect();
  const { name } = await req.json();

  if (!name || name.trim() === "")
    return new Response("Name is required", { status: 400 });

  // Create guest user
  const guest = await User.create({
    name: name.trim(),
    isGuest: true,
  });

  // Create a room for the guest
  const roomCode = nanoid(6).toUpperCase();
  const room = await Room.create({
    name: `${guest.name}'s Room`,
    code: roomCode,
    createdBy: guest._id,
    members: [guest._id],
  });

  return new Response(
    JSON.stringify({
      id: guest._id,
      guestRoom: room.code,
      name: guest.name,
    }),
    { status: 200 }
  );
}
