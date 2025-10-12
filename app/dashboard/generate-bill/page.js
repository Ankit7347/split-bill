"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RestaurantBill from "@/components/student/RoomBill";

export default function GenerateBillPage() {
  const { data: session, status } = useSession();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setCurrentUser] = useState(); // Example room code

  useEffect(() => {
    const fetchData = async () => {
      if (status === "loading") return; // wait for session
      if (!session?.user) {
        setError("You must be logged in to view this page.");
        setLoading(false);
        return;
      }

      try {
        const code = "B1EVGW"; // You can also get this dynamically from params/searchParams
        const res = await fetch(`/api/room/${code}`);
        setCurrentUser(localStorage.getItem("guestId"));
        if (!res.ok) throw new Error("Failed to fetch room data");

        const json = await res.json();
        const user = session.user; // <-- user from NextAuth session
        // Filter expenses added by this user
        const userExpenses = json.expenses.filter(
          (e) =>
            e.addedBy === user.id ||
            e.addedBy === user._id || // in case id format differs
            e.addedBy === user.email // fallback if stored as email
        );

        setData({ user, expenses:userExpenses });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status]);

  if (loading || status === "loading")
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-red-400 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {data && <RestaurantBill user={userId} expenses={data.expenses} />}
    </div>
  );
}
