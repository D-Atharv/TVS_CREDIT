// File: app/(dashboard)/profile/page.tsx
"use client";
import React from "react";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";

// --- Icon Components ---
const UserCircleIcon = () => (
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
      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const DocumentIcon = () => (
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
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  </svg>
);
const SettingsIcon = () => (
  <svg
    className="w-8 h-8 text-violet-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.447.368.592.984.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.333.183-.582.495-.645.87l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.87l.214-1.281z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const ShieldCheckIcon = () => (
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
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.6-3.75M12 15V2.25"
    />
  </svg>
);
const BellIcon = () => (
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
      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.31 5.632l-1.405 1.405h12.091zM13 14.25A3 3 0 0110 11.25V7.5a3 3 0 016 0v3.75a3 3 0 01-3 3z"
    />
  </svg>
);
const ChevronRightIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

// --- Modular Bento Box Components ---
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
    className={`relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-2xl p-6 backdrop-blur-xl hover:border-blue-600/60 transition-all duration-300 shadow-lg shadow-black/30 ${className}`}
  >
    {glow && (
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>
    )}
    <div className="relative z-10">{children}</div>
  </div>
);

const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <div className="py-3 grid grid-cols-3 gap-4">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="text-sm text-gray-300 col-span-2">{value}</dd>
  </div>
);

const ProfileCard = ({ user }: { user: any }) => (
  <BentoBox className="lg:col-span-2">
    <div className="flex items-center space-x-4 mb-6">
      <div className="relative">
        <img
          className="w-16 h-16 rounded-full border-2 border-blue-500/50 p-1"
          src={`https://i.pravatar.cc/150`}
          alt={user.fullName}
        />
        <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-green-400 ring-2 ring-gray-900"></span>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>
    </div>
    <dl className="divide-y divide-gray-800">
      <ProfileField label="Phone Number" value={user.phone} />
      <ProfileField label="Registered Address" value={user.address} />
      <ProfileField label="PAN Number" value={user.pan} />
      <ProfileField label="Customer Since" value={user.customerSince} />
    </dl>
  </BentoBox>
);

const ActionsCard = () => (
  <BentoBox>
    <div className="flex items-center space-x-4 mb-4">
      <SettingsIcon />
      <h2 className="text-xl font-semibold text-white">Account Actions</h2>
    </div>
    <div className="space-y-3">
      <button className="w-full flex justify-between items-center p-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors">
        <span>Update Contact Details</span>
        <ChevronRightIcon />
      </button>
      <button className="w-full flex justify-between items-center p-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors">
        <span>Change Password</span>
        <ChevronRightIcon />
      </button>
      <button className="w-full flex justify-between items-center p-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
        <span>Close Account</span>
        <ChevronRightIcon />
      </button>
    </div>
  </BentoBox>
);

const DocumentsCard = () => {
  // Example: required docs with status (true = uploaded, false = missing)
  const requiredDocs = [
    { name: "Aadhaar Card", uploaded: true },
    { name: "PAN Card", uploaded: true },
    { name: "Salary Slip (Last 3 months)", uploaded: false },
    { name: "Bank Statement", uploaded: true },
    { name: "Address Proof", uploaded: false },
  ];

  return (
    <BentoBox className="lg:col-span-2">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        <DocumentIcon />
        <h2 className="text-xl font-semibold text-white">My Documents</h2>
      </div>

      {/* Document checklist */}
      <div className="space-y-3">
        {requiredDocs.map((doc, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50 text-gray-300 text-sm"
          >
            <span>{doc.name}</span>
            {doc.uploaded ? (
              <CheckCircleIcon className="w-5 h-5 text-green-400" />
            ) : (
              <XCircleIcon className="w-5 h-5 text-red-400" />
            )}
          </div>
        ))}
      </div>

      {/* Upload button */}
      <button className="w-full mt-4 py-2 px-4 bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 rounded-lg border border-blue-800 transition-colors duration-200 text-sm">
        Upload Missing Documents
      </button>
    </BentoBox>
  );
};

const SecurityCard = () => (
  <BentoBox>
    <div className="flex items-center space-x-4 mb-4">
      <ShieldCheckIcon />
      <h2 className="text-xl font-semibold text-white">Security Settings</h2>
    </div>
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-300">Two-Factor Authentication</span>
        <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
          Enabled
        </span>
      </div>
      <div className="text-sm">
        <p className="text-gray-400">Last Login:</p>
        <p className="text-white">16 Aug 2025, 08:30 AM from Bengaluru, IN</p>
      </div>
    </div>
  </BentoBox>
);

const CommunicationCard = () => (
  <BentoBox>
    <div className="flex items-center space-x-4 mb-4">
      <BellIcon />
      <h2 className="text-xl font-semibold text-white">Notifications</h2>
    </div>
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-300">SMS Updates</span>
        <span className="text-green-400 font-medium">Active</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-300">WhatsApp Alerts</span>
        <span className="text-green-400 font-medium">Active</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-300">Email Statements</span>
        <span className="text-green-400 font-medium">Active</span>
      </div>
    </div>
  </BentoBox>
);

export default function ProfilePage() {
  const userProfile = {
    fullName: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    address: "123, MG Road, Koramangala, Bengaluru, Karnataka - 560034",
    pan: "ABCDE****F",
    customerSince: "15 Aug 2022",
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">My Profile</h1>
        <p className="mt-2 text-md text-gray-500">
          View and manage your personal information and documents.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <ProfileCard user={userProfile} />
        </div>
        <div className="lg:col-span-2">
          <ActionsCard />
        </div>
        <div className="lg:col-span-2">
          <DocumentsCard />
        </div>
        <SecurityCard />
        <CommunicationCard />
      </div>
    </div>
  );
}
