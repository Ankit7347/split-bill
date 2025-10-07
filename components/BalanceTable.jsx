"use client";
import React from "react";

export default function BalanceTable({ room, expenses, memberMap }) {
    const [selectedMonth, setSelectedMonth] = React.useState(null);

  // Group expenses by month and year
  const monthGroups = {};
  expenses.forEach((exp) => {
    const expDate = new Date(exp.date || exp.createdAt);
    const month = expDate.getMonth();
    const year = expDate.getFullYear();
    const key = `${year}-${month}`;
    if (!monthGroups[key]) monthGroups[key] = [];
    monthGroups[key].push(exp);
  });
  // Sort keys descending (latest first)
  const sortedMonthKeys = Object.keys(monthGroups).sort((a, b) => b.localeCompare(a));

    // Set default selected month to latest
    React.useEffect(() => {
      if (sortedMonthKeys.length > 0 && selectedMonth === null) {
        setSelectedMonth(sortedMonthKeys[0]);
      }
    }, [sortedMonthKeys, selectedMonth]);

    // Get data for selected month
    const monthKey = selectedMonth || (sortedMonthKeys.length > 0 ? sortedMonthKeys[0] : null);
    const monthlyExpenses = monthKey ? monthGroups[monthKey] : [];
    const [year, month] = monthKey ? monthKey.split("-") : [null, null];
    const totalMonthlyExpense = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    // Monthly balances
    const monthlyBalances = {};
    room.members.forEach((m) => (monthlyBalances[m._id] = 0));
    monthlyExpenses.forEach((exp) => {
      const perHead = exp.perHead;
      exp.splitAmong.forEach((memberId) => {
        if (memberId !== exp.addedBy) {
          monthlyBalances[memberId] -= perHead;
          monthlyBalances[exp.addedBy] += perHead;
        }
      });
    });
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
      {/* Month dropdown selector */}
      <div className="mb-4">
        <label className="font-medium mr-2">Select Month:</label>
        <select
          className="border rounded px-2 py-1"
          value={monthKey || ''}
          onChange={e => setSelectedMonth(e.target.value)}
        >
          {sortedMonthKeys.map((key) => {
            const [year, month] = key.split("-");
            return (
              <option key={key} value={key}>
                {new Date(year, month).toLocaleString('default', { month: 'long' })} {year}
              </option>
            );
          })}
        </select>
      </div>
      {/* Monthly Expense & Member Spend Table for selected month */}
      {monthKey && (
  <div className="border rounded shadow p-4 bg-white dark:bg-gray-900 dark:border-gray-700">
          <h2 className="font-bold mb-2 text-lg dark:text-gray-100">Monthly Summary</h2>
          <p className="mb-1 text-sm text-gray-700 dark:text-gray-300">
            Month: <span className="font-semibold">{new Date(year, month).toLocaleString('default', { month: 'long' })} {year}</span>
          </p>
          {/* Who spent how much */}
          <table className="w-full border text-sm mb-2">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border px-2 py-1 text-left">Member</th>
                <th className="border px-2 py-1 text-right">Spent (₹)</th>
              </tr>
            </thead>
            <tbody>
              {room.members.map((m) => {
                // Sum expenses added by this member for the month
                const spent = monthlyExpenses.filter(e => e.addedBy === m._id).reduce((sum, e) => sum + e.amount, 0);
                return (
                  <tr key={m._id}>
                    <td className="border px-2 py-1 dark:text-gray-100">{m.name}</td>
                    <td className="border px-2 py-1 text-right dark:text-gray-100">{spent.toFixed(2)}</td>
                  </tr>
                );
              })}
              {/* Total row */}
              <tr>
                <td className="border px-2 py-1 font-bold dark:text-gray-100">Total</td>
                <td className="border px-2 py-1 text-right font-bold dark:text-gray-100">{totalMonthlyExpense.toFixed(2)}</td>
              </tr>
              {/* Monthly average row */}
              <tr>
                <td className="border px-2 py-1 font-bold dark:text-gray-100">Monthly Avg</td>
                <td className="border px-2 py-1 text-right font-bold dark:text-gray-100">{(totalMonthlyExpense / room.members.length).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          {/* Monthly Avg Balance Table */}
          <table className="w-full border text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border px-2 py-1 text-left">Member</th>
                <th className="border px-2 py-1 text-right">Monthly Avg Balance (₹)</th>
              </tr>
            </thead>
            <tbody>
              {room.members.map((m) => (
                <tr key={m._id}>
                  <td className="border px-2 py-1 dark:text-gray-100">{m.name}</td>
                  <td
                    className={`border px-2 py-1 text-right dark:text-gray-100 ${
                      monthlyBalances[m._id] < 0
                        ? "text-red-400 dark:text-red-400"
                        : monthlyBalances[m._id] > 0
                        ? "text-green-500 dark:text-green-400"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {monthlyBalances[m._id].toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Net Balance Table */}
  <div className="border rounded shadow p-4 bg-white dark:bg-gray-900 dark:border-gray-700">
  <h2 className="font-bold mb-2 text-lg dark:text-gray-100">Net Balances</h2>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border px-2 py-1 text-left">Member</th>
              <th className="border px-2 py-1 text-right">Balance (₹)</th>
            </tr>
          </thead>
          <tbody>
            {room.members.map((m) => (
              <tr key={m._id}>
                <td className="border px-2 py-1 dark:text-gray-100">{m.name}</td>
                <td
                  className={`border px-2 py-1 text-right dark:text-gray-100 ${
                    netBalances[m._id] < 0
                      ? "text-red-400 dark:text-red-400"
                      : netBalances[m._id] > 0
                      ? "text-green-500 dark:text-green-400"
                      : "text-gray-600 dark:text-gray-300"
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
  <div className="border rounded shadow p-4 bg-white dark:bg-gray-900 dark:border-gray-700">
  <h2 className="font-bold mb-2 text-lg dark:text-gray-100">Settlements</h2>
        {settlements.length === 0 && (
          <p className="text-gray-600 dark:text-gray-300">No settlements needed 🎉</p>
        )}
        <ul className="space-y-1">
          {settlements.map((s, idx) => (
            <li key={idx} className="text-sm dark:text-gray-100">
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
