"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

type Status = "completed" | "current" | "upcoming" | "skipped" | "pending";

interface Step {
  step: number;
  title: string;
  description: string;
  status: Status;
}

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
  isInline = false,
}: Step & { isLast?: boolean; isInline?: boolean }) => {
  const statusStyles = {
    completed: {
      circle: "bg-blue-600 border-blue-500",
      line: "bg-blue-600",
      text: "text-white",
      icon: "✓",
    },
    current: {
      circle: "bg-blue-600 border-blue-500 ring-4 ring-blue-500/20",
      line: "bg-gray-700",
      text: "text-blue-300 font-semibold",
      icon: step.toString(),
    },
    upcoming: {
      circle: "bg-gray-800 border-gray-700",
      line: "bg-gray-700",
      text: "text-gray-500",
      icon: step.toString(),
    },
    skipped: {
      circle: "bg-red-600 border-red-500",
      line: "bg-gray-700",
      text: "text-red-400 line-through",
      icon: "✗",
    },
    pending: {
      circle: "bg-yellow-500 border-yellow-400",
      line: "bg-yellow-500",
      text: "text-yellow-300 font-semibold",
      icon: step.toString(),
    },
  };

  return (
    <li className={`relative flex items-start ${isInline ? "pr-4" : "pb-10"}`}>
      {!isLast && !isInline && (
        <div
          className={`absolute top-5 left-5 -ml-px mt-1 w-0.5 h-full ${statusStyles[status].line}`}
        />
      )}
      <div className="relative flex items-center">
        <div
          className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${statusStyles[status].circle}`}
        >
          <span className="font-bold text-white">
            {statusStyles[status].icon}
          </span>
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

const InlineSteps = ({ steps }: { steps: Step[] }) => {
  return (
    <li className="relative pb-10">
      <div className="absolute top-5 left-5 -ml-px mt-1 w-0.5 h-full bg-gray-700" />
      <div className="flex space-x-4">
        {steps.map((step, index) => (
          <div key={step.step} className="relative flex items-start">
            <div className="relative flex items-center">
              <div
                className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step.status === "completed"
                    ? "bg-blue-600 border-blue-500"
                    : step.status === "current"
                    ? "bg-blue-600 border-blue-500 ring-4 ring-blue-500/20"
                    : step.status === "skipped"
                    ? "bg-red-600 border-red-500"
                    : "bg-gray-800 border-gray-700"
                }`}
              >
                <span className="font-bold text-white">
                  {step.status === "completed"
                    ? "✓"
                    : step.status === "skipped"
                    ? "✗"
                    : step.step.toString()}
                </span>
              </div>
              <div className="ml-4">
                <h4
                  className={`text-lg font-medium ${
                    step.status === "completed"
                      ? "text-white"
                      : step.status === "current"
                      ? "text-blue-300 font-semibold"
                      : step.status === "skipped"
                      ? "text-red-400 line-through"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </h4>
                <p className="mt-1 text-sm text-gray-400">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="absolute top-5 left-full -ml-2 w-8 h-0.5 bg-gray-700" />
            )}
          </div>
        ))}
      </div>
    </li>
  );
};

const ApplicationStatusTracker = ({ steps }: { steps: Step[] }) => (
  <BentoBox>
    <h2 className="text-xl font-semibold text-white">Live Status Tracker</h2>
    <ol className="mt-6">
      {steps.map((s, index) => {
        // Group the verification steps together
        if (s.title === "Credit Bureau Check") {
          const verificationSteps = [
            s,
            steps[index + 1],
            steps[index + 2],
          ].filter(Boolean);

          // If all are upcoming or credit check is current, show inline
          if (
            verificationSteps.every(
              (step) =>
                step.status === "upcoming" ||
                step.status === "current" ||
                step.status === "completed" ||
                step.status === "skipped"
            )
          ) {
            return (
              <InlineSteps key={`inline-${s.step}`} steps={verificationSteps} />
            );
          }
          // Skip the next two steps as they're handled by InlineSteps
          return null;
        }
        // Skip steps that are part of the inline group
        if (
          s.title === "AI Verification - Telco Data" ||
          s.title === "AI Verification - Mandi Payments"
        ) {
          return null;
        }
        return (
          <TrackerStep
            key={s.step}
            {...s}
            isLast={index === steps.length - 1}
          />
        );
      })}
    </ol>
  </BentoBox>
);

export default function ApplicationStatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [applicationDetails, setApplicationDetails] = useState({
    id: "",
    product: "Personal Loan",
    amount: "₹5,00,000",
    submittedDate: new Date().toISOString().split("T")[0],
  });

  const baseSteps: Step[] = [
    {
      step: 1,
      title: "Application Received",
      description: "We have received your application.",
      status: "upcoming",
    },
    {
      step: 2,
      title: "Document Verification",
      description: "Your documents are being verified.",
      status: "upcoming",
    },
    {
      step: 3,
      title: "Credit Bureau Check",
      description: "Checking your credit history with CIBIL.",
      status: "upcoming",
    },
    {
      step: 4,
      title: "AI Verification - Telco Data",
      description: "Phone active for 7+ years.",
      status: "upcoming",
    },
    {
      step: 5,
      title: "AI Verification - Mandi Payments",
      description: "Confirmed regular produce sales.",
      status: "upcoming",
    },
    {
      step: 6,
      title: "Dealer Confirmation",
      description: "Dealer confirms past purchase record.",
      status: "upcoming",
    },
    {
      step: 7,
      title: "Final Approval",
      description: "The final decision is being made.",
      status: "upcoming",
    },
    {
      step: 8,
      title: "Disbursal",
      description: "The loan amount will be transferred.",
      status: "upcoming",
    },
  ];

  useEffect(() => {
    setSteps(baseSteps);

    const runSteps = async () => {
      for (let currentStep = 0; currentStep < baseSteps.length; currentStep++) {
        if (baseSteps[currentStep].title === "Dealer Confirmation") {
          setSteps((prev) => {
            const updated = [...prev];
            if (currentStep > 0) {
              updated[currentStep - 1].status = "completed";
            }
            updated[currentStep].status = "pending"; // Yellow status
            return updated;
          });
          break;
        }

        setSteps((prev) => {
          const updated = [...prev];
          if (currentStep > 0) {
            updated[currentStep - 1].status = "completed";
          }
          updated[currentStep].status = "current";
          return updated;
        });

        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
    };

    runSteps();
  }, []);

  useEffect(() => {
    let isMounted = true;
    params.then((resolved) => {
      if (isMounted) {
        setApplicationDetails((prev) => ({
          ...prev,
          id: resolved?.id || "TVS-PL-00000",
        }));
      }
    });
    return () => {
      isMounted = false;
    };
  }, [params]);

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <Link
          href="/applications"
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
        <BentoBox>
          <h2 className="text-xl font-semibold text-white mb-4">
            Application Details
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-400">Application ID:</div>
            <div className="text-white font-mono">{applicationDetails.id}</div>
            <div className="text-gray-400">Product:</div>
            <div className="text-white">{applicationDetails.product}</div>
            <div className="text-gray-400">Amount:</div>
            <div className="text-white">{applicationDetails.amount}</div>
            <div className="text-gray-400">Submitted On:</div>
            <div className="text-white">{applicationDetails.submittedDate}</div>
          </div>
        </BentoBox>
        <div className="lg:col-span-2">
          <ApplicationStatusTracker steps={steps} />
        </div>
      </div>
    </div>
  );
}
