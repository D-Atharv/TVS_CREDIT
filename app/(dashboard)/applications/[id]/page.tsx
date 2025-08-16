"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  ChevronRight,
  Loader2,
} from "lucide-react";

type Status = "completed" | "current" | "upcoming" | "skipped" | "pending";

interface Step {
  step: number;
  title: string;
  description: string;
  status: Status;
  details?: string[];
  estimatedTime?: string;
  documents?: string[];
}

const BentoBox = ({
  children,
  className = "",
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) => (
  <div
    className={`relative bg-gray-900/80 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl hover:border-blue-700/80 transition-all duration-300 shadow-lg shadow-black/10 overflow-hidden ${className}`}
  >
    {glow && (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      </div>
    )}
    {children}
  </div>
);

const StatusIcon = ({ status, step }: { status: Status; step: number }) => {
  const iconSize = "w-5 h-5";

  switch (status) {
    case "completed":
      return <CheckCircle2 className={`${iconSize} text-green-500`} />;
    case "current":
      return <Loader2 className={`${iconSize} text-blue-400 animate-spin`} />;
    case "pending":
      return <Clock className={`${iconSize} text-yellow-400`} />;
    case "skipped":
      return <XCircle className={`${iconSize} text-red-500`} />;
    default:
      return (
        <div className="w-5 h-5 flex items-center justify-center text-gray-400 font-medium text-xs">
          {step}
        </div>
      );
  }
};

const TrackerStep = ({
  step,
  title,
  description,
  status,
  details,
  estimatedTime,
  documents,
  isInline = false,
}: Step & { isLast?: boolean; isInline?: boolean }) => {
  const statusStyles = {
    completed: {
      container: "border-green-500/20",
      text: "text-white",
      description: "text-green-400",
    },
    current: {
      container: "border-blue-500/30 bg-blue-900/10",
      text: "text-blue-300 font-semibold",
      description: "text-blue-400",
    },
    upcoming: {
      container: "border-gray-800",
      text: "text-gray-400",
      description: "text-gray-500",
    },
    skipped: {
      container: "border-red-500/20 bg-red-900/10",
      text: "text-red-400 line-through",
      description: "text-red-500",
    },
    pending: {
      container: "border-yellow-500/20 bg-yellow-900/10",
      text: "text-yellow-300 font-semibold",
      description: "text-yellow-400",
    },
  };

  const [expanded, setExpanded] = useState(
    status === "current" || status === "pending"
  );

  return (
    <li
      className={`relative ${
        isInline ? "pr-4" : "pb-8"
      } transition-all duration-200 ${expanded ? "mb-4" : "mb-0"}`}
    >
      <div
        className={`relative flex flex-col border rounded-xl p-4 ${
          statusStyles[status].container
        } ${
          expanded ? "shadow-md shadow-blue-500/10" : ""
        } transition-all duration-200 cursor-pointer hover:border-blue-500/50`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              status === "completed"
                ? "bg-green-500/10 border-green-500/30"
                : status === "current"
                ? "bg-blue-500/10 border-blue-500/50"
                : status === "pending"
                ? "bg-yellow-500/10 border-yellow-500/30"
                : status === "skipped"
                ? "bg-red-500/10 border-red-500/30"
                : "bg-gray-800/50 border-gray-700"
            }`}
          >
            <StatusIcon status={status} step={step} />
          </div>

          <div className="ml-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4
                  className={`text-lg font-medium ${statusStyles[status].text}`}
                >
                  {title}
                </h4>
                <p
                  className={`mt-1 text-sm ${statusStyles[status].description}`}
                >
                  {description}
                </p>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  expanded ? "rotate-90" : ""
                }`}
              />
            </div>

            {estimatedTime &&
              status !== "completed" &&
              status !== "skipped" && (
                <div className="mt-2 flex items-center text-xs text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Estimated time: {estimatedTime}</span>
                </div>
              )}
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pl-14 space-y-3 animate-fadeIn">
            {details && details.length > 0 && (
              <div>
                <h5 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                  Details
                </h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  {details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-gray-500 mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {documents && documents.length > 0 && (
              <div>
                <h5 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                  Documents Verified
                </h5>
                <div className="flex flex-wrap gap-2">
                  {documents.map((doc, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-gray-800/50 rounded-md text-gray-300"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {status === "skipped" && (
              <div className="flex items-start p-3 bg-red-900/20 rounded-lg border border-red-900/30">
                <AlertCircle className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0 mr-2" />
                <p className="text-sm text-red-300">
                  This step was skipped due to incomplete information. Please
                  contact support for assistance.
                </p>
              </div>
            )}

            {status === "pending" && (
              <div className="flex items-start p-3 bg-yellow-900/20 rounded-lg border border-yellow-900/30">
                <AlertCircle className="w-4 h-4 mt-0.5 text-yellow-400 flex-shrink-0 mr-2" />
                <p className="text-sm text-yellow-300">
                  Awaiting manual verification from our team. This typically
                  takes 1-2 business days.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

const VerificationGroup = ({ steps }: { steps: Step[] }) => {
  const allCompleted = steps.every((step) => step.status === "completed");
  const anyCurrent = steps.some(
    (step) => step.status === "current" || step.status === "pending"
  );
  const anySkipped = steps.some((step) => step.status === "skipped");

  let status: Status = "upcoming";
  if (allCompleted) status = "completed";
  else if (anyCurrent) status = "current";
  else if (anySkipped) status = "skipped";

  const [expanded, setExpanded] = useState(anyCurrent);

  return (
    <li className="relative pb-8">
      <div className="absolute top-8 left-5 -ml-px mt-1 w-0.5 h-full bg-gray-800" />

      <div
        className={`relative border rounded-xl p-4 ${
          status === "completed"
            ? "border-green-500/20 bg-green-900/10"
            : status === "current"
            ? "border-blue-500/30 bg-blue-900/10"
            : status === "skipped"
            ? "border-red-500/20 bg-red-900/10"
            : "border-gray-800"
        } transition-all duration-200 cursor-pointer hover:border-blue-500/50 ${
          expanded ? "shadow-md shadow-blue-500/10" : ""
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              status === "completed"
                ? "bg-green-500/10 border-green-500/30"
                : status === "current"
                ? "bg-blue-500/10 border-blue-500/50"
                : status === "skipped"
                ? "bg-red-500/10 border-red-500/30"
                : "bg-gray-800/50 border-gray-700"
            }`}
          >
            <StatusIcon status={status} step={steps[0].step} />
          </div>

          <div className="ml-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4
                  className={`text-lg font-medium ${
                    status === "completed"
                      ? "text-white"
                      : status === "current"
                      ? "text-blue-300"
                      : status === "skipped"
                      ? "text-red-400"
                      : "text-gray-400"
                  }`}
                >
                  Verification Checks
                </h4>
                <p
                  className={`mt-1 text-sm ${
                    status === "completed"
                      ? "text-green-400"
                      : status === "current"
                      ? "text-blue-400"
                      : status === "skipped"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {steps.length} automated verification checks
                </p>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  expanded ? "rotate-90" : ""
                }`}
              />
            </div>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pl-14 space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {steps.map((step) => (
                <div
                  key={step.step}
                  className={`p-3 rounded-lg border ${
                    step.status === "completed"
                      ? "border-green-500/20 bg-green-900/10"
                      : step.status === "current"
                      ? "border-blue-500/20 bg-blue-900/10"
                      : step.status === "pending"
                      ? "border-yellow-500/20 bg-yellow-900/10"
                      : step.status === "skipped"
                      ? "border-red-500/20 bg-red-900/10"
                      : "border-gray-800 bg-gray-900/50"
                  }`}
                >
                  <div className="flex items-center">
                    <StatusIcon status={step.status} step={step.step} />
                    <h5
                      className={`ml-2 text-sm font-medium ${
                        step.status === "completed"
                          ? "text-white"
                          : step.status === "current"
                          ? "text-blue-300"
                          : step.status === "pending"
                          ? "text-yellow-300"
                          : step.status === "skipped"
                          ? "text-red-400"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </h5>
                  </div>
                  <p
                    className={`mt-1 text-xs ${
                      step.status === "completed"
                        ? "text-green-400"
                        : step.status === "current"
                        ? "text-blue-400"
                        : step.status === "pending"
                        ? "text-yellow-400"
                        : step.status === "skipped"
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {status === "current" && (
              <div className="flex items-start p-3 bg-blue-900/20 rounded-lg border border-blue-900/30">
                <AlertCircle className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0 mr-2" />
                <p className="text-sm text-blue-300">
                  Our system is currently running automated verification checks.
                  This usually takes 2-5 minutes.
                </p>
              </div>
            )}

            {anySkipped && (
              <div className="flex items-start p-3 bg-red-900/20 rounded-lg border border-red-900/30">
                <AlertCircle className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0 mr-2" />
                <p className="text-sm text-red-300">
                  Some checks could not be completed automatically. Our team
                  will review these manually.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

const ApplicationStatusTracker = ({ steps }: { steps: Step[] }) => (
  <BentoBox glow>
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-2xl font-bold text-white">Application Progress</h2>
      <div className="flex items-center text-sm bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full border border-blue-800">
        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
        <span>Live Updates</span>
      </div>
    </div>

    <div className="mt-1 mb-6">
      <div className="flex items-center text-sm text-gray-400">
        <span>Last updated: Just now</span>
        <span className="mx-2">•</span>
        <span>Estimated completion: 15-20 minutes</span>
      </div>
    </div>

    <ol className="">
      {steps.map((s, index) => {
        // Group the verification steps together
        if (s.title === "Credit Bureau Check") {
          const verificationSteps = [
            s,
            steps[index + 1],
            steps[index + 2],
          ].filter(Boolean) as Step[];

          return (
            <VerificationGroup
              key={`verification-group`}
              steps={verificationSteps}
            />
          );
        }

        // Skip steps that are part of the verification group
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

const DocumentCard = ({
  title,
  status,
  date,
  type,
}: {
  title: string;
  status: "verified" | "pending" | "rejected";
  date: string;
  type: string;
}) => {
  const statusStyles = {
    verified: {
      bg: "bg-green-900/20",
      text: "text-green-400",
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
    pending: {
      bg: "bg-yellow-900/20",
      text: "text-yellow-400",
      icon: <Clock className="w-4 h-4" />,
    },
    rejected: {
      bg: "bg-red-900/20",
      text: "text-red-400",
      icon: <XCircle className="w-4 h-4" />,
    },
  };

  return (
    <div className="border border-gray-800 rounded-lg p-4 hover:border-blue-500/50 transition-colors duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-white">{title}</h4>
          <p className="text-sm text-gray-400 mt-1">{type}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full flex items-center ${statusStyles[status].bg} ${statusStyles[status].text}`}
        >
          {statusStyles[status].icon}
          <span className="ml-1 capitalize">{status}</span>
        </span>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-800 flex justify-between items-center">
        <span className="text-xs text-gray-500">Uploaded: {date}</span>
        <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

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
    interestRate: "10.5%",
    tenure: "36 months",
    emi: "₹16,200",
    purpose: "Agricultural Equipment Purchase",
  });

  // eslint-disable-next-line
  const [documents, _] = useState([
    {
      title: "Aadhaar Card",
      status: "verified",
      date: "15 Aug 2023",
      type: "Identity Proof",
    },
    {
      title: "PAN Card",
      status: "verified",
      date: "15 Aug 2023",
      type: "Identity Proof",
    },
    {
      title: "Bank Statement",
      status: "verified",
      date: "15 Aug 2023",
      type: "Financial Document",
    },
    {
      title: "Land Ownership Proof",
      status: "pending",
      date: "15 Aug 2023",
      type: "Property Document",
    },
  ]);

  const baseSteps: Step[] = [
    {
      step: 1,
      title: "Application Received",
      description: "We have received your application",
      status: "completed",
      details: [
        "Application submitted successfully",
        "All required information collected",
        "Initial validation passed",
      ],
      estimatedTime: "Immediate",
    },
    {
      step: 2,
      title: "Document Verification",
      description: "Your documents are being verified",
      status: "completed",
      details: [
        "3 out of 4 documents verified",
        "Land ownership proof pending",
        "No discrepancies found in verified documents",
      ],
      documents: ["Aadhaar Card", "PAN Card", "Bank Statement"],
      estimatedTime: "5-10 minutes",
    },
    {
      step: 3,
      title: "Credit Bureau Check",
      description: "Checking your credit history with CIBIL",
      status: "completed",
      details: [
        "CIBIL score: 782 (Excellent)",
        "No active delinquencies",
        "Credit utilization: 32%",
      ],
      estimatedTime: "2-3 minutes",
    },
    {
      step: 4,
      title: "AI Verification - Telco Data",
      description: "Phone active for 7+ years",
      status: "completed",
      details: [
        "Mobile number verified: 98XXXXXXXX",
        "Consistent usage pattern",
        "No frequent number changes",
      ],
      estimatedTime: "1-2 minutes",
    },
    {
      step: 5,
      title: "AI Verification - Mandi Payments",
      description: "Confirmed regular produce sales",
      status: "current",
      details: [
        "Verified 12 transactions in last 6 months",
        "Average monthly sales: ₹1,20,000",
        "Payment consistency: 92%",
      ],
      estimatedTime: "3-5 minutes",
    },
    {
      step: 6,
      title: "Dealer Confirmation",
      description: "Dealer confirms past purchase record",
      status: "upcoming",
      estimatedTime: "1-2 business days",
      details: [
        "Requires manual verification",
        "Dealer will be contacted",
        "Typically takes 24-48 hours",
      ],
    },
    {
      step: 7,
      title: "Final Approval",
      description: "The final decision is being made",
      status: "upcoming",
      estimatedTime: "Immediate after verification",
    },
    {
      step: 8,
      title: "Disbursal",
      description: "The loan amount will be transferred",
      status: "upcoming",
      estimatedTime: "Within 1 hour of approval",
      details: ["Amount will be credited to your registered bank account"],
    },
  ];

  useEffect(() => {
    setSteps(baseSteps);

    const runSteps = async () => {
      // Simulate the Mandi Payments check taking some time
      await new Promise((resolve) => setTimeout(resolve, 4000));

      setSteps((prev) => {
        const updated = [...prev];
        updated[4].status = "completed"; // Complete Mandi Payments
        updated[5].status = "pending"; // Set Dealer Confirmation to pending (yellow)
        return updated;
      });
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
    <div className="min-h-screen bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px] text-gray-300 p-4 sm:p-6 lg:p-8">
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
          Application <span className="text-blue-400">Status</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <BentoBox>
            <h2 className="text-xl font-semibold text-white mb-4">
              <span className="text-blue-400">#</span> Application Details
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  Application ID
                </h3>
                <p className="font-mono text-white text-lg">
                  {applicationDetails.id}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Product
                  </h3>
                  <p className="text-white">{applicationDetails.product}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Amount
                  </h3>
                  <p className="text-white">{applicationDetails.amount}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Interest Rate
                  </h3>
                  <p className="text-white">
                    {applicationDetails.interestRate}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Tenure
                  </h3>
                  <p className="text-white">{applicationDetails.tenure}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">EMI</h3>
                <p className="text-white">{applicationDetails.emi}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  Purpose
                </h3>
                <p className="text-white">{applicationDetails.purpose}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  Submitted On
                </h3>
                <p className="text-white">{applicationDetails.submittedDate}</p>
              </div>
            </div>
          </BentoBox>

          <BentoBox>
            <h2 className="text-xl font-semibold text-white mb-4">
              <span className="text-blue-400">✓</span> Documents
            </h2>
            <div className="space-y-3">
              {documents.map((doc, i) => (
                <DocumentCard
                  key={i}
                  {...doc}
                  status={doc.status as "verified" | "pending" | "rejected"}
                />
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800">
              <button className="w-full py-2 px-4 bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 rounded-lg border border-blue-800 transition-colors duration-200 flex items-center justify-center">
                <span>Upload Additional Documents</span>
              </button>
            </div>
          </BentoBox>
        </div>

        <div className="lg:col-span-2">
          <ApplicationStatusTracker steps={steps} />

          <BentoBox className="mt-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              <span className="text-blue-400">?</span> Need Help?
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="font-medium text-white mb-2">
                  Customer Support
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  Our team is available 24/7 to assist you with your
                  application.
                </p>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center">
                  <span>Chat with us now</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="font-medium text-white mb-2">
                  Application FAQs
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  Find answers to common questions about the application
                  process.
                </p>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center">
                  <span>View FAQs</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </BentoBox>
        </div>
      </div>
    </div>
  );
}
