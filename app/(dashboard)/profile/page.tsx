// File: app/(dashboard)/profile/page.tsx
"use client";
import React from "react";

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

// --- Modular Bento Box Components ---
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

const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <div className="py-3 grid grid-cols-3 gap-4">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="text-sm text-gray-300 col-span-2">{value}</dd>
  </div>
);

const ProfileCard = ({ user }: { user: any }) => (
  <BentoBox className="lg:col-span-2">
    <div className="flex items-center space-x-4 mb-6">
      <UserCircleIcon />
      <div>
        <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>
    </div>
    <dl className="divide-y divide-gray-800">
      <ProfileField label="Phone Number" value={user.phone} />
      <ProfileField label="Registered Address" value={user.address} />
      <ProfileField label="PAN Number" value={user.pan} />
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
      <button className="w-full text-left p-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors">
        Update Contact Details
      </button>
      <button className="w-full text-left p-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors">
        Change Password
      </button>
      <button className="w-full text-left p-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
        Close Account
      </button>
    </div>
  </BentoBox>
);

const DocumentsCard = () => (
  <BentoBox>
    <div className="flex items-center space-x-4 mb-4">
      <DocumentIcon />
      <h2 className="text-xl font-semibold text-white">My Documents</h2>
    </div>
    <div className="space-y-3">
      <a
        href="#"
        className="flex justify-between items-center p-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
      >
        <span>Loan_Agreement_PL84365.pdf</span>
        <span className="text-blue-400">Download</span>
      </a>
      <a
        href="#"
        className="flex justify-between items-center p-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
      >
        <span>KYC_Documents.zip</span>
        <span className="text-blue-400">Download</span>
      </a>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfileCard user={userProfile} />
        <ActionsCard />
        <DocumentsCard />
      </div>
    </div>
  );
}
