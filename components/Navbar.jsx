import React from "react";
import { useState } from "react";
import FeatureModal from "@/components/FeatureModal";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  return (
    <nav className="w-full bg-gray-900 text-white py-3 px-6 shadow flex items-center justify-between relative">
      <div className="font-bold text-xl">Expense Spiltter</div>
      <div className="space-x-4 flex items-center">
        <a href="/" className="hover:underline">Home</a>
        <a href="/register" className="hover:underline">Register</a>
        <a href="/room/create" className="hover:underline">Create Room</a>
        <button
          className="ml-4 flex items-center justify-center w-9 h-9 rounded-full bg-white text-gray-900 shadow hover:bg-gray-200 focus:outline-none"
          title="How it works"
          onClick={() => setShowModal(true)}
        >
          <span className="text-xl font-bold">?</span>
        </button>
      </div>
      <FeatureModal open={showModal} onClose={() => setShowModal(false)} />
    </nav>
  );
}
