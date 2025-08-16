// File: app/(dashboard)/raise-ticket/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import {
  Camera,
  CheckCircle2,
  Loader2,
  Ticket,
  HelpCircle,
  Phone,
  ChevronRight,
  FileText,
  AlertCircle,
} from "lucide-react";

// --- Modular Components ---
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
    className={`relative bg-gray-900/80 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 shadow-lg shadow-black/10 overflow-hidden ${className}`}
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

const StatusPill = ({
  status,
}: {
  status: "resolved" | "pending" | "in-progress";
}) => {
  const statusConfig = {
    resolved: {
      color: "bg-green-900/20 text-green-400",
      icon: <CheckCircle2 className="w-4 h-4" />,
      text: "Resolved",
    },
    pending: {
      color: "bg-yellow-900/20 text-yellow-400",
      icon: <Loader2 className="w-4 h-4 animate-spin" />,
      text: "Pending",
    },
    "in-progress": {
      color: "bg-blue-900/20 text-blue-400",
      icon: <Loader2 className="w-4 h-4 animate-spin" />,
      text: "In Progress",
    },
  };
  return (
    <span
      className={`text-xs px-2 py-1 rounded-full flex items-center ${statusConfig[status].color}`}
    >
      {statusConfig[status].icon}
      <span className="ml-1">{statusConfig[status].text}</span>
    </span>
  );
};

const TicketItem = ({
  id,
  title,
  date,
  status,
}: {
  id: string;
  title: string;
  date: string;
  status: "resolved" | "pending" | "in-progress";
}) => (
  <a
    href="#"
    className="block p-3 rounded-lg hover:bg-gray-800/70 transition-colors group"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
          #{id} - {title}
        </p>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
      </div>
      <StatusPill status={status} />
    </div>
  </a>
);

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-gray-800 last:border-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-3 flex justify-between items-center hover:bg-gray-800/50 rounded-lg transition-colors"
      >
        <span className="text-sm font-medium text-gray-300">{question}</span>
        <ChevronRight
          className={`w-4 h-4 text-gray-500 transition-transform ${
            expanded ? "rotate-90" : ""
          }`}
        />
      </button>
      {expanded && (
        <div className="px-3 pb-3 text-sm text-gray-400 animate-fadeIn">
          {answer}
        </div>
      )}
    </div>
  );
};

