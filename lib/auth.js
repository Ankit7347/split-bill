// TypeScript type import removed
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import User from "@/models/User";
// TypeScript type import removed
import { getServerSession } from "next-auth/next";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(
          credentials?.password || "",
          user.passwordHash
        );
        if (!isMatch) throw new Error("Invalid credentials");

        return {
          id: user.uuid,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // Include custom properties
        };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
export const getServerAuthSession = () => getServerSession(authOptions);
