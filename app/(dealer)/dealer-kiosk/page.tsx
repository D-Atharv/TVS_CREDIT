
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Upload,
  CreditCard,
  Gift,
  AlertCircle,
  Loader2,
  User,
  ChevronRight,
  FileText,
  MessageSquare,
  Shield,
} from "lucide-react";

// --- TYPE DEFINITIONS ---
type DocStatus =
  | "Verified"
  | "Uploaded, Pending Review"
  | "Rejected"
  | "Missing"
  | "Link Sent, Awaiting Upload"; // <-- New status added
type PaymentStatus = "Paid" | "Due" | "Overdue";
type OfferType = "Loan" | "Insurance" | "Card";

interface Document {
  name: string;
  status: DocStatus;
}

interface Payment {
  date: string;
  amount: number;
  status: PaymentStatus;
}

interface Offer {
  title: string;
  description: string;
  type: OfferType;
}

interface CustomerProfile {
  name: string;
  applicationId: string;
  phone: string;
  product: string;
  loanAmount: number;
  status: string;
  documents: Document[];
  paymentHistory: Payment[];
  eligibleOffers: Offer[];
}

// --- MOCK DATABASE ---
const customerDatabase: { [key: string]: CustomerProfile } = {
  "TVS-TL-34568": {
    name: "Ramesh Kumar",
    applicationId: "TVS-TL-34568",
    phone: "9876543210",
    product: "Tractor Loan",
    loanAmount: 750000,
    status: "Awaiting Documents",
    documents: [
      { name: "Aadhaar Card", status: "Verified" },
      { name: "PAN Card", status: "Uploaded, Pending Review" },
      { name: "Bank Statement", status: "Rejected" },
      { name: "Land Ownership Proof", status: "Missing" },
    ],
    paymentHistory: [],
    eligibleOffers: [
      {
        title: "Crop Insurance",
        description:
          "Protect your harvest with our comprehensive crop insurance.",
        type: "Insurance",
      },
    ],
  },
  "TVS-PL-84365": {
    name: "Priya Sharma",
    applicationId: "TVS-PL-84365",
    phone: "9876543211",
    product: "Personal Loan",
    loanAmount: 500000,
    status: "Loan Approved",
    documents: [
      { name: "Aadhaar Card", status: "Verified" },
      { name: "PAN Card", status: "Verified" },
      { name: "Salary Slips", status: "Verified" },
      { name: "Bank Statement", status: "Verified" },
    ],
    paymentHistory: [
      { date: "15 Aug 2025", amount: 16250, status: "Paid" },
      { date: "15 Jul 2025", amount: 16250, status: "Paid" },
      { date: "15 Sep 2025", amount: 16250, status: "Due" },
    ],
    eligibleOffers: [
      {
        title: "Pre-approved Credit Card",
        description: "Get a credit card with a ₹1,00,000 limit instantly.",
        type: "Card",
      },
      {
        title: "Top-up Loan of ₹50,000",
        description:
          "Need more funds? Get an instant top-up on your existing loan.",
        type: "Loan",
      },
    ],
  },
};

