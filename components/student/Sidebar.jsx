"use client";
import { useEffect } from "react";

export default function Sidebar({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-40 transition-opacity md:hidden ${open ? "block" : "hidden"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-800 text-white flex flex-col py-6 px-4 border-r border-gray-700 z-50 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{ maxWidth: "100vw" }}
      >
        <nav className="flex flex-col gap-4">
    <a href="/dashboard" className="hover:bg-gray-700 rounded px-3 py-2">Dashboard</a>
    <a href="/dashboard/settings" className="hover:bg-gray-700 rounded px-3 py-2">Settings</a>
    <a href="/dashboard/generate-bill" className="hover:bg-gray-700 rounded px-3 py-2">Generate Bill</a>
    <a href="/dashboard/show-graph" className="hover:bg-gray-700 rounded px-3 py-2">Show Graph</a>
    <a href="#" className="hover:bg-gray-700 rounded px-3 py-2">More Features</a>
        </nav>
        {/* Close button for mobile */}
        <button
          className="md:hidden mt-8 px-4 py-2 bg-gray-700 rounded text-white self-center"
          onClick={onClose}
        >
          Close
        </button>
      </aside>
    </>
  );
}
