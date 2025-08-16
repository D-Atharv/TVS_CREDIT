"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// --- Icon Components (unchanged) ---
const DashboardIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);
const ApplicationsIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);
const ProfileIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
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
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);
const MenuIcon = () => (
  <svg
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
const CloseIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// --- Logo Component (unchanged) ---
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
    <span className="text-xl font-bold text-white">OneView</span>
  </div>
);

// --- Glassmorphic Sidebar Component ---
export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
    {
      name: "My Applications",
      href: "/applications",
      icon: <ApplicationsIcon />,
    },
    { name: "Profile", href: "/profile", icon: <ProfileIcon /> },
    { name: "Raise Ticket", href: "/raise-ticket", icon: <CloseIcon /> },
    { name: "Performance", href: "/performance", icon: <MenuIcon /> },
    // { name: "Loan-document", href: "/loan-generation", icon: <MenuIcon /> },
    { name: "Credit Card", href: "/credit-card", icon: <MenuIcon /> },
  ];

  return (
    // The parent element of this sidebar should have a background image or gradient for the effect to work.
    // Example: <div className="bg-gradient-to-br from-indigo-500 to-purple-600">
    <aside className="flex flex-col h-full bg-black/30 backdrop-blur-xl border-r border-white/20 shadow-2xl">
      <div className="p-4 border-b border-white/20 h-20 flex items-center">
        <Logo />
      </div>
      <nav className="flex-1 px-3 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg group transition-all duration-200 ${
                isActive
                  ? "bg-white/20 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div
                className={
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white transition-colors"
                }
              >
                {item.icon}
              </div>
              <span className="ml-4">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/20">
        <Link
          href="/"
          className="flex items-center w-full px-3 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-white/10 hover:text-white group"
        >
          <div className="text-gray-400 group-hover:text-white transition-colors">
            <LogoutIcon />
          </div>
          <span className="ml-4">Logout</span>
        </Link>
      </div>
    </aside>
    // </div>
  );
}
