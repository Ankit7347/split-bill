import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Room from "@/models/Room";

export async function GET(req) {
  await dbConnect();

  const url = new URL(req.url);
  const guestId = url.searchParams.get("id");
  if (!guestId) return new Response("Guest ID not provided", { status: 400 });

  const guest = await User.findById(guestId);
  if (!guest || !guest.isGuest)
    return new Response("Guest not found", { status: 404 });

  const room = await Room.findOne({ members: guest._id }).sort({ _id: -1 });
  if (!room) return new Response("Room not found", { status: 404 });

  return new Response(JSON.stringify({ guestRoom: room.code }), { status: 200 });
}
