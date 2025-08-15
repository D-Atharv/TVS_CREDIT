// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { startVerificationPipeline } from "@/lib/workflow";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.statusEvent.deleteMany({});
  await prisma.application.deleteMany({});

  console.log("Seeding started...");

  // Seed a fast-lane application (Priya)
  const priya = await prisma.application.create({
    data: {
      applicantName: "Priya Sharma",
      mobile: "9876543210",
      product: "LOAN",
      city: "Mumbai",
      status: "RECEIVED",
    },
  });
  await prisma.statusEvent.create({
    data: {
      applicationId: priya.id,
      status: "RECEIVED",
      note: "Application received",
    },
  });
  startVerificationPipeline(priya.id, priya.mobile);

  // Seed an alt-lane application (Ramesh)
  const ramesh = await prisma.application.create({
    data: {
      applicantName: "Ramesh Kumar",
      mobile: "8765432109",
      product: "TRACTOR_LOAN",
      city: "Patna",
      status: "RECEIVED",
    },
  });
  await prisma.statusEvent.create({
    data: {
      applicationId: ramesh.id,
      status: "RECEIVED",
      note: "Application received",
    },
  });
  startVerificationPipeline(ramesh.id, ramesh.mobile);

  // Seed a third application that has not yet started the pipeline
  const ankit = await prisma.application.create({
    data: {
      applicantName: "Ankit Singh",
      mobile: "9988776655",
      product: "CREDIT_CARD",
      city: "Delhi",
      status: "RECEIVED",
    },
  });
  await prisma.statusEvent.create({
    data: {
      applicationId: ankit.id,
      status: "RECEIVED",
      note: "Application received",
    },
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });