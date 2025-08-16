// File: app/(auth)/dealer/register/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// --- Icon Components ---
const DealerIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const SalesIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
    />
  </svg>
);

const InventoryIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
);

const CommissionIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Logo = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256C0 397.385 114.615 512 256 512Z"
      fill="#007BFF"
    />
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="250"
      fill="white"
      dy=".1em"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
    >
      T
    </text>
  </svg>
);

const BentoBox = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-gray-900/70 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl hover:border-amber-500/80 transition-all duration-300 shadow-lg shadow-black/10 ${className}`}
  >
    {children}
  </div>
);

const dealerFeatures = [
  {
    Icon: DealerIcon,
    title: "Dealer Dashboard",
    description: "Manage all your customer applications in one place.",
    color: "text-amber-400",
  },
  {
    Icon: SalesIcon,
    title: "Sales Tracking",
    description: "Monitor your performance and conversion metrics.",
    color: "text-emerald-400",
  },
  {
    Icon: InventoryIcon,
    title: "Inventory Management",
    description: "Track vehicle stock and availability in real-time.",
    color: "text-blue-400",
  },
  {
    Icon: CommissionIcon,
    title: "Commission Reports",
    description: "View your earnings and payment history.",
    color: "text-purple-400",
  },
];

export default function DealerRegisterPage() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [formData, setFormData] = useState({
    dealershipName: "",
    contactPerson: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % dealerFeatures.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would register the dealer here
      router.push("/dealer/dashboard");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px] text-gray-300 font-sans p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
          {/* Feature Showcase - Left Side */}
          <div className="md:col-span-2 grid grid-cols-2 gap-6">
            {dealerFeatures.map((feature, index) => {
              const { Icon, title, description, color } = feature;
              const isActive = index === currentFeature;
              return (
                <BentoBox
                  key={title}
                  className={`transition-all duration-500 ${
                    isActive ? "ring-2 ring-amber-500/30" : ""
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-lg bg-gray-800/50 border border-gray-700 ${color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{title}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {description}
                      </p>
                    </div>
                  </div>
                </BentoBox>
              );
            })}
          </div>

          {/* Registration Form - Right Side */}
          <BentoBox className="md:col-span-1">
            <div className="flex justify-center mb-6">
              <Logo />
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-1">
              Dealer Registration
            </h2>
            <p className="text-center text-gray-400 mb-8">
              Join our network of authorized dealers
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-900/50 text-red-300 text-sm rounded-lg border border-red-800">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="dealershipName"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Dealership Name
                </label>
                <input
                  id="dealershipName"
                  name="dealershipName"
                  type="text"
                  required
                  value={formData.dealershipName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Your dealership name"
                />
              </div>

              <div>
                <label
                  htmlFor="contactPerson"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Contact Person
                </label>
                <input
                  id="contactPerson"
                  name="contactPerson"
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Business Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="contact@dealership.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="+91 9876543210"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-700 rounded bg-gray-800"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-400"
                >
                  I agree to the{" "}
                  <a href="#" className="text-amber-400 hover:text-amber-300">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-amber-400 hover:text-amber-300">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Registering...
                    </span>
                  ) : (
                    "Register Dealership"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/dealer/login"
                className="font-semibold text-amber-400 hover:text-amber-300"
              >
                Sign in
              </Link>
            </div>
          </BentoBox>
        </div>
      </div>
    </main>
  );
}
