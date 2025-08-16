"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

// BentoBox wrapper (same style as your components)
const BentoBox = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-gray-900/70 border border-gray-800 rounded-2xl p-8 backdrop-blur-xl shadow-lg shadow-black/10 ${className}`}
  >
    {children}
  </div>
);

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <BentoBox className="max-w-lg text-center">
        <h1 className="text-6xl font-bold text-lime-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-6">
          Oops! The page you’re looking for doesn’t exist or may have been
          moved.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all"
          >
            ⬅ Go Back
          </button>

          <Link
            href="/"
            className="px-4 py-2 bg-lime-500 text-black font-semibold rounded-xl hover:bg-lime-400 transition-all"
          >
            🏠 Go Home
          </Link>
        </div>
      </BentoBox>
    </div>
  );
}
