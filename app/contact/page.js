"use client";
import ContactCard from "@/components/ContactCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <ContactCard />
        </div>
        <Footer />
      </div>
    </>
  );
}
