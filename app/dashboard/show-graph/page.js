"use client";

import { useEffect, useState } from "react";
import RoomExpenseGraph from "@/components/student/RoomExpenseGraph";

export default function ShowGraphPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const code = "B1EVGW"; // <-- move this here!
        const guestId = localStorage.getItem("guestId");
        const guestName = localStorage.getItem("guestName");
        if (!code || !guestId || !guestName) {
          setError("Missing room code or guest info.");
          setLoading(false);
          return;
        }
        const res = await fetch(`/api/room/${code}`);
        if (!res.ok) throw new Error("Failed to fetch room data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">
        Room Expense Graph
      </h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400 font-semibold mb-4">{error}</p>}
      {data && <RoomExpenseGraph data={data} />}
    </div>
  );
}
