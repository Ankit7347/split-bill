import React from "react";

export default function BenefitsTestimonialSection() {
  return (
  <section className="py-16 md:py-24 px-4 sm:px-6 flex flex-col items-center bg-white/40 dark:bg-gray-900/60 backdrop-blur-md w-full">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-8 md:mb-10">
        Why Choose Expense Splitter?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 w-full max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl">
        <div className="bg-white/90 dark:bg-gray-900 dark:border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">Fast & Easy</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            No registration, no hassle. Get started in seconds and manage group
            expenses effortlessly.
          </p>
        </div>
        <div className="bg-white/90 dark:bg-gray-900 dark:border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            Secure & Private
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Your data is never shared. Guest mode keeps things simple and
            private for short-term use.
          </p>
        </div>
        <div className="bg-white/90 dark:bg-gray-900 dark:border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            Perfect for Groups
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Trips, events, roommates, classmates—split bills and track spending
            for any group.
          </p>
        </div>
        <div className="bg-white/90 dark:bg-gray-900 dark:border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            Detailed Tracking
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            See monthly summaries, member balances, and expense history at a
            glance.
          </p>
        </div>
      </div>
    </section>
  );
}
