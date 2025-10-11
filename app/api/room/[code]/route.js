// app/api/room/[code]/route.js
import dbConnect from "@/lib/mongodb";
import Room from "@/models/Room";
import Expense from "@/models/Expense";

export async function GET(req) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const code = url.pathname.split("/").pop();
    if (!code) return new Response("Room code not provided", { status: 400 });

    // Populate members with name and _id
    const room = await Room.findOne({ code }, { _id: 0, __v: 0 })
      .populate({
        path: "members",
        select: "name -_id",
        localField: "members",
        foreignField: "uuid",
        model: "User",
      })
      .populate({
        path: "createdBy",
        select: "name -_id",
        localField: "createdBy",
        foreignField: "uuid",
        model: "User",
      });
    if (!room) return new Response("Room not found", { status: 404 });

    const expenses = await Expense.find({ roomId: room._id });

    return new Response(JSON.stringify({ room, expenses }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Server error", { status: 500 });
  }
}
