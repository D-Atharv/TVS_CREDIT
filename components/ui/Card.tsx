// File: components/ui/Card.tsx
import React from "react";

// Define the props for the Card component
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}
    >
      <div className="p-6">{children}</div>
    </div>
  );
}

// You can also export card-specific sub-components if needed
export const CardHeader = ({ children, className = "" }: CardProps) => (
  <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = "" }: CardProps) => (
  <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`}>
    {children}
  </div>
);
