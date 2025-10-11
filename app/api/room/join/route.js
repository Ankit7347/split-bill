import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Room from "@/models/Room";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    await dbConnect();

    const { roomCode, guestId, guestName } = await req.json();
    if (!roomCode) {
      return new Response("Room code is required", { status: 400 });
    }

    let guest;
    // If guestId is empty, create new guest
    if (!guestId || guestId.trim() === "") {
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      guest = await User.create({
        name: `${guestName}${randomNum}`,
        isGuest: true,
        uuid: uuidv4(),
      });
    } else {
      guest = await User.findOne({ uuid: guestId});
      if (!guest) {
        let newUuid = uuidv4();
        // If uuid already exists in any user, regenerate uuid
        const uuidExists = await User.findOne({ uuid: guestId });
        if (uuidExists) {
          newUuid = uuidv4();
        }
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        guest = await User.create({
          name: `${guestName}${randomNum}`,
          isGuest: true,
          uuid: newUuid,
        });
      }
    }

    // Find the room
    const room = await Room.findOne({ code: roomCode });
    if (!room) {
      return new Response("Room not found", { status: 404 });
    }

    // Add guest to room members if not already added
    if (!room.members.includes(guest.uuid)) {
      room.members.push(guest.uuid);
      await room.save();
    }

    // Populate members to return full objects
    const populatedRoom = await Room.findById(room._id)
      .populate({
        path: "members",
        select: "name -_id",
        localField: "members",
        foreignField: "uuid",
        model: "User",
      })
      .lean();

    return new Response(
      JSON.stringify({
        id: guest.uuid,
        name: guest.name,
        room: populatedRoom,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
