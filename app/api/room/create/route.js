import dbConnect from "@/lib/mongodb";
import Room from "@/models/Room";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  await dbConnect();
  const { userId, roomName } = await req.json();

  const room = await Room.create({
    name: roomName,
    code: uuidv4(),
    createdBy: userId,
    members: [userId],
  });

  return new Response(JSON.stringify(room), { status: 200 });
}
