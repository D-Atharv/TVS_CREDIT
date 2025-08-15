// File: app/(dashboard)/page.tsx
"use client";
import Link from "next/link";
import React from "react";

// --- Icon Components ---
const BellIcon = () => (
  <svg
    className="w-6 h-6 text-yellow-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a1 1 0 00-2 0v.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);
const GiftIcon = () => (
  <svg
    className="w-6 h-6 text-green-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
    />
  </svg>
);
const ArrowRightIcon = () => (
  <svg
    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

// --- Type Definitions ---
interface Activity {
  id: number;
  type: "payment" | "status" | "offer";
  description: string;
  time: string;
}

// --- Modular Bento Box Components ---
const BentoBox = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-gray-900/70 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl hover:border-blue-700/80 transition-all duration-300 shadow-lg shadow-black/10 ${className}`}
  >
    {children}
  </div>
);

const WelcomeCard = ({ userName }: { userName: string }) => (
  <BentoBox className="lg:col-span-2">
    <h1 className="text-4xl font-bold text-white">Welcome back, {userName}!</h1>
    <p className="mt-2 text-md text-gray-400">
      Here’s a summary of your account activity and offers.
    </p>
    <div className="mt-6 flex flex-col sm:flex-row gap-4">
      <Link
        href="/applications/new"
        className="flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)] transform hover:scale-105"
      >
        Apply for a New Loan
      </Link>
      <Link
        href="/applications"
        className="flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-gray-300 bg-gray-800/80 rounded-lg hover:bg-gray-700/80 transition-colors border border-gray-700"
      >
        View My Applications
      </Link>{" "}
    </div>
  </BentoBox>
);

const OffersCard = () => (
  <BentoBox>
    <div className="flex items-center space-x-3 mb-4">
      <GiftIcon />
      <h2 className="text-xl font-semibold text-white">Pre-approved Offers</h2>
    </div>
    <div className="space-y-3">
      <div>
        <p className="font-semibold text-green-400">Personal Loan</p>
        <p className="text-sm text-gray-400">
          Up to ₹5,00,000 at a special interest rate.
        </p>
      </div>
      <div>
        <p className="font-semibold text-green-400">Credit Card Upgrade</p>
        <p className="text-sm text-gray-400">
          Higher credit limit and new rewards.
        </p>
      </div>
    </div>
    <Link
      href="#"
      className="group flex items-center mt-4 text-sm text-blue-400 hover:text-blue-300"
    >
      <span>View All Offers</span>
      <ArrowRightIcon />
    </Link>{" "}
  </BentoBox>
);

const RecentActivityCard = ({ activities }: { activities: Activity[] }) => (
  <BentoBox className="lg:col-span-3">
    <div className="flex items-center space-x-3 mb-4">
      <BellIcon />
      <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
    </div>
    <ul className="space-y-3">
      {activities.map((activity) => (
        <li
          key={activity.id}
          className="flex justify-between items-center text-sm p-2 rounded-lg hover:bg-gray-800/70 transition-colors"
        >
          <p className="text-gray-300">{activity.description}</p>
          <p className="text-gray-500">{activity.time}</p>
        </li>
      ))}
    </ul>
  </BentoBox>
);

export default function DashboardPage() {
  const userName = "Priya";
  const recentActivities: Activity[] = [
    {
      id: 1,
      type: "status",
      description: "Application TVS-PL-84365 is now 'In Progress'",
      time: "2h ago",
    },
    {
      id: 2,
      type: "payment",
      description: "EMI payment of ₹8,500 received for loan TVS-CDL-19876",
      time: "1d ago",
    },
    {
      id: 3,
      type: "offer",
      description: "You have a new pre-approved Personal Loan offer!",
      time: "3d ago",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px]"></div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <WelcomeCard userName={userName} />
        <OffersCard />
        <RecentActivityCard activities={recentActivities} />
      </div>
    </div>
  );
}
