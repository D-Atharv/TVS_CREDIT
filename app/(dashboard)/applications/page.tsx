// // File: app/(dashboard)/applications/page.tsx
"use client";
import Link from 'next/link';
import React from 'react';

// --- Icon Components for Summary Cards ---
const InProgressIcon = () => <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ApprovedIcon = () => <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const TotalIcon = () => <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;

// --- Type Definitions ---
type Status = "Approved" | "In Progress" | "Rejected";
interface Application {
  id: string;
  type: string;
  date: string;
  amount: string;
  status: Status;
}

// --- Modular Components ---

const StatusBadge = ({ status }: { status: Status }) => {
  const statusClasses = {
    'Approved': 'bg-green-500/10 text-green-400 border-green-500/20',
    'In Progress': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    'Rejected': 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

const ApplicationRow = ({ app }: { app: Application }) => (
  <tr className="hover:bg-gray-800/50 transition-colors duration-200">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{app.id}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{app.type}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{app.date}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{app.amount}</td>
    <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={app.status} /></td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <Link href={`/applications/${app.id}`} className="text-blue-400 hover:text-blue-300">
        View Details
      </Link>
    </td>
  </tr>
);

const SummaryCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => (
    <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl hover:border-blue-700/80 transition-all duration-300 shadow-lg shadow-black/10">
        <div className="flex items-center space-x-4">
            {icon}
            <div>
                <p className="text-sm text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
    </div>
);


export default function ApplicationsPage() {
  const applications: Application[] = [
    { id: "TVS-PL-84365", type: "Personal Loan", date: "2024-08-12", amount: "₹5,00,000", status: "In Progress" },
    { id: "TVS-CC-51234", type: "Credit Card", date: "2024-06-20", amount: "N/A", status: "Approved" },
    { id: "TVS-CDL-19876", type: "Consumer Durable Loan", date: "2023-11-05", amount: "₹80,000", status: "Approved" },
    { id: "TVS-TL-34567", type: "Tractor Loan", date: "2023-09-01", amount: "₹7,50,000", status: "Rejected" },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 lg:p-8 animate-fade-in-up">
        <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">My Applications</h1>
            <Link href="/applications/new" className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)] transform hover:scale-105">
                New Application
            </Link>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SummaryCard icon={<TotalIcon />} title="Total Applications" value={applications.length.toString()} />
            <SummaryCard icon={<InProgressIcon />} title="In Progress" value={applications.filter(a => a.status === 'In Progress').length.toString()} />
            <SummaryCard icon={<ApprovedIcon />} title="Approved" value={applications.filter(a => a.status === 'Approved').length.toString()} />
        </div>

        {/* Applications Table */}
        <div className="mt-8 bg-gray-900/70 border border-gray-800 rounded-2xl backdrop-blur-xl shadow-lg shadow-black/10 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-gray-900/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Application ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">View Details</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {applications.map((app) => (
                            <ApplicationRow key={app.id} app={app} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}
