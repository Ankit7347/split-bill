import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white dark:bg-gray-950 dark:text-gray-100 py-3 px-6 mt-8 text-center border-t border-gray-800 dark:border-gray-700">
      <span>&copy; {new Date().getFullYear()} Expense Spiltter. All rights reserved.</span>
    </footer>
  );
}
