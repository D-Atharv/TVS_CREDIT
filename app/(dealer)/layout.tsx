// File: app/(dealer)/layout.tsx
"use client";

import { Link } from "lucide-react";
import React, { useState, useEffect } from "react";

// --- Icon Components ---
const UserSearchIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const NewApplicationIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  </svg>
);
const LogoutIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
    />
  </svg>
);
const Logo = () => (
  <div className="flex items-center space-x-3">
    <svg
      width="32"
      height="32"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256C0 397.385 114.615 512 256 512Z"
        fill="#007BFF"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="250"
        fill="white"
        dy=".1em"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
      >
        T
      </text>
    </svg>
    <span className="text-xl font-bold text-white">OneView Dealer Portal</span>
  </div>
);

export default function DealerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pathname, setPathname] = useState("");
  const dealer = { name: "Ramesh Kumar", dealerId: "DLR-7890" };

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const navItems = [
    {
      name: "Customer Lookup",
      href: "/customer-lookup",
      icon: <UserSearchIcon />,
    },
    {
      name: "New Application",
      href: "/new-application",
      icon: <NewApplicationIcon />,
    },
    {
      name: "Pending Applications",
      href: "/pending-applications",
      icon: <NewApplicationIcon />,
    },
    {
      name: "Dealer Kiosk",
      href: "/dealer-kiosk",
      icon: <NewApplicationIcon />,
    },
  ];

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px] text-gray-300">
      <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Logo />
            </div>
            <div className="flex items-center">
              <div className="text-right mr-4">
                <p className="text-sm font-medium text-white">{dealer.name}</p>
                <p className="text-xs text-gray-500">ID: {dealer.dealerId}</p>
              </div>
              <Link
                href="/"
                className="p-2 rounded-full text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <LogoutIcon />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 border-b border-gray-800 pb-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 font-medium text-sm rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600/20 text-blue-300"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </a>
              );
            })}
          </nav>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="py-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
