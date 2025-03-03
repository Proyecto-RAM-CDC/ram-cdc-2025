import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// 'dotenv' here is used to load environment variables from a .env file so that they
// can be accessed using 'process.env'. In this context they are used by Prisma to
// connect to the database.
dotenv.config();
const prisma = new PrismaClient();

const list_of_states = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila de Zaragoza",
  "Colima",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "México",
  "Michoacán de Ocampo",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz de Ignacio de la Llave",
  "Yucatán",
  "Zacatecas",
];

async function populateStates() {
  for (const stateName of list_of_states) {
    try {
      // Create the object in the database.
      await prisma.state.upsert({
        where: { stateName }, // Match on the 'stateName' unique identifier.
        update: {}, // No need to update anything.
        create: {
          stateName,
        }, // Create a new object if it doesn't exist.
      });
    } catch (error) {
      console.error(
        `Error upserting 'State' with 'stateName' ${stateName}:`,
        error
      );
    }
  }
  console.log("Database 'State' seeded successfully!");
}

async function runAllPopulations() {
  try {
    await populateStates();
    console.log("All tables seeded successfully!");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runAllPopulations();
