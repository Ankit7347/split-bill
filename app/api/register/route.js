import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await dbConnect();
  const { name, email, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    isGuest: false,
  });

  return new Response(JSON.stringify({ id: user._id }), { status: 200 });
}
