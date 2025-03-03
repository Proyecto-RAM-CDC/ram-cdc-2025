import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// 'dotenv' here is used to load environment variables from a .env file so that they
// can be accessed using 'process.env'. In this context they are used by Prisma to
// connect to the database.
dotenv.config();
const prisma = new PrismaClient();

const list_of_genes = [
  "blaKPC",
  "blaNDM",
  "blaOXA",
  "blaGES",
  "blaVIM",
  "blaIMP",
  "BlaTEM",
  "blaSHV",
  "blaCTX-M",
  "blaACT",
  "blaMIR",
  "blaACC",
  "blaFOX",
  "blaMOX",
  "blaCMY",
  "blaDHA",
  "blaLAT",
  "blaBIL",
  "blaPER",
  "blaVEB",
  "mcr",
  "vanA",
  "vanB",
  "vanC",
  "pilV",
  "mecA",
  "mecC",
  "femA",
  "luk",
  "ermA",
  "ermB",
  "ermC",
  "ermT",
  "msrA",
  "blaZ",
  "tpi",
  "tcdA",
  "tcdB",
  "qnrA",
  "qnrB",
  "qnrS",
  "tetK",
  "tetL",
  "tetM",
  "tetO",
  "tetG",
  "aacA-aphD",
  "aadD",
  "aphA3",
  "inuA",
  "mphC",
];

async function populateGeneFamilies() {
  for (const geneName of list_of_genes) {
    try {
      // Create the object in the database.
      await prisma.gene.upsert({
        where: { geneName }, // Match on the geneName unique identifier.
        update: {}, // No need to update anything.
        create: {
          geneName,
        }, // Create a new object if it doesn't exist.
      });
    } catch (error) {
      console.error(
        `Error upserting 'Gene' with 'geneName' ${geneName}:`,
        error
      );
    }
  }
  console.log("Database 'Gene' seeded successfully!");
}

async function runAllPopulations() {
  try {
    await populateGeneFamilies();
    console.log("All tables seeded successfully!");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runAllPopulations();
