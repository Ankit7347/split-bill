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
  // Create a quick map of member IDs to names
  useEffect(() => {
    if (!room) return;
    const map = {};
    room.members.forEach((m) => {
      map[m._id] = m.name;
    });
    setMemberMap(map);
  }, [room]);

  // Load room and expenses
  useEffect(() => {
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

        // Check if user exists in localStorage
        const guestId = localStorage.getItem("guestId");
        const guestName = localStorage.getItem("guestName");

        if (guestId && data.room.members.find((m) => m._id === guestId)) {
          setCurrentUser({ id: guestId, name: guestName });
        } else {
          // Prompt for name to join room
          setShowJoinPrompt(true);
        }
      });
  }, [code]);

  // Join room as new user
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
    if (
      guestId &&
      data.room.members.find((m) => m._id.toString() === guestId)
    ) {
      setCurrentUser({ id: guestId, name: guestName });
    } else {
      setShowJoinPrompt(true);
    }
    setCurrentUser({ id: data.id, name: data.name });
    setRoom(data.room);
    setShowJoinPrompt(false);
  };

  // Toggle member selection for splitting expense
  const toggleMember = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  // Add expense
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

  // Calculate balances
  const balances = {};
  expenses.forEach((exp) => {
    const perHead = exp.perHead;
    exp.splitAmong.forEach((memberId) => {
      if (memberId !== exp.addedBy) {
        balances[memberId] = (balances[memberId] || 0) + perHead;
      }
    });
  });

  // Copy room URL
  const copyUrl = () => {
    navigator.clipboard.writeText(roomUrl);
    alert("Room URL copied to clipboard!");
  };

  if (showModal)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="bg-white shadow p-6 rounded w-full max-w-md text-center space-y-4">
          <h2 className="text-xl font-bold">Invalid Room Code</h2>
          <p>This room does not exist. Save a new room ID or create a room.</p>
        </div>
      </div>
    );

  if (showJoinPrompt)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="bg-white shadow p-6 rounded w-full max-w-md text-center space-y-4">
          <h2 className="text-xl font-bold">Join Room</h2>
          <p>Please enter your name to join this room</p>
          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 w-full"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded w-full mt-2"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div>
      </div>
    );

  if (!room) return <p>Loading room...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      {/* Copy Room URL */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {room.name}{" "}
          {currentUser && (
            <span className="text-gray-600 text-lg">({currentUser.name})</span>
          )}
        </h1>

        <button
          className="bg-gray-500 text-white px-2 py-1 rounded"
          onClick={copyUrl}
        >
          Copy Room URL
        </button>
      </div>
      <p className="text-gray-600 mb-4">Room Code: {room.code}</p>

      {/* Add Expense Form */}
      <form onSubmit={addExpense} className="mb-6 space-y-2 border p-4 rounded">
        <h2 className="font-bold mb-2">Add Expense</h2>
        <input
          type="text"
          placeholder="Description"
          className="border p-2 w-full"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          className="border p-2 w-full"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        {/* Member selection */}
        <div className="space-y-1 border p-2 rounded">
          <p className="font-bold">Select members to split:</p>
          {room.members.map((m, idx) => (
            <label
              key={m._id ? m._id.toString() : idx}
              className="flex items-center space-x-2"
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

        <button className="bg-blue-500 text-white p-2 rounded w-full mt-2">
          Add Expense
        </button>
      </form>

      {/* Expense List */}
      <div className="mb-6">
        <h2 className="font-bold mb-2">Expenses</h2>
        {expenses.length === 0 && <p>No expenses yet</p>}
        <ul className="space-y-2">
          {expenses.map((ex, idx) => (
            <li
              key={ex._id ? ex._id.toString() : idx}
              className="border p-2 rounded"
            >
              <strong>{ex.description}</strong> - ₹{ex.amount.toFixed(2)} <br />
              Added by: {memberMap[ex.addedBy]} <br />
              Per Head: ₹{ex.perHead.toFixed(2)} split among:{" "}
              {ex.splitAmong.map((id) => memberMap[id]).join(", ")}
            </li>
          ))}
        </ul>
      </div>

      {/* Balance Summary */}
      <BalanceTable room={room} expenses={expenses} memberMap={memberMap} />
    </div>
  );
}
