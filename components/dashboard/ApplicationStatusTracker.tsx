// File: components/dashboard/ApplicationStatusTracker.tsx
"use client";

import React from "react";

// --- Type Definitions ---
type Status = "completed" | "current" | "upcoming";

interface Step {
  step: number;
  title: string;
  description: string;
  status: Status;
}

// --- Modular Components ---

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

const TrackerStep = ({
  step,
  title,
  description,
  status,
  isLast = false,
}: Step & { isLast?: boolean }) => {
  const statusStyles = {
    completed: {
      circle: "bg-blue-600 border-blue-500",
      line: "bg-blue-600",
      text: "text-white",
    },
    current: {
      circle: "bg-blue-600 border-blue-500 ring-4 ring-blue-500/20",
      line: "bg-gray-700",
      text: "text-blue-300 font-semibold",
    },
    upcoming: {
      circle: "bg-gray-800 border-gray-700",
      line: "bg-gray-700",
      text: "text-gray-500",
    },
  };

  return (
    <li className="relative flex items-start pb-10">
      {!isLast && (
        <div
          className={`absolute top-5 left-5 -ml-px mt-1 w-0.5 h-full ${statusStyles[status].line}`}
        ></div>
      )}
      <div className="relative flex items-center">
        <div
          className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${statusStyles[status].circle}`}
        >
          {status === "completed" ? (
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <span className="font-bold text-gray-400">{step}</span>
          )}
        </div>
        <div className="ml-4">
          <h4 className={`text-lg font-medium ${statusStyles[status].text}`}>
            {title}
          </h4>
          <p className="mt-1 text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </li>
  );
};

// --- Main Tracker Component ---
export default function ApplicationStatusTracker({ steps }: { steps: Step[] }) {
  if (!steps || steps.length === 0) {
    return (
      <BentoBox>
        <p className="text-gray-400">No status information available.</p>
      </BentoBox>
    );
  }

  return (
    <BentoBox>
      <h2 className="text-xl font-semibold text-white">Live Status Tracker</h2>
      <ol className="mt-6">
        {steps.map((s, index) => (
          <TrackerStep
            key={s.step}
            {...s}
            isLast={index === steps.length - 1}
          />
        ))}
      </ol>
    </BentoBox>
  );
}
