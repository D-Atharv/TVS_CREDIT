// File: app/(dashboard)/layout.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

// --- Menu Icons for Mobile ---
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = { name: "Priya Sharma", email: "priya.sharma@example.com" };

  return (
    <div className="flex h-screen bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 h-full">
          <Sidebar />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 flex z-40">
          <div className="fixed inset-0">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            ></div>
          </div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                CloseIcon
              </button>
            </div>
            <Sidebar />
          </div>
          <div className="flex-shrink-0 w-14"></div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="relative z-10 flex-shrink-0 flex h-16 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
          <button
            onClick={() => setSidebarOpen(true)}
            className="px-4 border-r border-gray-800 text-gray-400 md:hidden"
          >
            <MenuIcon />
          </button>
          <div className="flex-1 px-4 flex justify-end items-center">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
