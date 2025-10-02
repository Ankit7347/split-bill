// components/FriendlyError.jsx
import Link from "next/link";

export default function FriendlyError({
  title = "Page Not Found",
  description = "Oops! The page you're looking for doesn't exist."
}) {
  return (
    <div
      className="
        flex flex-col items-center justify-center text-center p-10
        bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-800
      "
      style={{ minHeight: '100vh', marginBottom: 0, paddingBottom: 0 }}
    >
      <h1
        className="
          text-7xl font-extrabold mb-4 drop-shadow-lg bg-gradient-to-r from-pink-500 via-orange-400 to-purple-600 bg-clip-text text-transparent
          dark:from-pink-400 dark:via-orange-300 dark:to-purple-400
        "
      >
        404
      </h1>
      <h2
        className="
          text-2xl font-semibold text-gray-800 mb-2
          dark:text-gray-200
        "
      >
        {title}
      </h2>
      <p
        className="
          text-gray-600 mb-6
          dark:text-gray-400
        "
      >
        {description}
      </p>
      <Link href="/">
        <span
          className="
            inline-block bg-green-600 text-white px-6 py-2 rounded-full
            hover:bg-green-700 transition duration-200 shadow-md
            dark:bg-green-500 dark:hover:bg-green-600
          "
        >
          Go to Homepage
        </span>
      </Link>
    </div>
  );
}
