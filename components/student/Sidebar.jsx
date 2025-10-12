"use client";
import { useEffect } from "react";

export default function Sidebar({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    // Close sidebar on Esc key
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    // Prevent background scrolling when sidebar is open
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  return (
    <aside
      className={`fixed md:static top-0 left-0 h-full w-64 
  bg-gray-900/95 md:bg-transparent 
  text-white flex flex-col py-6 px-4 border-r border-violet-800 z-50 
  transform transition-transform duration-300 ease-in-out 
  ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      role="navigation"
      aria-label="Sidebar"
    >
      <nav className="flex flex-col gap-4">
        <a href="/dashboard" className="hover:bg-violet-800 rounded px-3 py-2">
          Dashboard
        </a>
        <a
          href="/dashboard/settings"
          className="hover:bg-violet-800 rounded px-3 py-2"
        >
          Settings
        </a>
        <a
          href="/dashboard/generate-bill"
          className="hover:bg-violet-800 rounded px-3 py-2"
        >
          Generate Bill
        </a>
        <a
          href="/dashboard/show-graph"
          className="hover:bg-violet-800 rounded px-3 py-2"
        >
          Show Graph
        </a>
        <a
          href="/room/create"
          className="hover:bg-violet-800 rounded px-3 py-2"
        >
          Create Room
        </a>
        <a href="#" className="hover:bg-violet-800 rounded px-3 py-2">
          More Features
        </a>
      </nav>

      {/* Close button for mobile */}
      <button
        className="md:hidden mt-8 px-4 py-2 bg-gray-700 rounded text-white self-center hover:bg-gray-600 transition-colors"
        onClick={onClose}
      >
        Close
      </button>
    </aside>
  );
}
