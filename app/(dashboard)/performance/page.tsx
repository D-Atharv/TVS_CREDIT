// File: app/(dashboard)/performance/page.tsx
"use client";
import React from "react";

// --- Icon Components ---
const TrendingUpIcon = () => (
  <svg
    className="w-8 h-8 text-green-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
    />
  </svg>
);
const CalendarDaysIcon = () => (
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
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18"
    />
  </svg>
);
const LightBulbIcon = () => (
  <svg
    className="w-8 h-8 text-yellow-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 18v-5.25m0 5.25a7.5 7.5 0 007.5-7.5h-15a7.5 7.5 0 007.5 7.5zM12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 6a.75.75 0 00-.75.75v1.5a.75.75 0 001.5 0v-1.5A.75.75 0 007.5 6zm10.5 0a.75.75 0 00-.75.75v1.5a.75.75 0 001.5 0v-1.5a.75.75 0 00-.75-.75z"
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
    className={`bg-gray-900/70 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 shadow-lg shadow-black/10 ${className}`}
  >
    {children}
  </div>
);

const CreditScoreGauge = ({ score }: { score: number }) => {
  const percentage = (score - 300) / 600; // CIBIL score range 300-900
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - percentage * circumference;

  let scoreColor = "text-red-400";
  if (score > 750) scoreColor = "text-green-400";
  else if (score > 650) scoreColor = "text-yellow-400";

  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="52"
          stroke="currentColor"
          strokeWidth="8"
          className="text-gray-700"
          fill="transparent"
        />
        <circle
          cx="60"
          cy="60"
          r="52"
          stroke="currentColor"
          strokeWidth="8"
          className={`transition-all duration-1000 ease-out ${scoreColor.replace(
            "text-",
            "stroke-"
          )}`}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-5xl font-bold ${scoreColor}`}>{score}</span>
        <span className="text-sm text-gray-400">CIBIL Score</span>
      </div>
    </div>
  );
};

const PaymentHistoryItem = ({
  month,
  status,
}: {
  month: string;
  status: "paid" | "late" | "due";
}) => {
  const statusStyles = {
    paid: { bg: "bg-green-500/20", text: "text-green-400" },
    late: { bg: "bg-red-500/20", text: "text-red-400" },
    due: { bg: "bg-yellow-500/20", text: "text-yellow-400" },
  };
  return (
    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-800/70 transition-colors">
      <p className="text-sm font-medium text-white">{month} EMI</p>
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[status].bg} ${statusStyles[status].text}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
};

// --- Main Page Component ---
export default function PerformancePage() {
  const userPerformance = {
    creditScore: 780,
    onTimePaymentRate: "98%",
    activeLoans: 2,
    paymentHistory: [
      { month: "August 2024", status: "due" as const },
      { month: "July 2024", status: "paid" as const },
      { month: "June 2024", status: "paid" as const },
      { month: "May 2024", status: "late" as const },
    ],
    aiTips: [
      "Your on-time payment rate is excellent! Keep it up to maintain a high score.",
      "Consider setting up auto-debit for your upcoming EMI to never miss a due date.",
      "Based on your performance, you are pre-qualified for a credit limit increase.",
    ],
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-white">Credit & Performance</h1>
        <p className="mt-2 text-md text-gray-500">
          An overview of your financial health and history with us.
        </p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credit Score Gauge */}
        <BentoBox className="lg:col-span-1 flex flex-col items-center justify-center">
          <CreditScoreGauge score={userPerformance.creditScore} />
          <p className="mt-4 text-center text-sm text-gray-400">
            Updated as of {new Date().toLocaleDateString()}
          </p>
        </BentoBox>

        {/* Performance Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <BentoBox>
            <div className="flex items-center space-x-4 mb-4">
              <TrendingUpIcon />
              <h2 className="text-xl font-semibold text-white">Performance</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">On-Time Payment Rate:</span>
                <span className="font-bold text-white">
                  {userPerformance.onTimePaymentRate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Active Loans:</span>
                <span className="font-bold text-white">
                  {userPerformance.activeLoans}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Credit Utilization:</span>
                <span className="font-bold text-green-400">Low</span>
              </div>
            </div>
          </BentoBox>
          <BentoBox>
            <div className="flex items-center space-x-4 mb-4">
              <CalendarDaysIcon />
              <h2 className="text-xl font-semibold text-white">
                Payment History
              </h2>
            </div>
            <div className="space-y-2">
              {userPerformance.paymentHistory.map((payment) => (
                <PaymentHistoryItem
                  key={payment.month}
                  month={payment.month}
                  status={payment.status}
                />
              ))}
            </div>
          </BentoBox>
        </div>

        {/* AI Tips */}
        <BentoBox className="lg:col-span-3">
          <div className="flex items-center space-x-4 mb-4">
            <LightBulbIcon />
            <h2 className="text-xl font-semibold text-white">
              AI-Powered Tips
            </h2>
          </div>
          <ul className="space-y-3 list-disc list-inside text-gray-400">
            {userPerformance.aiTips.map((tip, index) => (
              <li key={index}>
                <span className="text-gray-300">{tip}</span>
              </li>
            ))}
          </ul>
        </BentoBox>
      </div>
    </div>
  );
}