export default function DealerKiosk() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customerProfile, setCustomerProfile] =
    useState<CustomerProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("documents");

  const handleSearch = () => {
    setIsLoading(true);
    setError(null);
    setCustomerProfile(null);
    setTimeout(() => {
      const result = Object.values(customerDatabase).find(
        (customer) =>
          customer.applicationId.toUpperCase() === searchQuery.toUpperCase() ||
          customer.phone === searchQuery
      );
      if (result) {
        setCustomerProfile(result);
      } else {
        setError(
          "No customer found with the provided Application ID or Phone Number."
        );
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleDocumentUpload = (docName: string) => {
    if (!customerProfile) return;
    alert(`Initiating direct upload for "${docName}"...`);
    setTimeout(() => {
      const updatedDocs = customerProfile.documents.map((doc) =>
        doc.name === docName
          ? { ...doc, status: "Uploaded, Pending Review" as DocStatus }
          : doc
      );
      setCustomerProfile({ ...customerProfile, documents: updatedDocs });
      alert(
        `✅ "${docName}" has been successfully uploaded and is now pending review.`
      );
    }, 1000);
  };

  const handleSendUploadLink = (docName: string) => {
    if (!customerProfile) return;

    alert(
      `✅ A secure document upload link for "${docName}" has been sent to ${customerProfile.name}'s WhatsApp at ${customerProfile.phone}.`
    );

    const updatedDocs = customerProfile.documents.map((doc) =>
      doc.name === docName
        ? { ...doc, status: "Link Sent, Awaiting Upload" as DocStatus }
        : doc
    );
    setCustomerProfile({ ...customerProfile, documents: updatedDocs });
  };

  const resetSearch = () => {
    setCustomerProfile(null);
    setSearchQuery("");
    setError(null);
  };

  const StatusBadge = ({ status }: { status: DocStatus | PaymentStatus }) => {
    const styles: { [key: string]: string } = {
      Verified: "bg-green-500/10 text-green-400 border-green-500/30",
      "Uploaded, Pending Review":
        "bg-blue-500/10 text-blue-400 border-blue-500/30",
      Rejected: "bg-red-500/10 text-red-400 border-red-500/30",
      Missing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      "Link Sent, Awaiting Upload":
        "bg-purple-500/10 text-purple-400 border-purple-500/30", // <-- Style for new status
      Paid: "bg-green-500/10 text-green-400 border-green-500/30",
      Due: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      Overdue: "bg-red-500/10 text-red-400 border-red-500/30",
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  const OfferCard = ({ offer }: { offer: Offer }) => {
    const icons: { [key: string]: React.ReactNode } = {
      Loan: <CreditCard className="w-6 h-6 text-blue-400" />,
      Insurance: <Shield className="w-6 h-6 text-green-400" />,
      Card: <Gift className="w-6 h-6 text-purple-400" />,
    };
    return (
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 flex flex-col">
        <div className="flex items-start">
          {icons[offer.type]}
          <div className="ml-4 flex-1">
            <h4 className="font-semibold text-white">{offer.title}</h4>
            <p className="text-sm text-gray-400 mt-1">{offer.description}</p>
          </div>
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Initiate Application
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center">
            TVS Credit <span className="text-blue-400 ml-2">OneView Kiosk</span>
          </h1>
          {customerProfile && (
            <button
              onClick={resetSearch}
              className="text-sm text-blue-400 hover:underline"
            >
              New Search
            </button>
          )}
        </div>

        {!customerProfile ? (
          <div className="max-w-2xl mx-auto mt-20 animate-fade-in-up">
            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl shadow-black/20">
              <h2 className="text-xl font-semibold text-white mb-2">
                Customer Lookup
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Enter Application ID or Phone Number to view customer details.
              </p>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g., TVS-TL-34568 or 9876543210"
                  className="flex-1 p-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-gray-500"
                />
                <button
                  onClick={handleSearch}
                  disabled={!searchQuery || isLoading}
                  className="bg-blue-600 text-white px-5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 w-32"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Search"
                  )}
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-sm mt-4 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-6">
                <div className="text-center">
                  <User className="w-16 h-16 mx-auto bg-blue-900/30 text-blue-400 p-3 rounded-full border border-blue-800/50" />
                  <h2 className="text-2xl font-bold text-white mt-4">
                    {customerProfile.name}
                  </h2>
                  <p className="text-sm text-gray-400 font-mono">
                    {customerProfile.applicationId}
                  </p>
                </div>
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Product:</span>
                    <span className="font-medium text-white">
                      {customerProfile.product}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Loan Amount:</span>
                    <span className="font-medium text-white">
                      ₹{customerProfile.loanAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Status:</span>
                    <span className="font-medium text-blue-400">
                      {customerProfile.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 space-y-8 ">
                <Link
                  href={`/payment/stripe?applicationId=${
                    customerProfile.applicationId
                  }&name=${encodeURIComponent(
                    customerProfile.name
                  )}&product=${encodeURIComponent(customerProfile.product)}`}
                >
                  <div className="w-full mb-4 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center transition-colors cursor-pointer">
                    <CreditCard className="w-5 h-5 mr-2" /> Collect EMI Payment
                  </div>
                </Link>
                <button
                  onClick={() => setActiveTab("offers")}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 flex items-center justify-center transition-colors"
                >
                  <Gift className="w-5 h-5 mr-2" /> View Eligible Offers
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 bg-gray-900/70 border border-gray-800 rounded-xl">
              <div className="border-b border-gray-800 flex">
                <button
                  onClick={() => setActiveTab("documents")}
                  className={`px-5 py-3 text-sm font-medium ${
                    activeTab === "documents"
                      ? "text-blue-400 border-b-2 border-blue-500"
                      : "text-gray-400 hover:bg-gray-800/50"
                  }`}
                >
                  Documents
                </button>
                <button
                  onClick={() => setActiveTab("payments")}
                  className={`px-5 py-3 text-sm font-medium ${
                    activeTab === "payments"
                      ? "text-blue-400 border-b-2 border-blue-500"
                      : "text-gray-400 hover:bg-gray-800/50"
                  }`}
                >
                  Payment History
                </button>
                <button
                  onClick={() => setActiveTab("offers")}
                  className={`px-5 py-3 text-sm font-medium ${
                    activeTab === "offers"
                      ? "text-blue-400 border-b-2 border-blue-500"
                      : "text-gray-400 hover:bg-gray-800/50"
                  }`}
                >
                  Eligible Offers
                </button>
              </div>

              <div className="p-6">
                {activeTab === "documents" && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Document Checklist
                    </h3>
                    <div className="space-y-3 mb-6">
                      {customerProfile.documents.map((doc) => (
                        <div
                          key={doc.name}
                          className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 text-gray-400 mr-3" />
                            <p className="text-white text-sm">{doc.name}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <StatusBadge status={doc.status} />
                            {doc.status === "Missing" && (
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleSendUploadLink(doc.name)}
                                  title="Send Upload Link to Customer"
                                  className="bg-green-600/20 text-green-400 p-1.5 rounded-md hover:bg-green-600/30"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDocumentUpload(doc.name)}
                                  title="Upload Document Directly"
                                  className="bg-blue-600/20 text-blue-400 p-1.5 rounded-md hover:bg-blue-600/30"
                                >
                                  <Upload className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Dealer Remarks
                    </h3>
                    <textarea
                      placeholder="Add remarks for the credit team (e.g., 'Customer will submit land papers by tomorrow EOD')..."
                      className="w-full p-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-sm"
                      rows={3}
                    ></textarea>
                    <button className="mt-2 bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 px-4 rounded-lg">
                      Save Remark
                    </button>
                  </div>
                )}

                {activeTab === "payments" && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Payment History
                    </h3>
                    <div className="space-y-3">
                      {customerProfile.paymentHistory.map((p, i) => (
                        <div
                          key={i}
                          className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <ChevronRight className="w-4 h-4 text-gray-500 mr-2" />
                            <div>
                              <p className="text-white font-mono text-sm">
                                ₹{p.amount.toLocaleString("en-IN")}
                              </p>
                              <p className="text-xs text-gray-400">{p.date}</p>
                            </div>
                          </div>
                          <StatusBadge status={p.status} />
                        </div>
                      ))}
                      {customerProfile.paymentHistory.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">
                          No payment history found.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "offers" && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Eligible Offers
                    </h3>
                    <div className="space-y-4">
                      {customerProfile.eligibleOffers.map((offer, i) => (
                        <OfferCard key={i} offer={offer} />
                      ))}
                      {customerProfile.eligibleOffers.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">
                          No special offers available at this time.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
