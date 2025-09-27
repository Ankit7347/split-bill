import dbConnect from "@/lib/mongodb";
import Expense from "@/models/Expense";

export async function POST(req) {
  await dbConnect();

  const { roomId, addedBy, description, amount, splitAmong } =
    await req.json();

  if (!roomId || !addedBy || !description || !amount || !splitAmong)
    return new Response("Missing fields", { status: 400 });

  const perHead = amount / splitAmong.length;

  const expense = await Expense.create({
    roomId,
    addedBy,
    description,
    amount,
    splitAmong,
    perHead,
  });

  return new Response(JSON.stringify(expense), { status: 200 });
}
