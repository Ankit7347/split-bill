import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function RoomExpenseGraph({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Defensive: handle missing or malformed data
    if (!data || !data.room || !Array.isArray(data.room.members) || !Array.isArray(data.expenses)) return;
    const memberMap = {};
    data.room.members.forEach((m) => {
      memberMap[m._id] = { name: m.name, total: 0 };
    });
    data.expenses.forEach((exp) => {
      exp.splitAmong.forEach((id) => {
        if (memberMap[id]) memberMap[id].total += exp.perHead;
      });
    });
    const labels = Object.values(memberMap).map((m) => m.name);
    const totals = Object.values(memberMap).map((m) => Number(m.total.toFixed(2)));

    // Destroy previous chart if exists
    if (canvasRef.current._chartInstance) {
      canvasRef.current._chartInstance.destroy();
    }
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Total Expenses per Member",
            data: totals,
            backgroundColor: [
              "#a78bfa","#f472b6","#fbbf24","#34d399","#60a5fa"
            ],
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true },
        },
      },
    });
    canvasRef.current._chartInstance = chart;
    return () => chart.destroy();
  }, [data]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <canvas ref={canvasRef} height={300} />
    </div>
  );
}
