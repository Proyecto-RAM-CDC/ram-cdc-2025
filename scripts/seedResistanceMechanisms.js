import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// 'dotenv' here is used to load environment variables from a .env file so that they
// can be accessed using 'process.env'. In this context they are used by Prisma to
// connect to the database.
dotenv.config();
const prisma = new PrismaClient();

const list_of_resistance_mechanisms = [
  "Betalactamasa de espectro reducido (BLER)",
  "Betalactamasa de espectro ampliado (BLEA)",
  "Betalactamasa de espectro extendido (BLEE)",
  "Hiperproducción/desrepresión de AmpC",
  "AmpC plasmídico",
  "Impermeabilidad",
  "Eflujo",
  "Carbapenemasa",
  "Serincarbapenemasa",
  "Carbapenemasa inhibible por APB",
  "Metalocarbapenemasa",
  "Carbapenemasa inhibible por EDTA",
  "Resistencia no enzimática a carbapenemes",
  "Resistencia a fluoroquinolonas",
  "Meticilino resistencia",
  "MLSb inducible",
  "MLSb constitutivo",
  "Lincosaminoadenilasa (fenotipo 'L')",
  "Resistencia a linezolid",
  "Resistencia a vancomicina",
  "VISA",
  "VRSA",
  "No sensibilidad a daptomicina",
  "Resistencia a polimixinas",
  "Resistencia transferible a polimixinas mediada por mcr",
  "Resistencia a azitromicina",
  "Resistencia a azitromicina mediada por mphA",
  "Resistencia a cefalosporinas de 3ª generación",
  "Resistencia a ceftacidima/avibactam",
  "Resistencia a ceftolozano/tazobactam",
];

async function populateResistanceMechanisms() {
  for (const resistanceMechanism of list_of_resistance_mechanisms) {
    try {
      // Create the object in the database.
      await prisma.resistance.upsert({
        where: { resistanceMechanism }, // Match on the resistanceMechanism unique identifier.
        update: {}, // No need to update anything.
        create: {
          resistanceMechanism,
        }, // Create a new object if it doesn't exist.
      });
    } catch (error) {
      console.error(
        `Error upserting 'Resistance' with 'resistanceMechanism' ${resistanceMechanism}:`,
        error
      );
    }
  }
  console.log("Database 'Resistance' seeded successfully!");
}

async function runAllPopulations() {
  try {
    await populateResistanceMechanisms();
    console.log("All tables seeded successfully!");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runAllPopulations();
