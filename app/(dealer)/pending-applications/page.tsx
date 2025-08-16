"use client";
import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  ChevronRight,
  Loader2,
  FileText,
  Info, // Added for reason icon
} from "lucide-react";

// --- Icon Components (Original) ---
const UserIcon = () => (
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
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);
const TractorIcon = () => (
  <svg
    className="w-8 h-8 text-lime-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.121 15.879A3 3 0 0112 14H4a2 2 0 00-2 2v2a2 2 0 002 2h8a3 3 0 012.121-.879zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const CreditCardIcon = () => (
  <svg
    className="w-8 h-8 text-cyan-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 21.75z"
    />
  </svg>
);
const CheckCircleIcon = () => (
  <svg
    className="h-5 w-5 text-green-400"
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
const CrossCircleIcon = () => (
  <svg
    className="h-5 w-5 text-red-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const SkippedIcon = () => (
  <svg
    className="h-5 w-5 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
    />
  </svg>
);
const SuccessAnimationIcon = () => (
  <svg
    className="w-24 h-24 text-green-400"
    viewBox="0 0 133 133"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <circle
        className="bg"
        stroke="#68E534"
        strokeWidth="4"
        cx="66.5"
        cy="66.5"
        r="64.5"
      ></circle>
      <polyline
        className="check"
        stroke="#68E534"
        strokeWidth="5.5"
        points="41 70 56 85 92 49"
      ></polyline>
    </g>
    <style>{`.bg { animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards; stroke-dasharray: 406; stroke-dashoffset: 406; } .check { transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards; } @keyframes stroke { 100% { stroke-dashoffset: 0; } }`}</style>
  </svg>
);
const RejectAnimationIcon = () => (
  <svg
    className="w-24 h-24 text-red-400"
    viewBox="0 0 133 133"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <circle
        className="bg-reject"
        stroke="#F87171"
        strokeWidth="4"
        cx="66.5"
        cy="66.5"
        r="64.5"
      ></circle>
      <line
        className="cross1"
        stroke="#F87171"
        strokeWidth="5.5"
        x1="45"
        y1="45"
        x2="88"
        y2="88"
      ></line>
      <line
        className="cross2"
        stroke="#F87171"
        strokeWidth="5.5"
        x1="88"
        y1="45"
        x2="45"
        y2="88"
      ></line>
    </g>
    <style>{`.bg-reject { animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards; stroke-dasharray: 406; stroke-dashoffset: 406; } .cross1 { transform-origin: 50% 50%; stroke-dasharray: 61; stroke-dashoffset: 61; animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards; } .cross2 { transform-origin: 50% 50%; stroke-dasharray: 61; stroke-dashoffset: 61; animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 1.1s forwards; } @keyframes stroke { 100% { stroke-dashoffset: 0; } }`}</style>
  </svg>
);

// --- Type Definitions ---
type Status = "completed" | "current" | "upcoming" | "skipped" | "pending";
type DocumentStatus = "verified" | "pending" | "rejected";

interface Step {
  step: number;
  title: string;
  description: string;
  status: Status;
  details?: string[];
  estimatedTime?: string;
}
interface VerificationStep {
  text: string;
  status: "pass" | "fail" | "pending" | "skipped";
}
interface Document {
  title: string;
  status: DocumentStatus;
  uploadDate: string;
  type: string;
  reason: string | null;
}

interface Application {
  id: string;
  name: string;
  location: string;
  creditHistory: string;
  product: string;
  productIcon: React.ReactNode;
  amount: string;
  verificationSteps: VerificationStep[];
  trackingSteps: Step[];
  documents: Document[];
  customerRemarks: string | null;
}

// --- Mock Data ---
const initialApplications: Application[] = [
  {
    id: "TVS-TL-34568",
    name: "Ramesh",
    location: "Village in UP",
    creditHistory: "None",
    product: "Tractor Loan",
    productIcon: <TractorIcon />,
    amount: "₹7,50,000",
    verificationSteps: [
      { status: "fail", text: "Bureau Check → No history found." },
      { status: "pass", text: "Telco history → Phone active for 7+ years." },
      { status: "pass", text: "Mandi payments API → Regular sales confirmed." },
      { status: "pass", text: "Dealer purchase record → Confirmed by you." },
    ],
    trackingSteps: [
      {
        step: 1,
        title: "Application Received",
        description: "Submitted at dealer kiosk",
        status: "completed",
      },
      {
        step: 2,
        title: "Credit Bureau Check",
        description: "Standard credit history check",
        status: "skipped",
        details: [
          "No formal credit history found. Switched to alternate scoring.",
        ],
      },
      {
        step: 3,
        title: "AI Verification - Telco Data",
        description: "Phone active for 7+ years",
        status: "completed",
      },
      {
        step: 4,
        title: "AI Verification - Mandi Payments",
        description: "Confirmed regular produce sales",
        status: "completed",
      },
      {
        step: 5,
        title: "Dealer Confirmation",
        description: "Awaiting your final confirmation",
        status: "current",
        estimatedTime: "Immediate action required",
      },
      {
        step: 6,
        title: "Final Approval",
        description: "The final decision will be made post-confirmation",
        status: "upcoming",
      },
    ],
    documents: [
      {
        title: "Aadhaar Card",
        status: "verified",
        uploadDate: "15 Aug 2025",
        type: "Identity Proof",
        reason: "Manually verified by agent.",
      },
      {
        title: "PAN Card",
        status: "verified",
        uploadDate: "15 Aug 2025",
        type: "Identity Proof",
        reason: "Manually verified by agent.",
      },
      {
        title: "Land Ownership Proof",
        status: "pending",
        uploadDate: "15 Aug 2025",
        type: "Property Document",
        reason: null,
      },
      {
        title: "Bank Statement",
        status: "rejected",
        uploadDate: "15 Aug 2025",
        type: "Financial Document",
        reason: "Scanned image is blurry and unreadable.",
      },
    ],
    customerRemarks:
      "I have uploaded all the documents given to me at the dealership. The bank statement was not clear, I will upload a new one soon. Please call me if anything else is needed.",
  },
  {
    id: "TVS-CC-51234",
    name: "Priya",
    location: "Bengaluru",
    creditHistory: "Valid Score (780)",
    product: "Credit Card",
    productIcon: <CreditCardIcon />,
    amount: "N/A",
    verificationSteps: [
      { status: "pass", text: "Bureau Check → Valid score found." },
      { status: "skipped", text: "Telco history → Skipped." },
      { status: "skipped", text: "Mandi payments API → Skipped." },
      { status: "pass", text: "Aadhaar & PAN → Auto-verified via DigiLocker." },
    ],
    trackingSteps: [
      {
        step: 1,
        title: "Application Received",
        description: "Submitted via mobile app",
        status: "completed",
      },
      {
        step: 2,
        title: "Credit Bureau Check",
        description: "Credit history check with CIBIL",
        status: "completed",
        details: ["CIBIL score: 780 (Excellent)"],
      },
      {
        step: 3,
        title: "AI Verification - Telco Data",
        description: "Alternate data check",
        status: "skipped",
        details: ["Skipped as primary credit check was successful."],
      },
      {
        step: 4,
        title: "AI Verification - Mandi Payments",
        description: "Alternate data check",
        status: "skipped",
        details: ["Skipped as primary credit check was successful."],
      },
      {
        step: 5,
        title: "Dealer Confirmation",
        description: "Awaiting your final confirmation",
        status: "current",
        estimatedTime: "Immediate action required",
      },
      {
        step: 6,
        title: "Final Approval",
        description: "The final decision will be made post-confirmation",
        status: "upcoming",
      },
    ],
    documents: [
      {
        title: "Aadhaar Card",
        status: "verified",
        uploadDate: "16 Aug 2025",
        type: "Identity Proof",
        reason: "Auto-verified via DigiLocker.",
      },
      {
        title: "PAN Card",
        status: "verified",
        uploadDate: "16 Aug 2025",
        type: "Identity Proof",
        reason: "Auto-verified via DigiLocker.",
      },
      {
        title: "Salary Slips",
        status: "verified",
        uploadDate: "16 Aug 2025",
        type: "Income Proof",
        reason: "Verified via OCR. No discrepancies found.",
      },
    ],
    customerRemarks: null,
  },
];

// --- Modular Components ---
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
    className={`relative bg-gray-900/70 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 shadow-lg shadow-black/10 overflow-hidden ${className}`}
  >
    {glow && (
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      </div>
    )}
    <div className="relative z-10">{children}</div>
  </div>
);

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold text-white">{value}</p>
  </div>
);
const VerificationItem = ({ step }: { step: VerificationStep }) => (
  <div className="flex items-center space-x-3">
    {step.status === "pass" && <CheckCircleIcon />}{" "}
    {step.status === "fail" && <CrossCircleIcon />}{" "}
    {step.status === "skipped" && <SkippedIcon />}
    <p
      className={`text-sm ${
        step.status === "pass"
          ? "text-green-400"
          : step.status === "fail"
          ? "text-red-400"
          : step.status === "skipped"
          ? "text-gray-500 line-through"
          : "text-gray-400"
      }`}
    >
      {step.text}
    </p>
  </div>
);

