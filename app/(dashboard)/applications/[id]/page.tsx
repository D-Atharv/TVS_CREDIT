// File: app/(dashboard)/applications/[id]/page.tsx
"use client";
import Link from "next/link";
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

const ApplicationStatusTracker = ({ steps }: { steps: Step[] }) => (
  <BentoBox>
    <h2 className="text-xl font-semibold text-white">Live Status Tracker</h2>
    <ol className="mt-6">
      {steps.map((s, index) => (
        <TrackerStep key={s.step} {...s} isLast={index === steps.length - 1} />
      ))}
    </ol>
  </BentoBox>
);

const ApplicationDetailsCard = ({ details }: { details: any }) => (
  <BentoBox>
    <h2 className="text-xl font-semibold text-white mb-4">
      Application Details
    </h2>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="text-gray-400">Application ID:</div>
      <div className="text-white font-mono">{details.id}</div>
      <div className="text-gray-400">Product:</div>
      <div className="text-white">{details.product}</div>
      <div className="text-gray-400">Amount:</div>
      <div className="text-white">{details.amount}</div>
      <div className="text-gray-400">Submitted On:</div>
      <div className="text-white">{details.submittedDate}</div>
    </div>
  </BentoBox>
);

export default function ApplicationStatusPage({
  params,
}: {
  params: { id: string };
}) {
  const applicationDetails = {
    id: params.id || "TVS-PL-84365",
    product: "Personal Loan",
    amount: "₹5,00,000",
    submittedDate: "2024-08-12",
  };

  const steps: Step[] = [
    {
      step: 1,
      title: "Application Received",
      description: "We have received your application.",
      status: "completed",
    },
    {
      step: 2,
      title: "Document Verification",
      description: "Your documents are being verified.",
      status: "completed",
    },
    {
      step: 3,
      title: "Credit Bureau Check",
      description: "Checking your credit history with CIBIL.",
      status: "current",
    },
    {
      step: 4,
      title: "Final Approval",
      description: "The final decision is being made.",
      status: "upcoming",
    },
    {
      step: 5,
      title: "Disbursal",
      description: "The loan amount will be transferred.",
      status: "upcoming",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <header className="mb-8">
        <Link
          href="/dashboard/applications"
          className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors group"
        >
          <svg
            className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to all applications
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-white">
          Application Status
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ApplicationDetailsCard details={applicationDetails} />
        </div>
        <div className="lg:col-span-2">
          <ApplicationStatusTracker steps={steps} />
        </div>
      </div>
    </div>
  );
}
