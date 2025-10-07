import React from "react";

export default function HowItsWork() {
  return (
  <section className="py-16 md:py-24 px-4 sm:px-6 flex flex-col items-center bg-gradient-to-r from-pink-200 via-purple-100 to-orange-100 dark:bg-gradient-to-r dark:from-gray-900 dark:via-purple-900 dark:to-black w-full">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-8 md:mb-10">
        How It Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-2xl sm:max-w-3xl md:max-w-5xl lg:max-w-6xl">
        <div className="bg-white/90 dark:bg-gray-900 dark:border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-200 dark:border-gray-700">
          <span className="text-5xl font-bold text-pink-500 mb-4">1</span>
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            Create or Join Room
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Start by creating a new room or joining an existing one with a code.
          </p>
        </div>
        <div className="bg-white/90 dark:bg-gray-900 dark:border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-200 dark:border-gray-700">
          <span className="text-5xl font-bold text-purple-500 mb-4">2</span>
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">Add Expenses</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Enter expense details, select who paid, and choose members to split
            the cost.
          </p>
        </div>
        <div className="bg-white/90 dark:bg-gray-900 dark:border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-200 dark:border-gray-700">
          <span className="text-5xl font-bold text-orange-500 mb-4">3</span>
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">Settle Up</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            See balances and settle up easily. Track who owes what and keep
            things fair.
          </p>
        </div>
      </div>
    </section>
  );
}
