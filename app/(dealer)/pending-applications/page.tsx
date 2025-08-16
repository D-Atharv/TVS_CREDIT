// File: app/(dealer)/pending-applications/page.tsx
"use client";
import React, { useState } from "react";

// --- Icon Components ---
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
    <style>{`
            .bg-reject { animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards; stroke-dasharray: 406; stroke-dashoffset: 406; }
            .cross1 { transform-origin: 50% 50%; stroke-dasharray: 61; stroke-dashoffset: 61; animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards; }
            .cross2 { transform-origin: 50% 50%; stroke-dasharray: 61; stroke-dashoffset: 61; animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 1.1s forwards; }
            @keyframes stroke { 100% { stroke-dashoffset: 0; } }
        `}</style>
  </svg>
);

// --- Type Definitions ---
interface VerificationStep {
  text: string;
  status: "pass" | "fail" | "pending" | "skipped";
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
    className={`bg-gray-900/70 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 shadow-lg shadow-black/10 ${className}`}
  >
    {children}
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
    {step.status === "pass" && <CheckCircleIcon />}
    {step.status === "fail" && <CrossCircleIcon />}
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
        const remainingApps = applications.filter(
          (a) => a.id !== selectedApp.id
        );
        setApplications(remainingApps);
        setSelectedApp(remainingApps[0] || null);
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
        const remainingApps = applications.filter(
          (a) => a.id !== selectedApp.id
        );
        setApplications(remainingApps);
        setSelectedApp(remainingApps[0] || null);
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

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BentoBox className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-white mb-4">
            Application Queue ({applications.length})
          </h2>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
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

        <div className="lg:col-span-2">
          {selectedApp ? (
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
                    <DetailItem label="Location" value={selectedApp.location} />
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
                  AI Scoring Results
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
