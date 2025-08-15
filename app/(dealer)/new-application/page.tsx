// File: app/(dealer)/new-application/page.tsx
"use client";

import React, { useState } from "react";

// --- Icon Components ---
const SuccessIcon = () => (
  <svg
    className="w-16 h-16 text-green-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// --- Modular Components ---

const BentoBox = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-gray-900/70 border border-gray-800 rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 shadow-lg shadow-black/10 ${className}`}
  >
    {children}
  </div>
);

const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-400 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      name={id}
      id={id}
      className="block w-full px-4 py-3 bg-gray-800/80 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

// --- Main Page Component ---

export default function NewApplicationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px] flex items-center justify-center p-4 animate-fade-in-up">
        <BentoBox className="max-w-lg mx-auto text-center">
          <div className="flex justify-center mb-4">
            <SuccessIcon />
          </div>
          <h2 className="text-2xl font-bold text-green-400">
            Application Started Successfully!
          </h2>
          <p className="mt-2 text-gray-400">
            The application has been created with ID{" "}
            <span className="font-semibold text-white">TVS-TL-99876</span>.
          </p>
          <p className="mt-2 text-gray-400">
            The customer will receive an SMS/WhatsApp link to complete the KYC
            process.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-8 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)] transform hover:scale-105"
          >
            Start Another Application
          </button>
        </BentoBox>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <BentoBox className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white">
          Start a New Customer Application
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Fill in the basic details below. The customer will be notified to
          complete the rest of the journey.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <FormField
              label="Customer Full Name"
              id="fullName"
              placeholder="e.g., Ramesh Singh"
            />
            <FormField
              label="Customer Phone Number"
              id="phone"
              type="tel"
              placeholder="e.g., 9988776655"
            />
            <div className="sm:col-span-2">
              <label
                htmlFor="product"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Product Type
              </label>
              <select
                id="product"
                name="product"
                className="block w-full px-4 py-3 bg-gray-800/80 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300"
                defaultValue="Tractor Loan"
              >
                <option>Tractor Loan</option>
                <option>Two-Wheeler Loan</option>
                <option>Personal Loan</option>
                <option>Consumer Durable Loan</option>
              </select>
            </div>
            <FormField
              label="Loan Amount Requested (₹)"
              id="amount"
              type="number"
              placeholder="e.g., 750000"
            />
          </div>

          <div className="pt-5 border-t border-gray-800">
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)] transform hover:scale-105 disabled:bg-blue-400/50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Create & Notify Customer"}
              </button>
            </div>
          </div>
        </form>
      </BentoBox>
    </div>
  );
}
