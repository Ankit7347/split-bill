"use client";
import React from "react";

export default function ExpensesList({ expenses, memberMap, currentUser }) {
  // Helper to check if a date is in this week
  function isThisWeek(date) {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    return date >= startOfWeek && date <= endOfWeek;
  }

  // Helper to get weekday name
  function getWeekday(date) {
    return date.toLocaleString('default', { weekday: 'long' });
  }

  // Group expenses by date string
  const grouped = {};
  expenses.forEach((ex) => {
    const expDate = new Date(ex.date || ex.createdAt);
    let label;
    if (isThisWeek(expDate)) {
      label = getWeekday(expDate);
    } else {
      label = expDate.toLocaleDateString();
    }
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(ex);
  });
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const sortedLabels = Object.keys(grouped)
    .filter(label => !weekdays.includes(label))
    .sort((a, b) => {
      // Sort by date ascending (oldest first)
      return new Date(a) - new Date(b);
    })
    .concat(
      Object.keys(grouped)
        .filter(label => weekdays.includes(label))
        .sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b))
    );

  return (
    <div className="mb-6 bg-white/90 dark:bg-gray-900 dark:border-gray-700 backdrop-blur-md shadow-lg rounded p-4 border border-gray-200 dark:border-gray-700">
      <h2 className="text-center font-bold mb-4 text-gray-800 dark:text-gray-100">Expenses</h2>
      {expenses.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300">No expenses yet</p>
      )}
      <div className="space-y-8">
        {sortedLabels.map((label) => (
          <div key={label}>
            {/* Centered date or weekday for group */}
            <div className="flex justify-center mb-2">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 rounded px-3 py-1 border border-gray-200 dark:border-gray-700">
                {label}
              </span>
            </div>
            <div className="space-y-4">
              {grouped[label].map((ex, idx) => {
                const isCurrentUser = currentUser?.id === ex.addedBy;
                return (
                  <div
                    key={ex._id ? ex._id.toString() : idx}
                    className={`flex ${isCurrentUser ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md p-3 rounded-lg shadow border ${
                        isCurrentUser
                          ? "bg-purple-100 dark:bg-purple-900 text-gray-800 dark:text-gray-100 border-purple-200 dark:border-purple-800"
                          : "bg-blue-100 dark:bg-blue-900 text-gray-800 dark:text-gray-100 border-blue-200 dark:border-blue-800"
                      }`}
                    >
                      {/* Member name at top */}
                      <h3 className="text-sm font-semibold mb-1 dark:text-gray-100">
                        {memberMap[ex.addedBy]}
                      </h3>

                      {/* Expense details */}
                      <p className="text-sm dark:text-gray-100">
                        <strong>{ex.description}</strong> - ₹{ex.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        Per Head: ₹{ex.perHead.toFixed(2)} <br />
                        Split among: {ex.splitAmong.map((id) => memberMap[id]).join(", ")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
