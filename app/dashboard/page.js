"use client";

export default function Dashboard() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 flex flex-col items-center bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 w-full">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-8 md:mb-10">
        Dashboard Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
        <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <svg
            className="w-14 h-14 text-purple-500 mb-4"
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
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            Charts & Analytics
          </h3>
          <p className="text-gray-600 text-center">
            Visualize your expenses with interactive charts. Track spending
            trends, monthly breakdowns, and more.
          </p>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <svg
            className="w-14 h-14 text-pink-500 mb-4"
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
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            Academic & Semester Reports
          </h3>
          <p className="text-gray-600 text-center">
            Get academic year-wise and semester-wise expense summaries. Perfect
            for students and long-term tracking.
          </p>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <svg
            className="w-14 h-14 text-orange-500 mb-4"
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
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            Secure Cloud Data
          </h3>
          <p className="text-gray-600 text-center">
            Access your expense history anytime, anywhere. Your data is securely
            stored and always available.
          </p>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <svg
            className="w-14 h-14 text-green-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 20l9-5-9-5-9 5 9 5z"
            />
          </svg>
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            One-Glance Graphs
          </h3>
          <p className="text-gray-600 text-center">
            See your total expenses, balances, and trends in a single glance
            with beautiful graphs.
          </p>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <svg
            className="w-14 h-14 text-blue-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01"
            />
          </svg>
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            Advanced Filters
          </h3>
          <p className="text-gray-600 text-center">
            Filter expenses by category, member, or date. Find exactly what you
            need, fast.
          </p>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 text-gray-800">And More!</h3>
          <p className="text-gray-600 text-center">
            Enjoy all features and future updates for power users. You are
            logged in!
          </p>
        </div>
      </div>
    </section>
  );
}
