import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// 'dotenv' here is used to load environment variables from a .env file so that they
// can be accessed using 'process.env'. In this context they are used by Prisma to
// connect to the database.
dotenv.config();
const prisma = new PrismaClient();

const list_of_bacterias = [
  { bacteria: "Enterobacterales", table: 3 },
  { bacteria: "Salmonella spp y Shigella spp", table: 3 },
  { bacteria: "Pseudomonas aeruginosa", table: 3 },
  { bacteria: "Acinetobacter spp", table: 3 },
  { bacteria: "Burkholderia cepacia complex", table: 3 },
  { bacteria: "Stenotrophomonas maltophilia", table: 3 },
  { bacteria: "Otros no Enterobacterales", table: 3 },
  { bacteria: "Haemophilus influenzae y Haemophilus parainfluenzae", table: 3 },
  { bacteria: "Neisseria gonorrhoeae", table: 3 },
  { bacteria: "Naisseria meningitidis", table: 3 },
  { bacteria: "Staphylococcus spp", table: 3 },
  { bacteria: "Enterococcus spp", table: 3 },
  { bacteria: "Streptococcus pneumoniae", table: 3 },
  { bacteria: "Streptococcus spp (Grupo &beta;-hemolítico)", table: 3 },
  { bacteria: "Streptococcus spp (Grupo Viridans)", table: 3 },

  { bacteria: "Anaerobios", table: 4 },
  { bacteria: "Nocardia spp", table: 4 },
  { bacteria: "Abiotrophia spp y Granulicatella spp", table: 4 },
  { bacteria: "Aerococcus spp", table: 4 },
  { bacteria: "Aeromonas spp", table: 4 },
  {
    bacteria:
      "Bacillus spp y géneros relacionados (No incluye Bacillus anthracis)",
    table: 4,
  },
  { bacteria: "Campylobacter jejuni/coli", table: 4 },
  {
    bacteria:
      "Corynebacterium spp y otros Géneros de Coryneformes relacionados",
    table: 4,
  },
  { bacteria: "Erysipelothrix rhusiopathiae", table: 4 },
  { bacteria: "Gemella spp", table: 4 },
  {
    bacteria:
      "Aggregatibacter spp, Cardiobacterium spp, Eikenella corrodens y Kingella spp",
    table: 4,
  },
  { bacteria: "Vibrio spp", table: 4 },
  { bacteria: "Lactobacillus spp", table: 4 },
  { bacteria: "Lactococcus spp", table: 4 },
  { bacteria: "Leuconostoc spp", table: 4 },

  { bacteria: "Listeria monocytogenes", table: 5 },
  { bacteria: "Micrococcus spp", table: 5 },
  { bacteria: "Moraxella catarrhalis", table: 5 },
  { bacteria: "Pasteurella spp", table: 5 },
  { bacteria: "Pediococcus spp", table: 5 },
  { bacteria: "Rothia mucilaginosa", table: 5 },
  { bacteria: "Helycobacter pylori", table: 5 },

  { bacteria: "Candida albicans", table: 6 },
  { bacteria: "Candida glabrata", table: 6 },
  { bacteria: "Candida guilliermondii", table: 6 },
  { bacteria: "Candida krusei", table: 6 },
  { bacteria: "Candida parapsilosis complexo", table: 6 },
  { bacteria: "Candida tropicalis", table: 6 },
  { bacteria: "Candida auris", table: 6 },
  { bacteria: "Candida dubliniensis", table: 6 },
  { bacteria: "Candida kefyr", table: 6 },
  { bacteria: "Candida lusitaniae", table: 6 },
  { bacteria: "Candida peliculosa", table: 6 },
  { bacteria: "Candida duobushaemulonii", table: 6 },
  { bacteria: "Candida haemulonii", table: 6 },
  { bacteria: "Candida pararugosa", table: 6 },
  { bacteria: "Candida rugosa", table: 6 },
  { bacteria: "Cryptococcus deuterogatti", table: 6 },
  { bacteria: "Cryptococcus gatti", table: 6 },
  { bacteria: "Cryptococcus neoformans", table: 6 },
  { bacteria: "Aspergillus fumigatus", table: 6 },
];

async function populateBacteria() {
  for (const bacteria of list_of_bacterias) {
    try {
      // Create the object in the database.
      await prisma.bacteria.upsert({
        where: { bacteria: bacteria.bacteria }, // Match on the bacteria unique identifier.
        update: {}, // No need to update anything.
        create: {
          bacteria: bacteria.bacteria,
          table: bacteria.table,
        }, // Create a new object if it doesn't exist.
      });
    } catch (error) {
      console.error(
        `Error upserting 'Bacteria' with 'bacteria' ${bacteria.bacteria}:`,
        error
      );
    }
  }
  console.log("Database 'Bacteria' seeded successfully!");
}

async function runAllPopulations() {
  try {
    await populateBacteria();
    console.log("All tables seeded successfully!");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runAllPopulations();
