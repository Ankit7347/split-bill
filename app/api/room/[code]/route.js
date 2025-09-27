// app/api/room/[code]/route.js
import dbConnect from "@/lib/mongodb";
import Room from "@/models/Room";
import Expense from "@/models/Expense";

export async function GET(req) {
  await dbConnect();

  const url = new URL(req.url);
  const code = url.pathname.split("/").pop();
  if (!code) return new Response("Room code not provided", { status: 400 });

  // Populate members with name and _id
  const room = await Room.findOne({ code }).populate("members", "name _id");
  if (!room) return new Response("Room not found", { status: 404 });

  const expenses = await Expense.find({ roomId: room._id });

  return new Response(JSON.stringify({ room, expenses }), { status: 200 });
}
