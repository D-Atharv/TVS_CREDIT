// File: components/dealer/DealerKioskForm.tsx
"use client";

import React, { useState } from "react";
import Button from "../ui/Button";

// --- FormField Component for reuse ---
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
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <input
        type={type}
        name={id}
        id={id}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        placeholder={placeholder}
        required={required}
      />
    </div>
  </div>
);

export default function DealerKioskForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a network request to the backend API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setFormSubmitted(true);
  };

  if (formSubmitted) {
    return (
      <div className="text-center">
        <h3 className="text-xl font-bold text-green-600">
          Application Initiated!
        </h3>
        <p className="mt-2 text-gray-600">
          Customer has been sent an SMS to complete the next steps.
        </p>
        <button
          onClick={() => setFormSubmitted(false)}
          className="mt-6 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          Start New Application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 divide-y divide-gray-200"
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Customer & Product Details
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Enter the customers basic information to begin the onboarding
              process.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <FormField
                label="Customer Full Name"
                id="fullName"
                placeholder="e.g., Priya Sharma"
              />
            </div>
            <div className="sm:col-span-3">
              <FormField
                label="Customer Phone Number"
                id="phone"
                type="tel"
                placeholder="e.g., 9876543210"
              />
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="product"
                className="block text-sm font-medium text-gray-700"
              >
                Product Type
              </label>
              <select
                id="product"
                name="product"
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                defaultValue="Two-Wheeler Loan"
              >
                <option>Two-Wheeler Loan</option>
                <option>Tractor Loan</option>
                <option>Personal Loan</option>
                <option>Consumer Durable Loan</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <FormField
                label="Loan Amount (₹)"
                id="amount"
                type="number"
                placeholder="e.g., 85000"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <Button type="submit" isLoading={isLoading} variant="primary">
            Submit and Notify Customer
          </Button>
        </div>
      </div>
    </form>
  );
}
