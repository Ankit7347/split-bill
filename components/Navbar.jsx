import React from "react";
import { useState } from "react";
import FeatureModal from "@/components/FeatureModal";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="w-full bg-gray-900 text-white py-3 px-4 sm:px-6 shadow flex items-center justify-between relative">
      <div className="font-bold text-lg sm:text-xl">Expense Spiltter</div>
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-4 items-center">
        <a href="/" className="hover:underline">Home</a>
  <a href="/register" className="hover:underline">Register</a>
  <a href="/login" className="hover:underline">Login</a>
        <a href="/guest" className="hover:underline">GuestMode</a>
        <a href="/room/create" className="hover:underline">Create Room</a>
        <a href="/contact" className="hover:underline">Contact</a>
        <button
          className="ml-4 flex items-center justify-center w-9 h-9 rounded-full bg-white text-gray-900 shadow hover:bg-gray-200 focus:outline-none"
          title="How it works"
          onClick={() => setShowModal(true)}
        >
          <span className="text-xl font-bold">?</span>
        </button>
      </div>
      {/* Mobile/Tablet Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-900 shadow focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-900 text-white shadow-lg z-40 flex flex-col items-center py-4 animate-fadeIn">
          <a href="/" className="py-2 px-6 w-full text-center hover:bg-gray-800" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/register" className="py-2 px-6 w-full text-center hover:bg-gray-800" onClick={() => setMenuOpen(false)}>Register</a>
          <a href="/login" className="py-2 px-6 w-full text-center hover:bg-gray-800" onClick={() => setMenuOpen(false)}>Login</a>
          <a href="/guest" className="py-2 px-6 w-full text-center hover:bg-gray-800" onClick={() => setMenuOpen(false)}>GuestMode</a>
          <a href="/room/create" className="py-2 px-6 w-full text-center hover:bg-gray-800" onClick={() => setMenuOpen(false)}>Create Room</a>
          <a href="/contact" className="py-2 px-6 w-full text-center hover:bg-gray-800" onClick={() => setMenuOpen(false)}>Contact</a>
          <button
            className="mt-2 flex items-center justify-center w-9 h-9 rounded-full bg-white text-gray-900 shadow hover:bg-gray-200 focus:outline-none mx-auto"
            title="How it works"
            onClick={() => { setShowModal(true); setMenuOpen(false); }}
          >
            <span className="text-xl font-bold">?</span>
          </button>
        </div>
      )}
      <FeatureModal open={showModal} onClose={() => setShowModal(false)} />
    </nav>
  );
}
