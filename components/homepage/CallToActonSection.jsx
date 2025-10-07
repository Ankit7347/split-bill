import React from "react";

export default function CallToActonSection() {
  return (
  <section className="md:py-24 px-4 sm:px-6 flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 dark:bg-gradient-to-r dark:from-gray-900 dark:via-purple-900 dark:to-black w-full">
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
          className="bg-white/80 hover:bg-white text-purple-600 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-lg text-lg sm:text-xl transition dark:bg-gray-900 dark:text-purple-400 dark:hover:bg-gray-800"
        >
          Create Room
        </a>
        <a
          href="/guest"
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-lg text-lg sm:text-xl transition dark:bg-pink-700 dark:hover:bg-pink-800"
        >
          Try Guest Mode
        </a>
      </div>
    </section>
  );
}
