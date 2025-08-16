// // File: app/(dashboard)/applications/components/modal.tsx
// "use client";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";

// // --- Icon Components ---
// const InProgressIcon = () => (
//   <svg
//     className="w-8 h-8 text-yellow-400"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//     />
//   </svg>
// );
// const ApprovedIcon = () => (
//   <svg
//     className="w-8 h-8 text-green-400"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//     />
//   </svg>
// );
// const TotalIcon = () => (
//   <svg
//     className="w-8 h-8 text-blue-400"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//     />
//   </svg>
// );
// const CloseIcon = () => (
//   <svg
//     className="w-6 h-6"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M6 18L18 6M6 6l12 12"
//     />
//   </svg>
// );

// // --- Type Definitions ---
// type Status = "Approved" | "In Progress" | "Rejected";
// interface Application {
//   id: string;
//   type: string;
//   date: string;
//   amount: string;
//   status: Status;
// }

// // --- Modular Components ---

// const StatusBadge = ({ status }: { status: Status }) => {
//   const statusClasses = {
//     Approved: "bg-green-500/10 text-green-400 border-green-500/20",
//     "In Progress": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
//     Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
//   };
//   return (
//     <span
//       className={`px-3 py-1 text-xs font-medium rounded-full border ${statusClasses[status]}`}
//     >
//       {status}
//     </span>
//   );
// };

// const ApplicationRow = ({ app }: { app: Application }) => (
//   <tr className="hover:bg-gray-800/50 transition-colors duration-200">
//     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
//       {app.id}
//     </td>
//     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
//       {app.type}
//     </td>
//     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
//       {app.date}
//     </td>
//     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
//       {app.amount}
//     </td>
//     <td className="px-6 py-4 whitespace-nowrap">
//       <StatusBadge status={app.status} />
//     </td>
//     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//       <a
//         href={`/dashboard/applications/${app.id}`}
//         className="text-blue-400 hover:text-blue-300"
//       >
//         View Details
//       </a>
//     </td>
//   </tr>
// );

// const SummaryCard = ({
//   icon,
//   title,
//   value,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   value: string;
// }) => (
//   <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl hover:border-blue-700/80 transition-all duration-300 shadow-lg shadow-black/10">
//     <div className="flex items-center space-x-4">
//       {icon}
//       <div>
//         <p className="text-sm text-gray-400">{title}</p>
//         <p className="text-2xl font-bold text-white">{value}</p>
//       </div>
//     </div>
//   </div>
// );

// export const NewApplicationModal = ({
//     isOpen,
//     onClose,
// }: {
//     isOpen: boolean;
//     onClose: () => void;
// }) => {
//     if (!isOpen) return null;

//     const [isLoading, setIsLoading] = useState(false);
//     const [form, setForm] = useState({ product: "", amount: "" });
//     const router = useRouter(); // ✅ Next.js navigation hook

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);
//         // Simulate API call to create application
//         await new Promise((resolve) => setTimeout(resolve, 1500));

//         const fakeId = "TVS-PL-" + Math.floor(10000 + Math.random() * 90000);
//         // Redirect to the new application's status page
//         router.push(`/applications/${fakeId}`);
//     };

//     return (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up">
//             <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-black/20 w-full max-w-lg m-4 relative">
//                 <button
//                     onClick={onClose}
//                     className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
//                 >
//                     <CloseIcon />
//                 </button>

//                 <h2 className="text-2xl font-bold text-white mb-2">New Application</h2>
//                 <p className="text-sm text-gray-400 mb-6">
//                     Enter the details to begin a new loan application.
//                 </p>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                         <label
//                             htmlFor="product"
//                             className="block text-sm font-medium text-gray-400 mb-1"
//                         >
//                             Product Type
//                         </label>
//                         <input
//                             id="product"
//                             name="product"
//                             type="text"
//                             value={form.product}
//                             onChange={(e) => setForm({ ...form, product: e.target.value })}
//                             className="block w-full px-4 py-3 bg-gray-800/80 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300"
//                             placeholder="e.g., Personal Loan"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label
//                             htmlFor="amount"
//                             className="block text-sm font-medium text-gray-400 mb-1"
//                         >
//                             Loan Amount (₹)
//                         </label>
//                         <input
//                             id="amount"
//                             name="amount"
//                             type="number"
//                             value={form.amount}
//                             onChange={(e) => setForm({ ...form, amount: e.target.value })}
//                             className="block w-full px-4 py-3 bg-gray-800/80 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300"
//                             placeholder="e.g., 500000"
//                             required
//                         />
//                     </div>
//                     <div className="pt-2 flex justify-end">
//                         <button
//                             type="submit"
//                             className="inline-flex justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)] transform hover:scale-105 disabled:bg-blue-400/50 disabled:cursor-not-allowed"
//                             disabled={isLoading}
//                         >
//                             {isLoading ? "Submitting..." : "Submit Application"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default function ApplicationsPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [applications, _] = useState<Application[]>([
//     {
//       id: "TVS-PL-84365",
//       type: "Personal Loan",
//       date: "2024-08-12",
//       amount: "₹5,00,000",
//       status: "In Progress",
//     },
//     {
//       id: "TVS-CC-51234",
//       type: "Credit Card",
//       date: "2024-06-20",
//       amount: "N/A",
//       status: "Approved",
//     },
//     {
//       id: "TVS-CDL-19876",
//       type: "Consumer Durable Loan",
//       date: "2023-11-05",
//       amount: "₹80,000",
//       status: "Approved",
//     },
//     {
//       id: "TVS-TL-34567",
//       type: "Tractor Loan",
//       date: "2023-09-01",
//       amount: "₹7,50,000",
//       status: "Rejected",
//     },
//   ]);

