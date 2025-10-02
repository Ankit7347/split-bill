"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-16 md:py-24 px-4 sm:px-6 text-center w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow mb-6 animate-fadeIn">
            Split Expenses, Simplified
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-xl md:max-w-2xl animate-fadeIn">
            Easily split bills, track group expenses, and settle up with
            friends, roommates, or classmates. No login required!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto">
            <a
              href="/room/create"
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-lg text-lg sm:text-xl transition"
            >
              Create Room
            </a>
            <a
              href="/guest"
              className="bg-white/80 hover:bg-white text-pink-600 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-lg text-lg sm:text-xl transition"
            >
              Try Guest Mode
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 bg-white/30 backdrop-blur-md flex flex-col items-center w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-8 md:mb-10">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-2xl sm:max-w-3xl md:max-w-5xl lg:max-w-6xl">
            <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
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
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                No Login Needed
              </h3>
              <p className="text-gray-600 text-center">
                Start splitting expenses instantly. Create a room and invite
                friends—no sign-up required.
              </p>
            </div>
            <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
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
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                Room Validity
              </h3>
              <p className="text-gray-600 text-center">
                Rooms are valid for 45 days, with 15 extra days to settle up.
                Perfect for trips, events, or short-term groups.
              </p>
            </div>
            <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
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
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                Smart Splitting
              </h3>
              <p className="text-gray-600 text-center">
                Add expenses, select who pays, and split among members. See who
                owes what, instantly.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 flex flex-col items-center bg-gradient-to-r from-pink-200 via-purple-100 to-orange-100 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-8 md:mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-2xl sm:max-w-3xl md:max-w-5xl lg:max-w-6xl">
            <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
              <span className="text-5xl font-bold text-pink-500 mb-4">1</span>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Create or Join Room
              </h3>
              <p className="text-gray-600 text-center">
                Start by creating a new room or joining an existing one with a
                code.
              </p>
            </div>
            <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
              <span className="text-5xl font-bold text-purple-500 mb-4">2</span>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Add Expenses
              </h3>
              <p className="text-gray-600 text-center">
                Enter expense details, select who paid, and choose members to
                split the cost.
              </p>
            </div>
            <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
              <span className="text-5xl font-bold text-orange-500 mb-4">3</span>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Settle Up
              </h3>
              <p className="text-gray-600 text-center">
                See balances and settle up easily. Track who owes what and keep
                things fair.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits / Testimonials Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 flex flex-col items-center bg-white/40 backdrop-blur-md w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-8 md:mb-10">
            Why Choose Expense Splitter?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 w-full max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl">
            <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Fast & Easy
              </h3>
              <p className="text-gray-600 text-center">
                No registration, no hassle. Get started in seconds and manage
                group expenses effortlessly.
              </p>
            </div>
            <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Secure & Private
              </h3>
              <p className="text-gray-600 text-center">
                Your data is never shared. Guest mode keeps things simple and
                private for short-term use.
              </p>
            </div>
            <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Perfect for Groups
              </h3>
              <p className="text-gray-600 text-center">
                Trips, events, roommates, classmates—split bills and track
                spending for any group.
              </p>
            </div>
            <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Detailed Tracking
              </h3>
              <p className="text-gray-600 text-center">
                See monthly summaries, member balances, and expense history at a
                glance.
              </p>
            </div>
          </div>
        </section>

        {/* With Login Benefits Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 flex flex-col items-center bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-8 md:mb-10">
            With Login: Unlock More Power
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
                Get academic year-wise and semester-wise expense summaries.
                Perfect for students and long-term tracking.
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
                Access your expense history anytime, anywhere. Your data is
                securely stored and always available.
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
                Filter expenses by category, member, or date. Find exactly what
                you need, fast.
              </p>
            </div>
            <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                And More!
              </h3>
              <p className="text-gray-600 text-center">
                With login, unlock more features and future updates for power
                users.
              </p>
            </div>
          </div>
          <a
            href="/login"
            className="mt-8 inline-block py-3 px-8 rounded-2xl bg-purple-600 text-white font-bold text-lg shadow-lg hover:bg-purple-700 transition"
          >
            Login & Explore
          </a>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Ready to Split?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-xl md:max-w-2xl text-center">
            Start a room now or try guest mode. Experience hassle-free expense
            splitting!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto">
            <a
              href="/room/create"
              className="bg-white/80 hover:bg-white text-purple-600 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-lg text-lg sm:text-xl transition"
            >
              Create Room
            </a>
            <a
              href="/guest"
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-lg text-lg sm:text-xl transition"
            >
              Try Guest Mode
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
