"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [guestName, setGuestName] = useState("");

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white shadow p-6 rounded w-96 space-y-4">
        <h1 className="text-2xl font-bold text-center">Expense Splitter</h1>

        <input
          type="text"
          placeholder="Enter your name"
          className="border p-2 w-full"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
        />

        <button
          className="w-full bg-gray-500 text-white p-2 rounded"
          onClick={handleGuest}
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
