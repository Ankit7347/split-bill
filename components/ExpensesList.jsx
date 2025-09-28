"use client";
import React from "react";

export default function ExpensesList({ expenses, memberMap, currentUser }) {
  return (
    <div className="mb-6 bg-white/90 backdrop-blur-md shadow-lg rounded p-4">
      <h2 className="text-center font-bold mb-4 text-gray-800">Expenses</h2>
      {expenses.length === 0 && (
        <p className="text-gray-600">No expenses yet</p>
      )}
      <div className="space-y-4">
        {expenses.map((ex, idx) => {
          const isCurrentUser = currentUser?.id === ex.addedBy;

          return (
            <div
              key={ex._id ? ex._id.toString() : idx}
              className={`flex ${isCurrentUser ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-lg shadow ${
                  isCurrentUser
                    ? "bg-purple-100 text-gray-800"
                    : "bg-blue-100 text-gray-800"
                }`}
              >
                {/* Member name at top */}
                <h3 className="text-sm font-semibold mb-1">
                  {memberMap[ex.addedBy]}
                </h3>

                {/* Expense details */}
                <p className="text-sm">
                  <strong>{ex.description}</strong> - ₹{ex.amount.toFixed(2)}
                </p>
                <p className="text-xs text-gray-600">
                  Per Head: ₹{ex.perHead.toFixed(2)} <br />
                  Split among: {ex.splitAmong.map((id) => memberMap[id]).join(", ")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
