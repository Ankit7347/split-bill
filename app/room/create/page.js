"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CreateRoomPage() {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!roomName.trim()) {
      setError("Room name is required.");
      return;
    }
    try {
      // You may want to get userId from session or context
      const userId = null; // TODO: Replace with actual userId
      const res = await fetch("/api/room/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, roomName }),
      });
      if (!res.ok) throw new Error("Failed to create room");
      const data = await res.json();
      router.push(`/room/${data.code}`);
    } catch (err) {
      setError("Could not create room. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-black dark:from-gray-900 dark:via-purple-900 dark:to-black text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center gap-6 border border-gray-200 dark:border-gray-800">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Create a Room
          </h1>
          <form
            onSubmit={handleCreateRoom}
            className="w-full flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Room Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold shadow hover:scale-105 transition-transform duration-200"
            >
              Create Room
            </button>
          </form>
          {error && (
            <p className="w-full text-center text-red-500 font-medium mt-2">
              {error}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
