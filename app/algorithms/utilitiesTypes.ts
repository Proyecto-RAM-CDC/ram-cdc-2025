import { AlgorithmData } from "~/utilities/types";

export enum enumRiskFactors {
  Diabetes = "Diabetes",
  Inmunosupresion = "Paciente es inmunocompromiso",
  Cardiovasculares = "Enfermedades cardiovasculares",
  HasRenalIssues = "Enfermedades renales",
  Hepaticos = "Enfermedades hepáticas",
  Embarazo = "Embarazo actual",
}

export enum enumAllergies {
  Penicilinas = "Penicilinas",
  Quinolonas = "Quinolonas",
  Macrolidos = "Macrólidos",
  Cefalosporinas = "Cefalosporinas",
  Tetraciclinas = "Tetraciclinas",
  Sulfonamidas = "Sulfonamidas",
  Aminoglucosidos = "Aminoglucósidos",
}

export enum enumCondition {
  Edas = "EDAS",
  Iras = "IRAS",
  Its = "ITS",
  Ivu = "IVU",
}

export enum enumPatientType {
  AdultoMayor = "Adulto mayor",
  Pediatrico = "Pediátrico",
  Adulto = "Adulto",
}

export enum enumSexonacer {
  Hombre = "Hombre",
  Mujer = "Mujer",
  Intersex = "Intersex",
  Indeterminado = "Indeterminado",
  PrefiereNoDecir = "Prefiere no decir",
}

export enum enumGenero {
  HombreCisgenero = "Hombre cisgénero",
  MujerCisgenero = "Mujer cisgénero",
  HombreTransgenero = "Hombre transexual",
  MujerTransgenero = "Mujer transexual",
  Queer = "Queer",
  PersonaNoBinaria = "Persona No Binaria",
  OtraIdentidadGenero = "Otra identidad de género",
  PrefiereNoDecir = "Prefiere no decir",
}

export type typeFlatSymptomData = { [key: string]: string };
export type typeNestedSymptomData = { [key: string]: typeFlatSymptomData };

export type typeSymptomsData = typeFlatSymptomData | typeNestedSymptomData;

export type typeAge = {
  years: number;
  months: number;
  days: number;
};

export type typeIrasDiagnostic =
  | "Bronquitis antibiotico"
  | "Exacerbación de EPOC"
  | "Exacerbación de EPOC enviar a segundo nivel"
  | "Neumonia sintomatico"
  | "Neumonía adquirida en la comunidad"
  | "OMA antibiotico"
  | "OMA sintomatico"
  | "Sinusitis sintomatico"
  | "Sinusitis antibiotico"
  | "Faringitis antibiotico"
  | "Faringitis sintomatico"
  | null;

export type typeReportCard = {
  age: typeAge;
  postmenopausia: boolean;
  symptoms: string[];
  allergies: string[];
  dob: string;
  patientType: enumPatientType;
  sexonacer: enumSexonacer;
  genero: enumGenero;
  primaryConditions: string[];
  secondaryConditions: string[];
  migrant: boolean;
  indigenous: boolean;
  afrodescendant: boolean;
  takenMedication: boolean;
  hospitalized: boolean;
  disability: boolean;
  evacuationCount: number;
  vomitCount: number;
  embarazo: boolean;
  diagnosis: typeIrasDiagnostic;
};

export type typePropsReportCard = {
  data: typeReportCard;
};

export type typePropsAlgos = {
  loaderData: AlgorithmData;
};

export type typeEdasPropsPositive = {
  age: typeAge;
  hasDisenteria: boolean;
  hasFiebre: boolean;
  hasDolorAbdominal: boolean;
  hasDiarrea: boolean;
  isImmunosuppressed: boolean;
  hasSangreHeces: boolean;
  evacuationCount: number;
  patientType: enumPatientType;
};

export type typeEdasPropsNegative = {
  age: typeAge;
  hasDisenteria: boolean;
  hasFiebre: boolean;
  hasDolorAbdominal: boolean;
  hasDiarrea: boolean;
  isImmunosuppressed: boolean;
  hasSangreHeces: boolean;
  evacuationCount: number;
  patientType: enumPatientType;
  hasRenalIssues: boolean;
  takenMedication: boolean;
  hospitalized: boolean;
};

export type typeCistitisAgudaProps = {
  hasDisuria: boolean;
  hasUrgencia: boolean;
  hasPolaquiuria: boolean;
  hasTenesmoVesical: boolean;
  hasAntecedenteCistitisRepetida: boolean;
};

export type typePielonefritisAgudaProps = {
  hasDolorLumbar: boolean;
  hasFiebre: boolean;
  hasMalEstado: boolean;
  hasDolorAnguloCostovertebral: boolean;
};

export type typeProstatitisProps = {
  hasDolorPelvico: boolean;
  hasAntecedenteManipulacionViaUrinaria: boolean;
  hasAntecedenteCistitisRepetida: boolean;
  hasDolorEspaldaBaja: boolean;
  hasDolorPerineal: boolean;
  hasDolorProstata: boolean;
};

export type typeSymptomIVU = {
  id: string;
  description: string;
  condition: boolean;
};

export type typeTreatmentIVU = {
  id: string;
  description: string;
};

export type typeDisplayIVUSyndromeProps = {
  title: string;
  symptoms: typeSymptomIVU[];
  treatments: typeTreatmentIVU[];
  alternatives: typeTreatmentIVU[];
};
