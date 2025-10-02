import React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function FeatureModal({ open, onClose }) {
  const [tab, setTab] = useState("no-login");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-md">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg max-w-lg w-full p-0 relative border border-white/40">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <CardContent className="p-8">
          <div className="flex space-x-2 mb-6 justify-center">
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${tab === "no-login" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setTab("no-login")}
            >
              No Login
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${tab === "login" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setTab("login")}
            >
              With Login
            </button>
          </div>
          {tab === "no-login" ? (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">No Login Features</h2>
              <ul className="list-disc pl-6 text-gray-700 text-left space-y-2">
                <li>No login required. Create a room instantly.</li>
                <li>Room is valid for <span className="font-semibold">45 days</span>. After expiry, you get <span className="font-semibold">15 extra days</span> to settle money.</li>
                <li>Click <span className="font-semibold">Create Room</span> and enter your name to start.</li>
                <li>Add expense description and price, then select members to split the amount.</li>
                <li>Before joining, all members are shown for selection.</li>
              </ul>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">With Login Features</h2>
              <ul className="list-disc pl-6 text-gray-700 text-left space-y-2">
                <li>Your data is safe and accessible anytime.</li>
                <li>Academic year-wise charts for expense tracking.</li>
                <li>Monthly expenditure breakdown.</li>
                <li>Semester-wise expense summary for college students.</li>
                <li>One-glance graph of your expenses.</li>
                <li>More features coming soon!</li>
              </ul>
              <a
                href="/login"
                className="mt-6 inline-block w-full py-2 rounded-lg bg-purple-500 text-white font-semibold text-center hover:bg-purple-600 transition"
              >
                Go to Login
              </a>
            </div>
          )}
          <button
            className="mt-8 w-full py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
            onClick={onClose}
          >
            Close
          </button>
        </CardContent>
      </div>
    </div>
  );
}
