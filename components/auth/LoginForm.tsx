// File: components/auth/LoginForm.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

// --- Icon for Social Login Button ---
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

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Login successful for:", email);
      window.location.href = "/dashboard";
    } catch {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full px-4 py-3 bg-gray-800/80 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 relative block w-full px-4 py-3 bg-gray-800/80 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        {error && (
          <p className="text-sm text-center text-red-400 animate-fade-in-up">
            {error}
          </p>
        )}
        <div>
          <button
            type="submit"
            className="relative flex justify-center w-full px-4 py-3 text-base font-semibold text-white bg-blue-600 border border-transparent rounded-lg group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 disabled:bg-blue-400/50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 animate-glow"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </form>
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-gray-700"></div>
        <span className="flex-shrink mx-4 text-xs text-gray-500">
          OR CONTINUE WITH
        </span>
        <div className="flex-grow border-t border-gray-700"></div>
      </div>
      <div>
        <button
          type="button"
          className="relative flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-300 bg-gray-800/80 border border-gray-700 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-gray-500 transition-all duration-300 transform hover:scale-105"
        >
          <GoogleIcon />
          <span className="ml-3">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
