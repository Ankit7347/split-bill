import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Room from "@/models/Room";
import mongoose from "mongoose";

export async function POST(req) {
  await dbConnect();

  const { roomCode, guestId, guestName } = await req.json();
  if (!roomCode) {
    return new Response("Room code is required", { status: 400 });
  }

  let guest;
  // If guestId is empty, create new guest
  if (!guestId || guestId.trim() === "") {
    let nameToUse = guestName;
    // Check if guestName already exists
    const existingGuest = await User.findOne({ name: guestName, isGuest: true });
    if (existingGuest) {
      // Append random 5-digit number to name
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      nameToUse = `${guestName}${randomNum}`;
    }
    guest = await User.create({ name: nameToUse, isGuest: true });
  } else {
    guest = await User.findOne({ _id: new mongoose.Types.ObjectId(guestId), isGuest: true });
    if (!guest) {
      let nameToUse = guestName;
      const existingGuest = await User.findOne({ name: guestName, isGuest: true });
      if (existingGuest) {
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        nameToUse = `${guestName}${randomNum}`;
      }
      guest = await User.create({ name: nameToUse, isGuest: true });
    }
  }

  // Find the room
  const room = await Room.findOne({ code: roomCode });
  if (!room) {
    return new Response("Room not found", { status: 404 });
  }

  // Add guest to room members if not already added
  if (!room.members.includes(guest._id)) {
    room.members.push(guest._id);
    await room.save();
  }

  // Populate members to return full objects
  const populatedRoom = await Room.findById(room._id).populate(
    "members",
    "name _id"
  );

  return new Response(
    JSON.stringify({
      id: guest._id,
      name: guest.name,
      room: populatedRoom,
    }),
    { status: 200 }
  );
}
