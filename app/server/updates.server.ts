import { prisma } from "~/server/database.server";
import { Visitation } from "@prisma/client";

export async function updateEvacuation(id: string, count: number) {
  return await prisma.visitation.update({
    where: { id },
    data: {
      evacuationCount: count,
    },
  });
}

export async function updateVomitos(id: string, count: number) {
  return await prisma.visitation.update({
    where: { id },
    data: {
      vomitCount: count,
    },
  });
}

export async function updatePrimaryCondition(
  visitationId: string,
  data: string[]
): Promise<Visitation | null> {
  return await prisma.visitation.update({
    where: { id: visitationId },
    data: {
      primaryConditions: data,
    },
  });
}

export async function updateSecondaryCondition(id: string, data: string[]) {
  return await prisma.visitation.update({
    where: { id },
    data: {
      secondaryConditions: data,
    },
  });
}

export async function updateVisitationNotes(
  visitationId: string,
  notes: string
): Promise<Visitation | null> {
  return await prisma.visitation.update({
    where: { id: visitationId },
    data: { notes },
  });
}
