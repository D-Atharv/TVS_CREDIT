"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Upload,
  CreditCard,
  Gift,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  Smartphone,
  MessageSquare,
  Phone,
  FileText,
  User,
  ChevronRight,
} from "lucide-react";

export default function DealerKiosk() {
  const [applicationId, setApplicationId] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [statusDetails, setStatusDetails] = useState<string[]>([]);
  const [docs, setDocs] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [availableChannels, setAvailableChannels] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("status");

  const fetchStatus = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Fake demo data
      const demoData = [
        {
          name: "Ramesh Kumar",
          status: "Application Received",
          details: [
            "Application submitted via dealer",
            "Basic verification pending",
            "Alternate data verification required",
          ],
          channels: ["SMS", "WhatsApp", "IVR"],
          updated: "Just now",
          loanAmount: "₹2,50,000",
          product: "Tractor Loan",
          documents: ["Aadhaar Card", "Land Papers"],
        },
        {
          name: "Priya Sharma",
          status: "Documents Verified",
          details: [
            "Aadhaar verified",
            "PAN verified",
            "Income proof uploaded",
            "CIBIL score: 742",
          ],
          channels: ["App", "WhatsApp", "Email"],
          updated: "5 minutes ago",
          loanAmount: "₹5,00,000",
          product: "Personal Loan",
          documents: ["Aadhaar", "PAN", "Bank Statement"],
        },
        {
          name: "Arjun Patel",
          status: "Approval in Progress",
          details: [
            "Credit bureau check complete",
            "Alternate data verification in progress",
            "Telco data verified",
            "Mandi payment records found",
          ],
          channels: ["SMS", "IVR"],
          updated: "15 minutes ago",
          loanAmount: "₹1,75,000",
          product: "Two-Wheeler Loan",
          documents: ["Aadhaar", "Driving License"],
        },
        {
          name: "Sunita Devi",
          status: "Loan Approved",
          details: [
            "All checks completed",
            "Disbursal scheduled for tomorrow",
            "EMI: ₹8,450/month",
            "Tenure: 36 months",
          ],
          channels: ["WhatsApp", "IVR"],
          updated: "1 hour ago",
          loanAmount: "₹3,00,000",
          product: "Consumer Durable Loan",
          documents: ["Aadhaar", "Salary Slips"],
        },
      ];

      const randomData = demoData[Math.floor(Math.random() * demoData.length)];
      setCustomerName(randomData.name);
      setStatus(randomData.status);
      setStatusDetails(randomData.details);
      setAvailableChannels(randomData.channels);
      setLastUpdated(randomData.updated);
      setIsLoading(false);
    }, 1500);
  };

  const handleDocUpload = () => {
    if (docs) {
      setIsLoading(true);
      setTimeout(() => {
        alert(
          `✅ Document "${docs.name}" uploaded successfully for ${
            customerName || "customer"
          }!`
        );
        setDocs(null);
        setIsLoading(false);
        // Refresh status after upload
        fetchStatus();
      }, 1000);
    }
  };

  const handlePayment = () => {
    alert(
      `💳 EMI payment collected for ${
        customerName || "customer"
      } (mock transaction)!`
    );
  };

  const handleOffer = () => {
    alert(`🎉 New product offer shared with ${customerName || "customer"}!`);
  };

  const getStatusColor = () => {
    if (!status) return "bg-gray-900/50";
    if (status.includes("Approved"))
      return "bg-green-900/30 border-green-800/50";
    if (status.includes("Progress")) return "bg-blue-900/30 border-blue-800/50";
    if (status.includes("Received"))
      return "bg-yellow-900/30 border-yellow-800/50";
    return "bg-gray-900/50 border-gray-800/50";
  };

  const getStatusIcon = () => {
    if (!status) return <AlertCircle className="w-5 h-5 text-gray-400" />;
    if (status.includes("Approved"))
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (status.includes("Progress"))
      return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />;
    if (status.includes("Received"))
      return <Clock className="w-5 h-5 text-yellow-400" />;
    return <AlertCircle className="w-5 h-5 text-gray-400" />;
  };

  const getStatusTextColor = () => {
    if (!status) return "text-gray-400";
    if (status.includes("Approved")) return "text-green-400";
    if (status.includes("Progress")) return "text-blue-400";
    if (status.includes("Received")) return "text-yellow-400";
    return "text-gray-400";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px] p-4 md:p-8">
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden w-full max-w-4xl backdrop-blur-xl shadow-2xl shadow-black/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 p-6 text-white border-b border-blue-800/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <span className="bg-blue-600/30 p-2 rounded-lg mr-3 border border-blue-500/30">
                  <Phone className="w-5 h-5" />
                </span>
                TVS Credit <span className="text-blue-400 ml-1">OneView</span>
              </h1>
              <p className="text-blue-300/80 text-sm mt-1">
                Dealer Kiosk Dashboard
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-white/10 p-2 rounded-lg border border-gray-700/50">
                <User className="w-5 h-5 text-gray-300" />
              </div>
              <span className="text-sm font-medium">Dealer ID: TVS54321</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Search Section */}
          <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-5 backdrop-blur-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Search Customer Application
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    placeholder="Enter Application ID or Phone Number"
                    className="flex-1 p-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-gray-500"
                  />
                  <button
                    onClick={fetchStatus}
                    disabled={!applicationId || isLoading}
                    className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-800/50">
            <button
              onClick={() => setActiveTab("status")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "status"
                  ? "text-blue-400 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Application Status
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "documents"
                  ? "text-blue-400 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "history"
                  ? "text-blue-400 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Payment History
            </button>
          </div>

          {/* Status Display */}
          {status && activeTab === "status" && (
            <div
              className={`p-5 rounded-xl border ${getStatusColor()} transition-all duration-300`}
            >
              <div className="flex items-start">
                <div className="mr-4 mt-0.5">{getStatusIcon()}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold text-lg ${getStatusTextColor()}`}>
                      {status}
                    </h3>
                    <span className="text-xs text-gray-400">{lastUpdated}</span>
                  </div>

                  {customerName && (
                    <div className="mt-2 bg-gray-800/30 p-3 rounded-lg border border-gray-700/50">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-400">Customer Name</p>
                          <p className="font-medium text-white">
                            {customerName}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Loan Amount</p>
                          <p className="font-medium text-white">₹2,50,000</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Product</p>
                          <p className="font-medium text-white">Tractor Loan</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 space-y-3">
                    {statusDetails.map((detail, i) => (
                      <div key={i} className="flex items-start">
                        <div className="bg-gray-800/50 p-1 rounded-full mr-3 mt-0.5">
                          <ChevronRight className="w-3 h-3 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-300">{detail}</p>
                      </div>
                    ))}
                  </div>

                  {availableChannels.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-800/50">
                      <p className="text-xs font-medium text-gray-400 mb-2">
                        CUSTOMER NOTIFICATION CHANNELS
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {availableChannels.map((channel) => (
                          <span
                            key={channel}
                            className="text-xs px-3 py-1 bg-gray-800/50 rounded-full flex items-center border border-gray-700/50"
                          >
                            {channel === "WhatsApp" && (
                              <MessageSquare className="w-3 h-3 mr-1.5 text-green-400" />
                            )}
                            {channel === "SMS" && (
                              <Smartphone className="w-3 h-3 mr-1.5 text-blue-400" />
                            )}
                            {channel === "IVR" && (
                              <Phone className="w-3 h-3 mr-1.5 text-purple-400" />
                            )}
                            {channel === "App" && (
                              <Smartphone className="w-3 h-3 mr-1.5 text-cyan-400" />
                            )}
                            {channel === "Email" && (
                              <MessageSquare className="w-3 h-3 mr-1.5 text-yellow-400" />
                            )}
                            {channel}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Upload Docs */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 hover:border-blue-500/50 transition-colors group">
              <div className="flex items-center mb-3">
                <div className="bg-blue-900/30 p-2 rounded-lg mr-3 border border-blue-800/50 group-hover:bg-blue-900/50 transition-colors">
                  <Upload className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-medium text-white">Upload Documents</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Submit pending documents for verification
              </p>
              <input
                type="file"
                onChange={(e) => setDocs(e.target.files?.[0] || null)}
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-800 file:text-blue-400 hover:file:bg-gray-700/50"
              />
              <button
                onClick={handleDocUpload}
                disabled={!docs || isLoading}
                className="mt-3 w-full bg-blue-600/90 text-white py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 mr-2" />
                )}
                Upload Document
              </button>
            </div>

            {/* Collect EMI */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 hover:border-purple-500/50 transition-colors group">
              <div className="flex items-center mb-3">
                <div className="bg-purple-900/30 p-2 rounded-lg mr-3 border border-purple-800/50 group-hover:bg-purple-900/50 transition-colors">
                  <CreditCard className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-medium text-white">Collect Payment</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Record EMI or partial payment from customer
              </p>
              <button
                onClick={handlePayment}
                className="mt-3 w-full bg-purple-600/90 text-white py-2.5 rounded-lg hover:bg-purple-700 flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Record Payment
              </button>
            </div>

            {/* Offer Products */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 hover:border-orange-500/50 transition-colors group">
              <div className="flex items-center mb-3">
                <div className="bg-orange-900/30 p-2 rounded-lg mr-3 border border-orange-800/50 group-hover:bg-orange-900/50 transition-colors">
                  <Gift className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="font-medium text-white">Product Offers</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Suggest relevant financial products
              </p>
              <button
                onClick={handleOffer}
                className="mt-3 w-full bg-orange-600/90 text-white py-2.5 rounded-lg hover:bg-orange-700 flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]"
              >
                <Gift className="w-4 h-4 mr-2" />
                Show Offers
              </button>
            </div>
          </div>

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
              <h3 className="font-medium text-white mb-4">
                Required Documents
              </h3>
              <div className="space-y-3">
                {[
                  "Aadhaar Card",
                  "PAN Card",
                  "Income Proof",
                  "Bank Statement",
                ].map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/50"
                  >
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-blue-400 mr-3" />
                      <span className="text-gray-300">{doc}</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-900/30 text-green-400 border border-green-800/50">
                      Received
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-yellow-400 mr-3" />
                    <span className="text-gray-300">Land Ownership Proof</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-900/30 text-yellow-400 border border-yellow-800/50">
                    Pending
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
              <h3 className="font-medium text-white mb-4">Payment History</h3>
              <div className="space-y-3">
                {[
                  { date: "15 Aug 2023", amount: "₹8,450", status: "Paid" },
                  { date: "15 Jul 2023", amount: "₹8,450", status: "Paid" },
                  { date: "15 Jun 2023", amount: "₹8,450", status: "Paid" },
                  { date: "15 May 2023", amount: "₹8,450", status: "Partial" },
                ].map((payment, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/50"
                  >
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 text-purple-400 mr-3" />
                      <div>
                        <p className="text-gray-300">{payment.date}</p>
                        <p className="text-xs text-gray-500">EMI Payment</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-300">{payment.amount}</p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          payment.status === "Paid"
                            ? "bg-green-900/30 text-green-400 border border-green-800/50"
                            : "bg-yellow-900/30 text-yellow-400 border border-yellow-800/50"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-900/70 px-6 py-3 border-t border-gray-800/50 flex justify-between items-center">
          <p className="text-xs text-gray-500">
            TVS Credit OneView Dealer Portal v2.1
          </p>
          <p className="text-xs text-gray-500">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
