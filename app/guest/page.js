"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GuestPage() {
  const router = useRouter();
  const [guestName, setGuestName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const handleJoinRoom = () => {
    if (!roomCode) return alert("Please enter room code");
    router.push(`/room/${roomCode}`);
  };
  const handleGuest = async () => {
    if (!guestName) return alert("Please enter your name");

    const res = await fetch("/api/guest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: guestName }),
    });

    if (!res.ok) return alert("Guest creation failed");

    const data = await res.json();
    localStorage.setItem("guestId", data.id);
    localStorage.setItem("guestName", data.name);
    router.push(`/room/${data.guestRoom}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <Card className="max-w-lg w-full bg-white/90 backdrop-blur-md shadow-2xl border border-white/20 rounded-3xl animate-fadeIn">
            <CardContent className="flex flex-col items-center space-y-6 p-8">
              <h1 className="text-4xl font-extrabold text-gray-800 text-center drop-shadow-md">
                Expense Spiltter
              </h1>
              <p className="text-gray-600 text-center text-lg">
                Easily split bills and track expenses with friends. Create or
                join a room and manage expenses in seconds!
              </p>
              <input
                type="text"
                placeholder="Enter your name"
                className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
              <Button
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleGuest}
              >
                Continue as Guest
              </Button>
              <div className="flex items-center w-full space-x-2">
                <input
                  type="text"
                  placeholder="Enter room code"
                  className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                />
                <Button
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-all duration-300"
                  onClick={handleJoinRoom}
                >
                  Join
                </Button>
              </div>

              <p className="text-gray-500 text-sm text-center mt-2">
                No sign-up required. Start managing shared expenses instantly!
              </p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    </>
  );
}
