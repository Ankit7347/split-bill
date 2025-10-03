"use client";
import StudentNavbar from '@/components/student/Navbar';
import StudentFooter from '@/components/student/Footer';
import Sidebar from '@/components/student/Sidebar';
import { useState } from 'react';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <StudentNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 w-full">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1">
          {children}
        </main>
      </div>
      <StudentFooter />
    </div>
  );
}
