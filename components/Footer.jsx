import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-3 px-6 mt-8 text-center">
      <span>&copy; {new Date().getFullYear()} Expense Spiltter. All rights reserved.</span>
    </footer>
  );
}
