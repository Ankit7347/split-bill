"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import BalanceTable from "@/components/BalanceTable";

export default function RoomPage() {
  const { code } = useParams();
  const [room, setRoom] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ description: "", amount: "" });
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // guestId + name
  const [showModal, setShowModal] = useState(false); // invalid room
  const [showJoinPrompt, setShowJoinPrompt] = useState(false); // new user not in room
  const [guestName, setGuestName] = useState("");
  const [memberMap, setMemberMap] = useState({});

  const roomUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (!room) return;
    const map = {};
    room.members.forEach((m) => {
      map[m._id] = m.name;
    });
    setMemberMap(map);
  }, [room]);

  useEffect(() => {
    const guestId = localStorage.getItem("guestId");
    const guestName = localStorage.getItem("guestName");

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

        setRoom(data.room);
        setExpenses(data.expenses || []);
        setSelectedMembers(data.room.members.map((m) => m._id));

        if (guestId && data.room.members.find((m) => m._id === guestId)) {
          setCurrentUser({ id: guestId, name: guestName });
        } else {
          setShowJoinPrompt(true);
        }
      });
  }, [code]);

  const handleJoinRoom = async () => {
    if (!guestName) return alert("Please enter your name");

    const res = await fetch("/api/room/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, name: guestName }),
    });

    if (!res.ok) return alert("Failed to join room");

    const data = await res.json();

    localStorage.setItem("guestId", data.id.toString());
    localStorage.setItem("guestName", data.name);

    setCurrentUser({ id: data.id, name: data.name });
    setRoom(data.room);
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
        roomId: room._id,
        addedBy: currentUser.id,
        description: form.description,
        amount: Number(form.amount),
        splitAmong: selectedMembers.length
          ? selectedMembers
          : room.members.map((m) => m._id),
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
        <div className="bg-white shadow-lg p-6 rounded w-full max-w-md text-center space-y-6">
          <h2 className="text-xl font-bold">Invalid Room Code</h2>
          <p className="text-gray-600">
            Oops! This room does not exist. Please create a new room or use a
            valid code.
          </p>
          <button
            onClick={() => (window.location.href = "/")} // Navigate to landing page
            className="bg-purple-500 text-white p-3 rounded w-full hover:bg-purple-600 transition font-semibold"
          >
            Create New Room
          </button>
        </div>
      </div>
    );

  if (showJoinPrompt)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="bg-white shadow-lg p-6 rounded w-full max-w-md text-center space-y-4">
          <h2 className="text-xl font-bold">Join Room</h2>
          <p className="text-gray-600">
            Enter your name to join this room and start tracking expenses
            instantly.
          </p>
          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
          <button
            className="bg-purple-500 text-white p-2 rounded w-full mt-2 hover:bg-purple-600 transition"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div>
      </div>
    );

  if (!room) return <p>Loading room...</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex justify-center">
      <div className="w-full max-w-4xl lg:w-7/10 space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">
            {room.name}{" "}
            {currentUser && (
              <span className="text-gray-200 text-lg">
                ({currentUser.name})
              </span>
            )}
          </h1>
          <button
            className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
            onClick={copyUrl}
          >
            Copy Room URL
          </button>
        </div>
        <p className="text-gray-200 mb-4 text-sm">
          Room Code: <span className="font-semibold">{room.code}</span>
        </p>

        {/* Add Expense Form */}
        <form
          className="mb-6 space-y-3 border p-4 rounded bg-white/90 backdrop-blur-md shadow-lg"
          onSubmit={addExpense}
        >
          <h2 className="font-bold text-gray-800 mb-2">Add Expense</h2>
          <input
            type="text"
            placeholder="Description"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <div className="space-y-1 border p-2 rounded-md">
            <p className="font-bold text-gray-700">Select members to split:</p>
            {room.members.map((m, idx) => (
              <label
                key={m._id ? m._id.toString() : idx}
                className="flex items-center space-x-2 text-gray-700"
              >
                <input
                  type="checkbox"
                  value={m._id}
                  checked={selectedMembers.includes(m._id)}
                  onChange={() => toggleMember(m._id)}
                />
                <span>{m.name}</span>
              </label>
            ))}
          </div>

          <button className="bg-purple-500 text-white p-2 rounded w-full mt-2 hover:bg-purple-600 transition">
            Add Expense
          </button>
        </form>

        <div className="mb-6 bg-white/90 backdrop-blur-md shadow-lg rounded p-4">
          <h2 className="font-bold mb-2 text-gray-800">Expenses</h2>
          {expenses.length === 0 && (
            <p className="text-gray-600">No expenses yet</p>
          )}
          <ul className="space-y-2">
            {expenses.map((ex, idx) => (
              <li
                key={ex._id ? ex._id.toString() : idx}
                className="border p-2 rounded-md bg-white/80"
              >
                <strong>{ex.description}</strong> - ₹{ex.amount.toFixed(2)}{" "}
                <br />
                Added by: {memberMap[ex.addedBy]} <br />
                Per Head: ₹{ex.perHead.toFixed(2)} split among:{" "}
                {ex.splitAmong.map((id) => memberMap[id]).join(", ")}
              </li>
            ))}
          </ul>
        </div>

        <BalanceTable room={room} expenses={expenses} memberMap={memberMap} />
      </div>
    </div>
  );
}