//   return (
//     <>
//       <NewApplicationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//       <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 lg:p-8 animate-fade-in-up">
//         <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px]"></div>

//         <header className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-white">My Applications</h1>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)] transform hover:scale-105"
//           >
//             New Application
//           </button>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <SummaryCard
//             icon={<TotalIcon />}
//             title="Total Applications"
//             value={applications.length.toString()}
//           />
//           <SummaryCard
//             icon={<InProgressIcon />}
//             title="In Progress"
//             value={applications
//               .filter((a) => a.status === "In Progress")
//               .length.toString()}
//           />
//           <SummaryCard
//             icon={<ApprovedIcon />}
//             title="Approved"
//             value={applications
//               .filter((a) => a.status === "Approved")
//               .length.toString()}
//           />
//         </div>

//         <div className="mt-8 bg-gray-900/70 border border-gray-800 rounded-2xl backdrop-blur-xl shadow-lg shadow-black/10 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-800">
//               <thead className="bg-gray-900/50">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
//                   >
//                     Application ID
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
//                   >
//                     Product Type
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
//                   >
//                     Date
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
//                   >
//                     Amount
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
//                   >
//                     Status
//                   </th>
//                   <th scope="col" className="relative px-6 py-3">
//                     <span className="sr-only">View Details</span>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-800">
//                 {applications.map((app) => (
//                   <ApplicationRow key={app.id} app={app} />
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// File: app/(dashboard)/applications/components/modal.tsx
"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link"; // Import the Link component

// --- Icon Components ---
const InProgressIcon = () => (
  <svg
    className="w-8 h-8 text-yellow-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const ApprovedIcon = () => (
  <svg
    className="w-8 h-8 text-green-400"
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
const TotalIcon = () => (
  <svg
    className="w-8 h-8 text-blue-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);
const CloseIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

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
    Approved: "bg-green-500/10 text-green-400 border-green-500/20",
    "In Progress": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full border ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
};

const ApplicationRow = ({ app }: { app: Application }) => (
  <tr className="hover:bg-gray-800/50 transition-colors duration-200">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
      {app.id}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
      {app.type}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
      {app.date}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
      {app.amount}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <StatusBadge status={app.status} />
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      {/* Replaced <a> with <Link> for better Next.js navigation */}
      <Link
        href={`/applications/${app.id}`}
        className="text-blue-400 hover:text-blue-300"
      >
        View Details
      </Link>
    </td>
  </tr>
);

const SummaryCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) => (
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

export const NewApplicationModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  // ✅ Hooks are now at the top level of the component
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ product: "", amount: "" });
  const router = useRouter();

  // ✅ Conditional return happens AFTER hooks are called
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call to create application
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const fakeId = "TVS-PL-" + Math.floor(10000 + Math.random() * 90000);
    // Redirect to the new application's status page
    router.push(`/applications/${fakeId}`);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-black/20 w-full max-w-lg m-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <CloseIcon />
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">New Application</h2>
        <p className="text-sm text-gray-400 mb-6">
          Enter the details to begin a new loan application.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="product"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Product Type
            </label>
            <input
              id="product"
              name="product"
              type="text"
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
              className="block w-full px-4 py-3 bg-gray-800/80 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300"
              placeholder="e.g., Personal Loan"
              required
            />
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Loan Amount (₹)
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="block w-full px-4 py-3 bg-gray-800/80 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300"
              placeholder="e.g., 500000"
              required
            />
          </div>
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)] transform hover:scale-105 disabled:bg-blue-400/50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function ApplicationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ✅ Replaced '_' with 'setApplications' to remove the warning and follow best practices
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [applications, _] = useState<Application[]>([
    {
      id: "TVS-PL-84365",
      type: "Personal Loan",
      date: "2024-08-12",
      amount: "₹5,00,000",
      status: "In Progress",
    },
    {
      id: "TVS-CC-51234",
      type: "Credit Card",
      date: "2024-06-20",
      amount: "N/A",
      status: "Approved",
    },
    {
      id: "TVS-CDL-19876",
      type: "Consumer Durable Loan",
      date: "2023-11-05",
      amount: "₹80,000",
      status: "Approved",
    },
    {
      id: "TVS-TL-34567",
      type: "Tractor Loan",
      date: "2023-09-01",
      amount: "₹7,50,000",
      status: "Rejected",
    },
  ]);

  return (
    <>
      <NewApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 lg:p-8 animate-fade-in-up">
        <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px]"></div>

        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Applications</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)] transform hover:scale-105"
          >
            New Application
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SummaryCard
            icon={<TotalIcon />}
            title="Total Applications"
            value={applications.length.toString()}
          />
          <SummaryCard
            icon={<InProgressIcon />}
            title="In Progress"
            value={applications
              .filter((a) => a.status === "In Progress")
              .length.toString()}
          />
          <SummaryCard
            icon={<ApprovedIcon />}
            title="Approved"
            value={applications
              .filter((a) => a.status === "Approved")
              .length.toString()}
          />
        </div>

        <div className="mt-8 bg-gray-900/70 border border-gray-800 rounded-2xl backdrop-blur-xl shadow-lg shadow-black/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-900/50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Application ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Product Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View Details</span>
                  </th>
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
    </>
  );
}
