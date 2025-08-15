// File: constants/index.ts

/**
 * Defines the possible statuses for a loan or credit card application.
 * Using an enum-like object provides type safety and autocompletion.
 */
export const ApplicationStatus = {
  IN_PROGRESS: 'In Progress',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  REWORK: 'Rework',
  SUBMITTED: 'Submitted',
} as const; // 'as const' makes it a readonly object with literal types

export type ApplicationStatusType = typeof ApplicationStatus[keyof typeof ApplicationStatus];

/**
 * Defines the product types available in the system.
 */
export const ProductTypes = {
  PERSONAL_LOAN: 'Personal Loan',
  CREDIT_CARD: 'Credit Card',
  TRACTOR_LOAN: 'Tractor Loan',
  TWO_WHEELER_LOAN: 'Two-Wheeler Loan',
  CONSUMER_DURABLE_LOAN: 'Consumer Durable Loan',
} as const;

export type ProductType = typeof ProductTypes[keyof typeof ProductTypes];

/**
 * Application-wide constants
 */
export const AppConfig = {
  appName: 'TVS Credit OneView',
  sessionCookieName: 'oneview_session',
};
