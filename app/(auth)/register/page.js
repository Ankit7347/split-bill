"use client";

import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [registerLoading, setRegisterLoading] = useState(false);
  // State/district removed

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // State/district effects removed

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast({ title: "Registration successful!" });
        router.push("/login");
      } else {
        const errData = await res.json();
        if (errData?.success === false) {
          toast({
            title: "Registration failed",
            description: errData?.message || "Something went wrong",
          });
        } else {
          toast({
            title: "Registration failed",
            description: "An unexpected error occurred",
          });
        }
      }
    } catch {
      toast({
        title: "Registration failed",
        description: "Network or server error",
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-[90vh] items-center justify-center bg-blue-100 dark:bg-gray-800">
        <div className="w-full max-w-md bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              required
            />

            {/* State/district fields removed */}

            {/* className and competition fields removed */}

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              required
            />

            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex justify-center items-center disabled:opacity-50"
              disabled={registerLoading}
            >
              {registerLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Login
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
