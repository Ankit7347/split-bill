import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Room from "@/models/Room";

export async function POST(req) {
  await dbConnect();

  const { code, name } = await req.json();
  if (!code || !name || name.trim() === "") {
    return new Response("Room code and name are required", { status: 400 });
  }

  // Find the room
  const room = await Room.findOne({ code });
  if (!room) {
    return new Response("Room not found", { status: 404 });
  }

  // Create a new guest user
  const guest = await User.create({
    name: name.trim(),
    isGuest: true,
  });

  // Add guest to room members if not already added
  if (!room.members.includes(guest._id)) {
    room.members.push(guest._id);
    await room.save();
  }

  return new Response(
    JSON.stringify({
      id: guest._id,
      name: guest.name,
      room: room,
    }),
    { status: 200 }
  );
}
