import React from "react";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center py-16 md:py-24 px-4 sm:px-6 text-center w-full">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow mb-6 animate-fadeIn">
        Split Expenses, Simplified
      </h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-xl md:max-w-2xl animate-fadeIn">
        Easily split bills, track group expenses, and settle up with friends,
        roommates, or classmates. No login required!
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
          className="bg-white/80 hover:bg-white text-pink-600 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-lg text-lg sm:text-xl transition dark:bg-gray-900 dark:text-pink-400 dark:hover:bg-gray-800"
        >
          Try Guest Mode
        </a>
      </div>
    </section>
  );
}
