import { Hospital, Gene, Bacteria, Resistance } from "@prisma/client";

export interface InDRESelected {
  profileId: string;
  action: string;
  bacteriaSearch: string;
  bacteriaSelector: string;
  resistanceSelector: string;
  geneSelector: string;
  geneVariant: string;
  cluesSearch: string | null;
  hospitalNameSearch: string | null;
  hospital: Hospital | null;
  newResistanceCreator: string;
  newAntibioticCreator: string;
  newHospitalCreator: string;
  newGeneCreator: string;
  [key: string]: string | null | Hospital | Record<string, string> | string[];
}

export interface InDRECreated {
  id: string;
  resistanceMechanism: string[];
  antibiotic: string[];
  hospitalName: string;
  hospitalClues: string;
  hospitalId: string;
  dateAdded: Date;
}

export interface InDRELoader {
  profileId: string;
  bacteriaListing: Bacteria[];
  resistanceListing: Resistance[];
  geneFamilyListing: Gene[];
}