const ResolutionStep = ({
  text,
  status,
  details,
}: {
  text: string;
  status: "completed" | "processing" | "pending";
  details?: string[];
}) => {
  const statusConfig = {
    completed: {
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      textColor: "text-gray-300",
      bg: "bg-green-900/10",
    },
    processing: {
      icon: <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />,
      textColor: "text-blue-300",
      bg: "bg-blue-900/10",
    },
    pending: {
      icon: <div className="w-5 h-5 rounded-full border-2 border-gray-700" />,
      textColor: "text-gray-500",
      bg: "bg-gray-900/10",
    },
  };
  return (
    <div
      className={`p-3 rounded-lg mb-2 ${statusConfig[status].bg} transition-all duration-300`}
    >
      <div className="flex items-start">
        <div className="mt-0.5 mr-3">{statusConfig[status].icon}</div>
        <div>
          <p
            className={`text-sm font-medium ${statusConfig[status].textColor}`}
          >
            {text}
          </p>
          {details && status !== "pending" && (
            <ul className="mt-1 pl-4 text-xs text-gray-400 space-y-1">
              {details.map((detail, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function RaiseTicketPage() {
  const [issue, setIssue] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [ticketState, setTicketState] = useState<
    "form" | "processing" | "resolved"
  >("form");
  const [resolutionStep, setResolutionStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Payment Issue");

  const categories = [
    "Payment Issue",
    "Document Upload Problem",
    "Account Information Update",
    "Loan Application Status",
    "Technical Issue",
    "Other",
  ];
  const resolutionSteps = [
    {
      text: "Ticket Submitted & Queued",
      details: ["Priority: High", "Estimated wait time: <5 minutes"],
    },
    {
      text: "AI analyzing issue description",
      details: [
        "Detected keywords: payment, not reflecting",
        "Confidence: 92%",
      ],
    },
    {
      text: "AI analyzing attached image",
      details: ["Image contains payment receipt", "Transaction ID identified"],
    },
    {
      text: "Query identified: Payment Dispute",
      details: ["Common issue", "Average resolution time: 2 hours"],
    },
    {
      text: "Solution found, assigning to agent",
      details: ["Agent: Priya K. (4.9★ rating)", "Specialty: Payment issues"],
    },
    {
      text: "Resolution in progress",
      details: ["Agent has begun working", "You'll be notified of updates"],
    },
  ];

  useEffect(() => {
    if (
      ticketState === "processing" &&
      resolutionStep < resolutionSteps.length - 1
    ) {
      const timer = setTimeout(
        () => setResolutionStep((prev) => prev + 1),
        1500
      );
      return () => clearTimeout(timer);
    }
    if (resolutionStep === resolutionSteps.length - 1) {
      const finalTimer = setTimeout(() => setTicketState("resolved"), 1500);
      return () => clearTimeout(finalTimer);
    }
  }, [ticketState, resolutionStep,resolutionSteps.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;
    setTicketState("processing");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px] text-gray-300 p-4 sm:p-6 lg:p-8">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-white">
          Customer <span className="text-blue-400">Support</span> Center
        </h1>
        <p className="mt-2 text-md text-gray-400">
          Get help with your account, payments, or any other queries
        </p>
      </header>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BentoBox glow>
            {ticketState === "form" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-2 rounded-lg bg-blue-900/30 border border-blue-800/50">
                    <Ticket className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Raise a New Support Ticket
                  </h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Whats the issue about?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                          selectedCategory === category
                            ? "border-blue-500 bg-blue-900/20 text-white"
                            : "border-gray-800 hover:border-gray-700 text-gray-400"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Describe your issue in detail
                  </label>
                  <textarea
                    rows={4}
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    className="block w-full px-4 py-3 bg-gray-800/80 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., My EMI payment was deducted but it's not reflecting in my account..."
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    The more details you provide, the faster we can help you.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Attach supporting documents (Optional)
                  </label>
                  <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:border-blue-500/50 transition-colors bg-gray-900/50">
                    <div className="text-center">
                      {image ? (
                        <>
                          <FileText className="w-8 h-8 mx-auto text-blue-400 mb-2" />
                          <p className="text-sm font-medium text-white">
                            {image.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {(image.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </>
                      ) : (
                        <>
                          <Camera className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-400">
                            <span className="font-medium text-blue-400">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, PDF up to 10MB
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                    />
                  </label>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={!issue.trim()}
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.4)] transform hover:scale-[1.02] transition-all disabled:bg-gray-700 disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100"
                  >
                    Submit Ticket <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </form>
            )}
            {ticketState === "processing" && (
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-2 rounded-lg bg-blue-900/30 border border-blue-800/50">
                    <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Analyzing Your Issue
                  </h2>
                </div>
                <div className="mb-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50 flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-blue-300">
                    Our AI is working to understand your issue. This usually
                    takes less than a minute.
                  </p>
                </div>
                <div className="space-y-2">
                  {resolutionSteps.map((step, index) => (
                    <ResolutionStep
                      key={index}
                      text={step.text}
                      details={step.details}
                      status={
                        index < resolutionStep
                          ? "completed"
                          : index === resolutionStep
                          ? "processing"
                          : "pending"
                      }
                    />
                  ))}
                </div>
              </div>
            )}
            {ticketState === "resolved" && (
              <div className="text-center py-6">
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-green-900/20 border border-green-800/50">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-green-400 mt-4">
                  Ticket Successfully Created!
                </h2>
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700 max-w-md mx-auto">
                  <p className="text-sm font-medium text-white">
                    Ticket #TVS-789123
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Created: {new Date().toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    Category: {selectedCategory}
                  </p>
                </div>
                <p className="mt-6 text-gray-400">
                  A customer care executive will contact you within{" "}
                  <span className="font-semibold text-white">2 hours</span>.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href="/dashboard"
                    className="px-6 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Back to Dashboard
                  </a>
                  <a
                    href="#view-ticket"
                    className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Ticket Details
                  </a>
                </div>
              </div>
            )}
          </BentoBox>
        </div>
        <div className="space-y-6">
          <BentoBox>
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-2 rounded-lg bg-blue-900/30 border border-blue-800/50">
                <Ticket className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                My Recent Tickets
              </h2>
            </div>
            <div className="space-y-2">
              {[
                {
                  id: "TVS-789122",
                  title: "Address Change",
                  date: "Resolved on 12 Aug 2024",
                  status: "resolved" as const,
                },
                {
                  id: "TVS-789120",
                  title: "Loan Statement Request",
                  date: "Submitted on 02 Jul 2024",
                  status: "in-progress" as const,
                },
                {
                  id: "TVS-789115",
                  title: "Payment Dispute",
                  date: "Resolved on 15 Jun 2024",
                  status: "resolved" as const,
                },
              ].map((ticket) => (
                <TicketItem key={ticket.id} {...ticket} />
              ))}
            </div>
            <a
              href="#view-all"
              className="mt-4 block text-center py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all tickets
            </a>
          </BentoBox>
          <BentoBox>
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-2 rounded-lg bg-cyan-900/30 border border-cyan-800/50">
                <HelpCircle className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Help Center</h2>
            </div>
            <div className="text-sm">
              <FAQItem
                question="How do I update my contact number?"
                answer="You can update your contact information in the Profile section of your dashboard. Verification may be required."
              />
              <FAQItem
                question="Where can I find my loan statement?"
                answer="Statements are available in the Documents section. You can download PDF statements for any month."
              />
              <FAQItem
                question="What are the charges for foreclosure?"
                answer="Foreclosure charges vary by loan type. Typically 2-5% of principal outstanding. Check your loan agreement for exact terms."
              />
            </div>
            <a
              href="#faq"
              className="mt-4 block text-center py-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Browse all FAQs
            </a>
          </BentoBox>
          <BentoBox>
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-2 rounded-lg bg-green-900/30 border border-green-800/50">
                <Phone className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Immediate Assistance
              </h2>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              For urgent issues that cant wait, contact our 24/7 customer
              support team.
            </p>
            <div className="space-y-3">
              <a
                href="tel:18001234567"
                className="w-full text-center py-3 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors font-medium flex items-center justify-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call 1800-123-4567
              </a>
              <a
                href="#live-chat"
                className="w-full block text-center py-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors font-medium"
              >
                Start Live Chat
              </a>
            </div>
          </BentoBox>
        </div>
      </div>
    </div>
  );
}
