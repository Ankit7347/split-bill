"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import BalanceTable from "@/components/BalanceTable";
import ExpensesList from "@/components/ExpensesList";
import Loading from "@/components/data-loading/Loading";

export default function RoomPage() {
  const { code } = useParams();
  const [room, setRoom] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ description: "", amount: "" });
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // guestId + name
  const [showModal, setShowModal] = useState(false); // invalid room
  const [showJoinPrompt, setShowJoinPrompt] = useState(false); // new user not in room
  const [guestName, setGuestName] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("guestName") || "" : ""
  );
  const [guestId, setGuestId] = useState("");
  const [memberMap, setMemberMap] = useState({});

  const roomUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (!room) return;
    const map = {};
    room.members.forEach((m) => {
      map[m.uuid] = m.name;
    });
    setMemberMap(map);
  }, [room]);

  useEffect(() => {
    const guestId = localStorage.getItem("guestId");
    const guestName = localStorage.getItem("guestName");
    setGuestId(guestId);
    fetch(`/api/room/${code}`)
      .then((res) => {
        if (!res.ok) {
          setShowModal(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        const normalizedMembers = data.room.members.map((m) => ({
          ...m,
          _id: m.uuid,
        }));
        setRoom({ ...data.room, members: normalizedMembers });
        setExpenses(data.expenses || []);
        setSelectedMembers(normalizedMembers.map((m) => m.uuid));

        if (guestId && normalizedMembers.find((m) => m.uuid === guestId)) {
          setCurrentUser({ id: guestId, name: guestName });
        } else {
          setShowJoinPrompt(true);
        }
      });
  }, [code]);

  const handleJoinRoom = async () => {
    if (!guestName || guestName == "") return alert("Please enter your name");

    const res = await fetch("/api/room/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomCode: code, guestId, guestName }),
    });

    if (!res.ok) return alert("Failed to join room");

    const data = await res.json();
    const normalizedMembers = data.room.members.map((m) => ({
      ...m,
      _id: m.uuid,
    }));
    localStorage.setItem("guestId", data.id.toString());
    localStorage.setItem("guestName", data.name);

    setCurrentUser({ id: data.id, name: data.name });
    setRoom({ ...data.room, members: normalizedMembers });
    setShowJoinPrompt(false);
  };

  const toggleMember = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const addExpense = async (e) => {
    e.preventDefault();
    if (!form.description || !form.amount)
      return alert("Please fill all fields");

    const res = await fetch("/api/expense/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId: room.uuid,
        addedBy: currentUser.id,
        description: form.description,
        amount: Number(form.amount),
        splitAmong: selectedMembers.length
          ? selectedMembers
          : room.members.map((m) => m.uuid),
      }),
    });

    const newExpense = await res.json();
    setExpenses([...expenses, newExpense]);
    setForm({ description: "", amount: "" });
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(roomUrl);
    alert("Room URL copied to clipboard!");
  };

  if (showModal)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="bg-white dark:bg-gray-900 dark:border-gray-700 shadow-lg p-6 rounded w-full max-w-md text-center space-y-6">
          <h2 className="text-xl font-bold dark:text-gray-100">
            Invalid Room Code
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Oops! This room does not exist. Please create a new room or use a
            valid code.
          </p>
          <button
            onClick={() => (window.location.href = "/")} // Navigate to landing page
            className="bg-purple-500 text-white p-3 rounded w-full hover:bg-purple-600 transition font-semibold dark:bg-purple-700 dark:hover:bg-purple-800"
          >
            Create New Room
          </button>
        </div>
      </div>
    );

  if (showJoinPrompt)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="bg-white dark:bg-gray-900 dark:border-gray-700 shadow-lg p-6 rounded w-full max-w-md text-center space-y-4">
          <h2 className="text-xl font-bold dark:text-gray-100">Join Room</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Enter your name to join this room and start tracking expenses
            instantly.
          </p>
          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
          <button
            className="bg-purple-500 text-white p-2 rounded w-full mt-2 hover:bg-purple-600 transition dark:bg-purple-700 dark:hover:bg-purple-800"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div>
      </div>
    );

  if (!room) return <Loading />;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex justify-center dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-black">
      <div className="w-full max-w-5xl lg:w-7/10 space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white dark:text-gray-100">
            {room.name}{" "}
            {currentUser && (
              <span className="text-gray-200 text-lg dark:text-gray-300">
                ({currentUser.name})
              </span>
            )}
          </h1>
          <button
            className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition dark:bg-gray-800 dark:hover:bg-gray-700"
            onClick={copyUrl}
          >
            Copy Room URL
          </button>
        </div>
        <p className="text-gray-200 mb-4 text-sm dark:text-gray-300">
          Room Code:{" "}
          <span className="font-semibold dark:text-gray-100">{room.code}</span>
        </p>

        {/* Add Expense Form */}
        <form
          className="mb-6 space-y-3 border p-4 rounded bg-white/90 backdrop-blur-md shadow-lg dark:bg-gray-900 dark:border-gray-700"
          onSubmit={addExpense}
        >
          <h2 className="font-bold text-gray-800 mb-2 dark:text-gray-100">
            Add Expense
          </h2>
          <input
            type="text"
            placeholder="Description"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <div className="space-y-1 border p-2 rounded-md dark:bg-gray-900 dark:border-gray-700">
            <p className="font-bold text-gray-700 dark:text-gray-100">
              Select members to split:
            </p>
            {room.members.map((m, idx) => (
              <label
                key={m.uuid ? m.uuid.toString() : idx}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-100"
              >
                <input
                  type="checkbox"
                  value={m.uuid}
                  checked={selectedMembers.includes(m.uuid)}
                  onChange={() => toggleMember(m.uuid)}
                />
                <span>{m.name}</span>
              </label>
            ))}
          </div>

          <button className="bg-purple-500 text-white p-2 rounded w-full mt-2 hover:bg-purple-600 transition dark:bg-purple-700 dark:hover:bg-purple-800">
            Add Expense
          </button>
        </form>
        <ExpensesList
          expenses={expenses}
          memberMap={memberMap}
          currentUser={currentUser}
        />
        <BalanceTable room={room} expenses={expenses} memberMap={memberMap} />
      </div>
    </div>
  );
}
