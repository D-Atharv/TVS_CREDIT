-- CreateEnum
CREATE TYPE "public"."ProductType" AS ENUM ('LOAN', 'CREDIT_CARD', 'TRACTOR_LOAN');

-- CreateEnum
CREATE TYPE "public"."ChannelType" AS ENUM ('WEB', 'DEALER', 'WHATSAPP', 'SMS');

-- CreateEnum
CREATE TYPE "public"."LaneType" AS ENUM ('FAST_LANE', 'ALT_LANE');

-- CreateEnum
CREATE TYPE "public"."StatusType" AS ENUM ('RECEIVED', 'BUREAU_VERIFIED', 'ALT_DATA_CHECK', 'APPROVED', 'DECLINED');

-- CreateTable
CREATE TABLE "public"."Application" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicantName" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "product" "public"."ProductType" NOT NULL,
    "city" TEXT NOT NULL,
    "channel" "public"."ChannelType" NOT NULL DEFAULT 'WEB',
    "lane" "public"."LaneType",
    "status" "public"."StatusType" NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StatusEvent" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."StatusType" NOT NULL,
    "note" TEXT,

    CONSTRAINT "StatusEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."StatusEvent" ADD CONSTRAINT "StatusEvent_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
