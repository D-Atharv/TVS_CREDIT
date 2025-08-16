// File: app/page.tsx
"use client";
import Link from "next/link";
import React from "react";

// --- Icons ---
const IconCreditCard = () => (
  <svg
    className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
);

const IconTractor = () => (
  <svg
    className="w-8 h-8 text-lime-400 group-hover:scale-110 transition-transform"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.121 15.879A3 3 0 0112 14H4a2 2 0 00-2 2v2a2 2 0 002 2h8a3 3 0 012.121-.879zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const IconMotorbike = () => (
  <svg
    className="w-8 h-8 text-violet-400 group-hover:scale-110 transition-transform"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    />
  </svg>
);

const IconPersonalLoan = () => (
  <svg
    className="w-8 h-8 text-rose-400 group-hover:scale-110 transition-transform"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

// --- Bento Box Wrapper ---
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

// --- Homepage ---
export default function HomePage() {
  return (
    <main className="min-h-screen bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px] text-gray-300 font-sans p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
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
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Hero Box */}
          <BentoBox className="md:col-span-3 lg:col-span-2 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                The Future of Credit, Unified.
              </h1>
              <p className="mt-4 text-lg text-gray-400">
                Apply, track, and manage any TVS Credit product with ease and
                total transparency. Your journey starts here.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/customer/register"
                className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
              >
                Get Started
              </Link>
              <Link
                href="/customer/login"
                className="px-6 py-3 text-lg font-semibold text-gray-300 rounded-lg hover:bg-gray-800"
              >
                Sign In
              </Link>
            </div>
          </BentoBox>

          {/* Customer Login */}
          <BentoBox>
            <h2 className="text-xl font-semibold text-white mb-4">
              Customer Login
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Access your applications, check loan status, and explore offers.
            </p>
            <Link
              href="/customer/login"
              className="block w-full px-4 py-2 text-center font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
            >
              Login as Customer
            </Link>
          </BentoBox>

          {/* Dealer Login */}
          <BentoBox>
            <h2 className="text-xl font-semibold text-white mb-4">
              Dealer Login
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Manage dealer applications, approve requests, and track payouts.
            </p>
            <Link
              href="/dealer/login"
              className="block w-full px-4 py-2 text-center font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition"
            >
              Login as Dealer
            </Link>
          </BentoBox>

          {/* Why OneView */}
          <BentoBox className="md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4">
              Why OneView?
            </h2>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">✓</span> Live IRCTC-Style
                Tracking
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">✓</span> Multi-Channel
                Access (SMS, App)
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">✓</span> AI-Powered Fast
                Approvals
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">✓</span> Inclusive for
                Rural & Urban Users
              </li>
            </ul>
          </BentoBox>

          {/* Our Products */}
          <BentoBox className="md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4">
              Our Products
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-lg">
                <IconMotorbike />
                <span>Two-Wheeler</span>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-lg">
                <IconTractor />
                <span>Tractor Loan</span>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-lg">
                <IconCreditCard />
                <span>Credit Card</span>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-lg">
                <IconPersonalLoan />
                <span>Personal Loan</span>
              </div>
            </div>
          </BentoBox>

          {/* Quick Eligibility Check */}
          <BentoBox>
            <h2 className="text-xl font-semibold text-white mb-4">
              Quick Eligibility Check
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              See if you qualify for our products in just 30 seconds — no impact
              on your credit score.
            </p>
            <Link
              href="/eligibility-check"
              className="block w-full px-4 py-2 text-center font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
            >
              Start Check
            </Link>
          </BentoBox>

          {/* Latest Updates */}
          <BentoBox>
            <h2 className="text-xl font-semibold text-white mb-4">
              Latest Updates
            </h2>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📢 New Tractor Loan scheme launched</li>
              <li>📈 Interest rates revised for two-wheeler loans</li>
              <li>🤖 AI verification process now faster</li>
            </ul>
          </BentoBox>

          {/* Customer Story */}
          <BentoBox className="md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-3">
              A Farmer's Success
            </h2>
            <blockquote className="text-gray-400 border-l-2 border-lime-500 pl-4 italic">
              "With the tractor loan through OneView, my application was
              approved in two days. The SMS updates were a blessing."
            </blockquote>
            <p className="text-right mt-3 font-semibold text-lime-400">
              - Ramesh, Uttar Pradesh
            </p>
          </BentoBox>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-600 text-sm">
          <p>
            &copy; {new Date().getFullYear()} TVS Credit Services Limited. All
            Rights Reserved.
          </p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="hover:text-gray-400">
              Privacy Policy
            </Link>
            <span>&middot;</span>
            <Link href="#" className="hover:text-gray-400">
              Terms of Service
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
