import React from "react";

export default function FeatureSection() {
  return (
  <section className="py-16 md:py-24 px-4 sm:px-6 bg-white/30 dark:bg-gray-900/60 backdrop-blur-md flex flex-col items-center w-full">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-8 md:mb-10">
        Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-2xl sm:max-w-3xl md:max-w-5xl lg:max-w-6xl">
        <div className="bg-white/90 dark:bg-gray-900 dark:border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-200 dark:border-gray-700">
          <svg
            className="w-16 h-16 text-pink-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 16v-4m8-4h-4m-8 0H4"
            />
          </svg>
          <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            No Login Needed
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Start splitting expenses instantly. Create a room and invite
            friends—no sign-up required.
          </p>
        </div>
        <div className="bg-white/90 dark:bg-gray-900 dark:border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-200 dark:border-gray-700">
          <svg
            className="w-16 h-16 text-purple-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2z"
            />
          </svg>
          <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            Room Validity
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Rooms are valid for 45 days, with 15 extra days to settle up.
            Perfect for trips, events, or short-term groups.
          </p>
        </div>
        <div className="bg-white/90 dark:bg-gray-900 dark:border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-200 dark:border-gray-700">
          <svg
            className="w-16 h-16 text-orange-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2a4 4 0 018 0v2m-8 0a4 4 0 01-8 0v-2a4 4 0 018 0v2zm8 0v-2a4 4 0 00-8 0v2"
            />
          </svg>
          <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            Smart Splitting
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Add expenses, select who pays, and split among members. See who owes
            what, instantly.
          </p>
        </div>
      </div>
    </section>
  );
}