// UPDATED DocumentCard Component
const DocumentCard = ({ document }: { document: Document }) => {
  const statusStyles = {
    verified: {
      bg: "bg-green-900/30",
      text: "text-green-400",
      icon: <CheckCircle2 className="w-4 h-4" />,
      reasonText: "text-gray-400",
    },
    pending: {
      bg: "bg-yellow-900/30",
      text: "text-yellow-400",
      icon: <Clock className="w-4 h-4" />,
      reasonText: "text-yellow-500",
    },
    rejected: {
      bg: "bg-red-900/30",
      text: "text-red-400",
      icon: <XCircle className="w-4 h-4" />,
      reasonText: "text-red-400",
    },
  };

  return (
    <div className="border border-gray-800 rounded-lg p-3 hover:border-blue-500/50 transition-colors duration-200">
      <div className="flex items-center">
        <FileText className="w-5 h-5 text-gray-500 flex-shrink-0 mr-3" />
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-white text-sm">{document.title}</h4>
            <span
              className={`text-xs px-2 py-1 rounded-full flex items-center ${
                statusStyles[document.status].bg
              } ${statusStyles[document.status].text}`}
            >
              {statusStyles[document.status].icon}
              <span className="ml-1.5 capitalize">{document.status}</span>
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">{document.type}</p>
        </div>
      </div>
      {document.reason && (
        <div
          className={`mt-2 pt-2 border-t border-gray-800 flex items-start text-xs ${
            statusStyles[document.status].reasonText
          }`}
        >
          {document.status === "rejected" ? (
            <AlertCircle className="w-3 h-3 flex-shrink-0 mr-1.5 mt-0.5" />
          ) : (
            <Info className="w-3 h-3 flex-shrink-0 mr-1.5 mt-0.5" />
          )}
          <span>{document.reason}</span>
        </div>
      )}
    </div>
  );
};

