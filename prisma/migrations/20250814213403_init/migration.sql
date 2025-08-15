/*
  Warnings:

  - The values [TRACTOR_LOAN] on the enum `ProductType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `applicantName` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `channel` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `lane` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `Application` table. All the data in the column will be lost.
  - The `status` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `StatusEvent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `kycDocs` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificationLog` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('CUSTOMER', 'DEALER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."AppStatus" AS ENUM ('RECEIVED', 'KYC_VERIFIED', 'BUREAU_CHECK', 'ALT_DATA_CHECK', 'APPROVED', 'REJECTED', 'IN_PROGRESS', 'DISBURSED', 'DELIVERED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."ChannelType" ADD VALUE 'EMAIL';
ALTER TYPE "public"."ChannelType" ADD VALUE 'IVR';

-- AlterEnum
BEGIN;
CREATE TYPE "public"."ProductType_new" AS ENUM ('LOAN', 'CREDIT_CARD', 'INSURANCE', 'GOLD_LOAN', 'BNPL');
ALTER TABLE "public"."Product" ALTER COLUMN "type" TYPE "public"."ProductType_new" USING ("type"::text::"public"."ProductType_new");
ALTER TYPE "public"."ProductType" RENAME TO "ProductType_old";
ALTER TYPE "public"."ProductType_new" RENAME TO "ProductType";
DROP TYPE "public"."ProductType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."StatusEvent" DROP CONSTRAINT "StatusEvent_applicationId_fkey";

-- AlterTable
ALTER TABLE "public"."Application" DROP COLUMN "applicantName",
DROP COLUMN "channel",
DROP COLUMN "city",
DROP COLUMN "lane",
DROP COLUMN "mobile",
DROP COLUMN "product",
ADD COLUMN     "crossSellOffered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dealerId" TEXT,
ADD COLUMN     "kycDocs" JSONB NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "verificationLog" JSONB NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."AppStatus" NOT NULL DEFAULT 'RECEIVED';

-- DropTable
DROP TABLE "public"."StatusEvent";

-- DropEnum
DROP TYPE "public"."LaneType";

-- DropEnum
DROP TYPE "public"."StatusType";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "role" "public"."UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "language" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Dealer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dealer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "public"."ProductType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AlternateData" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "telcoScore" INTEGER,
    "mandiScore" INTEGER,
    "dealerRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AlternateData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "applicationId" TEXT,
    "channel" "public"."ChannelType" NOT NULL,
    "message" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "language" TEXT NOT NULL DEFAULT 'en',
    "read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_DealerToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DealerToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_phone_key" ON "public"."Dealer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_email_key" ON "public"."Dealer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AlternateData_applicationId_key" ON "public"."AlternateData"("applicationId");

-- CreateIndex
CREATE INDEX "_DealerToUser_B_index" ON "public"."_DealerToUser"("B");

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "public"."Dealer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AlternateData" ADD CONSTRAINT "AlternateData_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_DealerToUser" ADD CONSTRAINT "_DealerToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Dealer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_DealerToUser" ADD CONSTRAINT "_DealerToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
