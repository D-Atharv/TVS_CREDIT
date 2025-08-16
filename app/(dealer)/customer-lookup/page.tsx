// File: app/(dealer)/customer-lookup/page.tsx
"use client";

import React, { useState } from "react";

// --- Icon Components ---
const SearchIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
const ErrorIcon = () => (
  <svg
    className="w-6 h-6 text-red-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const UserGroupIcon = () => (
  <svg
    className="w-8 h-8 text-blue-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.964A3.375 3.375 0 0112 12.75a3.375 3.375 0 013.75 3.75m-7.5-2.964A3.375 3.375 0 0012 12.75a3.375 3.375 0 003.75 3.75M9.75 11.25A3.375 3.375 0 0113.125 7.5a3.375 3.375 0 013.75 3.75m-7.5-2.964A3.375 3.375 0 006.375 7.5a3.375 3.375 0 00-3.75 3.75m14.25 8.816c.091-.083.18-.168.267-.253A5.035 5.035 0 0018 18.72m-7.5-2.964A5.035 5.035 0 0112 18.72m-3.75-2.964A5.035 5.035 0 006 18.72m12-8.816c-.087.085-.175.17-.267.253m-11.466 0c.091-.085.18-.17.267-.253"
    />
  </svg>
);

// --- Type Definitions ---
type Status = "Approved" | "In Progress" | "Rejected";
interface ApplicationResultData {
  id: string;
  name: string;
  type: string;
  status: Status;
}
interface ExistingCustomer {
  id: number;
  name: string;
  phone: string;
  lastProduct: string;
}

// --- Mock Data ---
const existingCustomers: ExistingCustomer[] = [
  {
    id: 1,
    name: "Arjun Singh",
    phone: "9876543211",
    lastProduct: "Two-Wheeler Loan",
  },
  {
    id: 2,
    name: "Sunita Devi",
    phone: "9876543212",
    lastProduct: "Consumer Durable Loan",
  },
  {
    id: 3,
    name: "Vikram Kumar",
    phone: "9876543213",
    lastProduct: "Tractor Loan",
  },
];

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

const StatusBadge = ({ status }: { status: Status }) => {
  const statusClasses = {
    Approved: "bg-green-500/10 text-green-400 border-green-500/20",
    "In Progress": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full border ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
};

const ApplicationResult = ({ result }: { result: ApplicationResultData }) => (
  <BentoBox className="mt-8 animate-fade-in-up">
    <h3 className="text-xl font-semibold text-white mb-4">Application Found</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
      <div className="text-gray-400">Customer Name:</div>
      <div className="text-white font-medium">{result.name}</div>
      <div className="text-gray-400">Application ID:</div>
      <div className="text-white font-mono">{result.id}</div>
      <div className="text-gray-400">Product:</div>
      <div className="text-white">{result.type}</div>
      <div className="text-gray-400">Status:</div>
      <div>
        <StatusBadge status={result.status} />
      </div>
    </div>
    <div className="mt-6 border-t border-gray-800 pt-4">
      <a
        href={`/dashboard/applications/${result.id}`}
        className="text-sm font-medium text-blue-400 hover:underline"
      >
        View Full Status Tracker &rarr;
      </a>
    </div>
  </BentoBox>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <BentoBox className="mt-8 animate-fade-in-up flex items-center space-x-4 border-red-500/30">
    <ErrorIcon />
    <p className="text-sm text-red-400">{message}</p>
  </BentoBox>
);

export default function CustomerLookupPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] =
    useState<ApplicationResultData | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSearchResult(null);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (
      searchTerm === "9876543210" ||
      searchTerm.toUpperCase() === "TVS-PL-84365"
    ) {
      setSearchResult({
        id: "TVS-PL-84365",
        name: "Priya Sharma",
        type: "Personal Loan",
        status: "In Progress",
      });
    } else {
      setError("No application found for the given details.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <div className="max-w-4xl mx-auto space-y-8">
        <BentoBox>
          <h1 className="text-2xl font-bold text-white">
            Customer Application Lookup
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Enter a customer's registered phone number or their application ID
            to find their status.
          </p>
          <form
            onSubmit={handleSearch}
            className="mt-6 flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-grow relative">
              <label htmlFor="search" className="sr-only">
                Search Term
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-gray-800/80 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300"
                placeholder="Phone Number or Application ID"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)] transform hover:scale-105 disabled:bg-blue-400/50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </form>
        </BentoBox>

        {error && <ErrorMessage message={error} />}
        {searchResult && <ApplicationResult result={searchResult} />}

        <BentoBox>
          <div className="flex items-center space-x-4 mb-4">
            <UserGroupIcon />
            <h2 className="text-xl font-semibold text-white">
              Existing Customers
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th
                    scope="col"
                    className="py-3 pr-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Last Product
                  </th>
                  <th scope="col" className="relative py-3 pl-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {existingCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-4 pr-3 text-sm font-medium text-white">
                      {customer.name}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-400 font-mono">
                      {customer.phone}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-400">
                      {customer.lastProduct}
                    </td>
                    <td className="py-4 pl-3 text-right text-sm font-medium">
                      <button
                        onClick={() => setSearchTerm(customer.phone)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BentoBox>
      </div>
    </div>
  );
}