// --- TRACKER COMPONENTS ---
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
}: Step & { isLast?: boolean }) => {
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
      className={`relative pb-8 transition-all duration-200 ${
        expanded ? "mb-4" : "mb-0"
      }`}
    >
      {!statusStyles[status] && (
        <div className="absolute top-8 left-5 -ml-px mt-1 w-0.5 h-full bg-gray-800" />
      )}
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
                  {" "}
                  <Clock className="w-3 h-3 mr-1" />{" "}
                  <span>{estimatedTime}</span>
                </div>
              )}
          </div>
        </div>
        {expanded && (
          <div className="mt-4 pl-14 space-y-3">
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
          </div>
        )}
      </div>
    </li>
  );
};
const VerificationGroup = ({ steps }: { steps: Step[] }) => {
  const allCompleted = steps.every(
    (step) => step.status === "completed" || step.status === "skipped"
  );
  const anyCurrent = steps.some(
    (step) => step.status === "current" || step.status === "pending"
  );
  let status: Status = "upcoming";
  if (allCompleted) status = "completed";
  else if (anyCurrent) status = "current";
  const [expanded, setExpanded] = useState(anyCurrent || !allCompleted);
  return (
    <li className="relative pb-8">
      <div className="absolute top-8 left-5 -ml-px mt-1 w-0.5 h-full bg-gray-800" />
      <div
        className={`relative border rounded-xl p-4 ${
          status === "completed"
            ? "border-green-500/20 bg-green-900/10"
            : "border-blue-500/30 bg-blue-900/10"
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
                : "bg-blue-500/10 border-blue-500/50"
            }`}
          >
            <StatusIcon status={status} step={steps[0].step} />
          </div>
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4
                  className={`text-lg font-medium ${
                    status === "completed" ? "text-white" : "text-blue-300"
                  }`}
                >
                  AI Verification Checks
                </h4>
                <p
                  className={`mt-1 text-sm ${
                    status === "completed" ? "text-green-400" : "text-blue-400"
                  }`}
                >
                  {steps.length} automated checks
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
          <div className="mt-4 pl-14 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.map((step) => (
                <div
                  key={step.step}
                  className={`p-3 rounded-lg border ${
                    step.status === "completed"
                      ? "border-green-500/20 bg-green-900/10"
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
                          : step.status === "skipped"
                          ? "text-red-400 line-through"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title.replace("AI Verification - ", "")}
                    </h5>
                  </div>
                  <p
                    className={`mt-1 text-xs ${
                      step.status === "completed"
                        ? "text-green-400"
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
            {anyCurrent && (
              <div className="flex items-start p-3 bg-blue-900/20 rounded-lg border border-blue-900/30">
                {" "}
                <AlertCircle className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0 mr-2" />{" "}
                <p className="text-sm text-blue-300">
                  System is running automated checks.
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
    <h2 className="text-2xl font-bold text-white mb-4">
      Live Application Progress
    </h2>
    <ol>
      {steps.map((s, index) => {
        if (s.title === "Credit Bureau Check") {
          const verificationSteps = [
            s,
            steps[index + 1],
            steps[index + 2],
          ].filter(Boolean) as Step[];
          return (
            <VerificationGroup
              key="verification-group"
              steps={verificationSteps}
            />
          );
        }
        if (
          s.title === "AI Verification - Telco Data" ||
          s.title === "AI Verification - Mandi Payments"
        )
          return null;
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

// --- Main Page Component ---
export default function PendingApplicationsPage() {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);
  const [selectedApp, setSelectedApp] = useState<Application | null>(
    initialApplications[0] || null
  );
  const [approvalState, setApprovalState] = useState<
    "pending" | "approving" | "approved" | "rejecting" | "rejected"
  >("pending");

  const handleSelectApp = (app: Application) => {
    setSelectedApp(app);
    setApprovalState("pending");
  };
  const handleApprove = () => {
    if (!selectedApp) return;
    setApprovalState("approving");
    setTimeout(() => {
      setApprovalState("approved");
      setTimeout(() => {
        const rem = applications.filter((a) => a.id !== selectedApp.id);
        setApplications(rem);
        setSelectedApp(rem[0] || null);
        setApprovalState("pending");
      }, 1500);
    }, 2000);
  };
  const handleReject = () => {
    if (!selectedApp) return;
    setApprovalState("rejecting");
    setTimeout(() => {
      setApprovalState("rejected");
      setTimeout(() => {
        const rem = applications.filter((a) => a.id !== selectedApp.id);
        setApplications(rem);
        setSelectedApp(rem[0] || null);
        setApprovalState("pending");
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px]"></div>
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-white">
          Pending Dealer Approvals
        </h1>
        <p className="mt-2 text-md text-gray-500">
          Review AI-verified details and confirm applications.
        </p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* --- COLUMN 1: QUEUE --- */}
        <BentoBox className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-white mb-4">
            Queue ({applications.length})
          </h2>
          <div className="space-y-3 max-h-[80vh] overflow-y-auto">
            {applications.length > 0 ? (
              applications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => handleSelectApp(app)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                    selectedApp?.id === app.id
                      ? "bg-blue-900/50 border-blue-600"
                      : "bg-gray-800/50 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <p className="font-bold text-white">
                    {app.name} - {app.product}
                  </p>
                  <p className="text-sm text-gray-400">{app.id}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                No pending applications.
              </p>
            )}
          </div>
        </BentoBox>

        {/* --- COLUMN 2: DOCUMENTS & REMARKS --- */}
        <div className="lg:col-span-1">
          {selectedApp ? (
            <BentoBox>
              <h2 className="text-2xl font-bold text-white mb-4">
                Documents & Remarks
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Submitted Documents
                  </h3>
                  <div className="space-y-3">
                    {selectedApp.documents.map((doc, i) => (
                      <DocumentCard key={i} document={doc} />
                    ))}
                  </div>
                </div>
                {selectedApp.customerRemarks && (
                  <div className="border-t border-gray-800 pt-4">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Customer Remarks
                    </h3>
                    <blockquote className="border-l-4 border-blue-700 pl-4 py-2 bg-gray-800/50 rounded-r-lg">
                      <p className="text-gray-300 italic text-sm">
                        {selectedApp.customerRemarks}
                      </p>
                    </blockquote>
                  </div>
                )}
              </div>
            </BentoBox>
          ) : (
            <BentoBox className="flex items-center justify-center h-full">
              <p className="text-gray-500">Select an application.</p>
            </BentoBox>
          )}
        </div>

        {/* --- COLUMN 3: DETAILS & TRACKER --- */}
        <div className="lg:col-span-2 space-y-6">
          {selectedApp ? (
            <>
              <BentoBox>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <UserIcon />
                      <h2 className="text-xl font-semibold text-white">
                        Applicant Details
                      </h2>
                    </div>
                    <div className="space-y-4">
                      <DetailItem label="Name" value={selectedApp.name} />
                      <DetailItem
                        label="Location"
                        value={selectedApp.location}
                      />
                      <DetailItem
                        label="Credit History"
                        value={selectedApp.creditHistory}
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      {selectedApp.productIcon}
                      <h2 className="text-xl font-semibold text-white">
                        Loan Details
                      </h2>
                    </div>
                    <div className="space-y-4">
                      <DetailItem label="Product" value={selectedApp.product} />
                      <DetailItem label="Amount" value={selectedApp.amount} />
                    </div>
                  </div>
                </div>
                <div className="mt-6 border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    AI Scoring Summary
                  </h2>
                  <div className="space-y-4 p-4 bg-gray-800/50 rounded-lg">
                    {selectedApp.verificationSteps.map((step) => (
                      <VerificationItem key={step.text} step={step} />
                    ))}
                  </div>
                  <div className="mt-8 border-t border-gray-800 pt-6">
                    {approvalState === "pending" && (
                      <div className="flex justify-end space-x-4">
                        <button
                          onClick={handleReject}
                          className="px-6 py-3 text-sm font-semibold text-red-400 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                          Reject
                        </button>
                        <button
                          onClick={handleApprove}
                          className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)] transform hover:scale-105"
                        >
                          Approve Application
                        </button>
                      </div>
                    )}
                    {approvalState === "approving" && (
                      <div className="text-center">
                        <p className="text-lg text-blue-300">
                          Processing Approval...
                        </p>
                      </div>
                    )}
                    {approvalState === "rejecting" && (
                      <div className="text-center">
                        <p className="text-lg text-red-300">
                          Processing Rejection...
                        </p>
                      </div>
                    )}
                    {approvalState === "approved" && (
                      <div className="text-center flex flex-col items-center">
                        <SuccessAnimationIcon />
                        <h3 className="text-2xl font-bold text-green-400 mt-4">
                          Application Approved!
                        </h3>
                        <p className="mt-2 text-gray-400">
                          {selectedApp.name} has been notified.
                        </p>
                      </div>
                    )}
                    {approvalState === "rejected" && (
                      <div className="text-center flex flex-col items-center">
                        <RejectAnimationIcon />
                        <h3 className="text-2xl font-bold text-red-400 mt-4">
                          Application Rejected
                        </h3>
                        <p className="mt-2 text-gray-400">
                          {selectedApp.name} has been notified.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </BentoBox>
              <ApplicationStatusTracker steps={selectedApp.trackingSteps} />
            </>
          ) : (
            <BentoBox className="flex items-center justify-center h-full">
              <p className="text-gray-500">
                Select an application to view details.
              </p>
            </BentoBox>
          )}
        </div>
      </div>
    </div>
  );
}