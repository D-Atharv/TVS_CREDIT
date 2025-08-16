"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  Lock,
  Calendar,
  ArrowLeft,
  Loader2,
  CheckCircle,
  Building,
  User,
  FileText,
} from "lucide-react";

// A wrapper component to ensure useSearchParams is used within a Suspense boundary
const StripePaymentPageContent = () => {
  const searchParams = useSearchParams();

  const [customerName, setCustomerName] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [product, setProduct] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success"
  >("idle");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate fetching data and trigger animations
    setCustomerName(searchParams.get("name") || "N/A");
    setApplicationId(searchParams.get("applicationId") || "N/A");
    setProduct(searchParams.get("product") || "N/A");
    setIsLoaded(true);
  }, [searchParams]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStatus("processing");
    setTimeout(() => {
      setPaymentStatus("success");
    }, 2000);
  };

  const baseBentoBoxStyles =
    "bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:border-white/20 hover:-translate-y-1";

  const animationDelay = (index: number) => ({
    animationDelay: `${index * 100}ms`,
    animationFillMode: "backwards",
  });

  // CSS Keyframes are defined here directly, so no tailwind.config.js is needed.
  const animationStyles = `
    @keyframes fade-in-up {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes scale-in {
      0% { opacity: 0; transform: scale(0.9); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes check-mark-circle {
      0% { transform: scale(0.8); opacity: 0; }
      50% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes check-mark-path {
      0% { stroke-dashoffset: 100; }
      100% { stroke-dashoffset: 0; }
    }
    .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
    .animate-scale-in { animation: scale-in 0.5s ease-out forwards; }
    .animate-check-mark-circle { animation: check-mark-circle 0.6s ease-out forwards; }
    .animate-check-mark-path {
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: check-mark-path 0.5s ease-out 0.3s forwards;
    }
  `;

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] [background-size:40px_40px] text-gray-200 flex items-center justify-center p-4 selection:bg-blue-500/30">
      <style>{animationStyles}</style>
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 animate-[pulse_6s_ease-in-out_infinite]"></div>

        <div
          className={`relative w-full grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-blue-500/10 overflow-hidden transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Left Side: Order Summary in Bento Grid */}
          <div className="lg:col-span-2 p-6 lg:p-8 grid grid-cols-2 gap-6">
            <div
              className={`${baseBentoBoxStyles} col-span-2 `}
              style={animationDelay(0)}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <Building className="w-8 h-8 text-blue-400" />
                </div>
                <span className="text-3xl font-bold text-white tracking-wider">
                  TVS Credit
                </span>
              </div>
            </div>

            <div className={`${baseBentoBoxStyles} col-span-2 `}>
              <div className="flex items-start space-x-4">
                <User className="w-6 h-6 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Paying for</p>
                  <h2 className="text-xl font-semibold text-white mt-1 truncate">
                    {customerName}
                  </h2>
                  <p className="text-xs text-gray-500 font-mono mt-1">
                    {applicationId}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`${baseBentoBoxStyles} col-span-2 `}
              style={animationDelay(2)}
            >
              <div className="flex items-start space-x-4">
                <FileText className="w-6 h-6 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Order Details</p>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Product</span>
                      <span className="text-white font-medium">{product}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">EMI Amount</span>
                      <span className="text-white font-medium">₹16,250.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Convenience Fee</span>
                      <span className="font-medium text-green-400">₹0.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`col-span-2 bg-blue-600/20 border border-blue-500/30 rounded-2xl p-6 shadow-lg `}
              style={animationDelay(3)}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-white">
                  Total Amount
                </span>
                <span className="text-3xl font-bold text-blue-300">
                  ₹16,250.00
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Payment Form */}
          <div className="lg:col-span-3 p-6 lg:p-8 backdrop-blur-sm flex items-center">
            {paymentStatus === "success" ? (
              <div className="flex flex-col items-center justify-center w-full h-full text-center">
                <div className="animate-check-mark-circle">
                  <CheckCircle
                    className="w-24 h-24 text-green-400"
                    strokeWidth={1.5}
                  >
                    <path
                      className="animate-check-mark-path"
                      d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                    />
                    <polyline
                      className="animate-check-mark-path"
                      points="22 4 12 14.01 9 11.01"
                    />
                  </CheckCircle>
                </div>
                <h3
                  className="text-3xl font-bold text-white mt-6 animate-fade-in-up"
                  style={animationDelay(2)}
                >
                  Payment Successful!
                </h3>
                <p
                  className="text-gray-400 mt-2 animate-fade-in-up"
                  style={animationDelay(3)}
                >
                  Your transaction has been confirmed.
                </p>
                <Link href="/dealer-kiosk">
                  <div
                    className="mt-8 inline-flex items-center px-8 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 ring-2 ring-transparent hover:ring-blue-500 animate-fade-in-up"
                    style={animationDelay(4)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Return to Kiosk
                  </div>
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handlePayment}
                className="w-full animate-scale-in"
              >
                <h3 className="text-2xl font-semibold text-white mb-8">
                  Enter Card Details
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-800/80 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-gray-400 mb-2 block">
                        Expiry Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          placeholder="MM / YY"
                          required
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-800/80 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400 mb-2 block">
                        CVC
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          placeholder="123"
                          required
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-800/80 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      required
                      className="w-full px-4 py-3.5 bg-gray-800/80 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={paymentStatus === "processing"}
                  className="mt-8 w-full inline-flex items-center justify-center px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-[0_0_25px_rgba(59,130,246,0.3)] disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {paymentStatus === "processing" ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    `Pay ₹16,250.00 Securely`
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// The main export uses Suspense to wrap the component that uses useSearchParams
export default function StripePaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white/50 text-lg">
          <Loader2 className="w-6 h-6 mr-3 animate-spin" />
          Loading Payment Gateway...
        </div>
      }
    >
      <StripePaymentPageContent />
    </Suspense>
  );
}
