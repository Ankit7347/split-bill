"use client";
import React from "react";

export default function BalanceTable({ room, expenses, memberMap }) {
  if (!room || !expenses) return null;

  // 1. Compute net balances
  const netBalances = {};
  room.members.forEach((m) => (netBalances[m._id] = 0));

  expenses.forEach((exp) => {
    const perHead = exp.perHead;
    exp.splitAmong.forEach((memberId) => {
      if (memberId !== exp.addedBy) {
        netBalances[memberId] -= perHead; // owes
        netBalances[exp.addedBy] += perHead; // paid
      }
    });
  });

  // 2. Split into creditors & debtors
  const creditors = [];
  const debtors = [];

  Object.keys(netBalances).forEach((id) => {
    if (netBalances[id] > 0) creditors.push({ id, amount: netBalances[id] });
    else if (netBalances[id] < 0) debtors.push({ id, amount: -netBalances[id] });
  });

  // 3. Greedy settlement algorithm
  const settlements = [];
  let i = 0,
    j = 0;
  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const amt = Math.min(debtor.amount, creditor.amount);

    settlements.push({
      from: debtor.id,
      to: creditor.id,
      amount: amt,
    });

    debtor.amount -= amt;
    creditor.amount -= amt;

    if (debtor.amount === 0) i++;
    if (creditor.amount === 0) j++;
  }

  return (
    <div className="mt-6 space-y-4">
      {/* Net Balance Table */}
      <div className="border rounded shadow p-4 bg-white">
        <h2 className="font-bold mb-2 text-lg">Net Balances</h2>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1 text-left">Member</th>
              <th className="border px-2 py-1 text-right">Balance (₹)</th>
            </tr>
          </thead>
          <tbody>
            {room.members.map((m) => (
              <tr key={m._id}>
                <td className="border px-2 py-1">{m.name}</td>
                <td
                  className={`border px-2 py-1 text-right ${
                    netBalances[m._id] < 0
                      ? "text-red-600"
                      : netBalances[m._id] > 0
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {netBalances[m._id].toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Settlement Summary */}
      <div className="border rounded shadow p-4 bg-white">
        <h2 className="font-bold mb-2 text-lg">Settlements</h2>
        {settlements.length === 0 && (
          <p className="text-gray-600">No settlements needed 🎉</p>
        )}
        <ul className="space-y-1">
          {settlements.map((s, idx) => (
            <li key={idx} className="text-sm">
              <span className="font-medium">{memberMap[s.from]}</span> pays{" "}
              <span className="font-medium">₹{s.amount.toFixed(2)}</span> to{" "}
              <span className="font-medium">{memberMap[s.to]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
