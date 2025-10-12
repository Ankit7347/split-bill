"use client";

import { signOut } from "next-auth/react";

export default function StudentNavbar({ sidebarOpen, setSidebarOpen, onMenuClick }) {
  return (
    <nav className="w-full bg-gray-900 text-white py-3 px-4 flex items-center justify-between shadow z-60 relative">
      <div className="font-bold text-lg">Expense Splitter</div>
      {/* Desktop links */}
      <div className="hidden md:flex space-x-4">
        <a href="/dashboard" className="hover:underline">Home</a>
        <a href="/profile" className="hover:underline">Profile</a>
        <a href="/settings" className="hover:underline">Settings</a>
        <button onClick={() => signOut()}>Logout</button>
      </div>
      {/* Hamburger for mobile */}
      <button
        className={`md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white text-gray-900 shadow focus:outline-none ${sidebarOpen ? "bg-gray-300" : ""}`}
        aria-label="Toggle menu"
        onClick={onMenuClick}
      >
        {sidebarOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>
    </nav>
  );
}
