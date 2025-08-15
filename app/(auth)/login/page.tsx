// File: app/(auth)/login/page.tsx
"use client";

import LoginForm from "@/components/auth/LoginForm";
import React, { useState, useEffect } from "react";

// --- Icon Components ---
const TrackingIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const RocketIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);
const ShieldIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 019-4.016z"
    />
  </svg>
);
const GoogleIcon = () => (
  <svg
    className="w-5 h-5"
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="google"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 488 512"
  >
    <path
      fill="currentColor"
      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 76.2C322.3 121.3 287.4 96 248 96c-88.8 0-160.1 71.1-160.1 160S159.2 416 248 416c94.9 0 145.3-64.5 149.9-98.2H248v-96h239.8c4.7 22.6 7.2 46.5 7.2 71z"
    ></path>
  </svg>
);
const Logo = () => (
  <svg
    width="48"
    height="48"
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
);

// --- Merged LoginForm Component ---

const features = [
  {
    Icon: TrackingIcon,
    title: "Live Application Tracking",
    description:
      "Monitor your application status in real-time, just like tracking a train ticket.",
    color: "text-cyan-400",
  },
  {
    Icon: RocketIcon,
    title: "AI-Powered Approvals",
    description:
      "Our intelligent system finds the fastest path to get your application approved.",
    color: "text-violet-400",
  },
  {
    Icon: ShieldIcon,
    title: "Bank-Grade Security",
    description:
      "Your personal and financial data is protected with end-to-end encryption.",
    color: "text-lime-400",
  },
];

export default function LoginPage() {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px] text-gray-300 font-sans overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px]"></div>
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 h-screen p-12 bg-gray-900/50 border-r border-gray-800 relative">
        <div className="w-full max-w-md">
          {features.map((feature, index) => {
            const { Icon, title, description, color } = feature;
            const isActive = index === currentFeature;
            return (
              <div
                key={title}
                className={`absolute transition-opacity duration-1000 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-800/80 border border-gray-700 mb-6 transition-transform duration-1000 ${
                    isActive ? "translate-y-0" : "-translate-y-5"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 ${color} transition-transform duration-1000 ${
                      isActive ? "scale-100" : "scale-75"
                    }`}
                  />
                </div>
                <h1
                  className={`text-4xl font-bold text-white transition-transform duration-1000 delay-100 ${
                    isActive ? "translate-y-0" : "-translate-y-5"
                  }`}
                >
                  {title}
                </h1>
                <p
                  className={`mt-4 text-lg text-gray-400 transition-transform duration-1000 delay-200 ${
                    isActive ? "translate-y-0" : "-translate-y-5"
                  }`}
                >
                  {description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-10 left-12 flex space-x-2">
          {features.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full bg-gray-700 transition-all duration-500 ${
                index === currentFeature ? "w-8 bg-blue-500" : "w-4"
              }`}
            ></div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 space-y-8 bg-gray-900/30 md:bg-transparent rounded-2xl md:rounded-none backdrop-blur-xl md:backdrop-blur-none animate-fade-in-up">
          <div className="text-center">
            <div className="flex justify-center mx-auto mb-4">
              <Logo />
            </div>
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-400">
              Sign in to access your TVS Credit OneView account.
            </p>
          </div>
          <LoginForm />
          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
