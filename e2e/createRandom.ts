import { faker } from "@faker-js/faker";

const list_of_countries: {
  weight: number;
  value: string;
}[] = [
  { weight: 0.004, value: "Albania" },
  { weight: 0.004, value: "Alemania" },
  { weight: 0.01, value: "Argentina" },
  { weight: 0.002, value: "Austria" },
  { weight: 0.03, value: "Belice" },
  { weight: 0.006, value: "Bielorrusia" },
  { weight: 0.012, value: "Bolivia" },
  { weight: 0.004, value: "Bosnia y Herzegovina" },
  { weight: 0.02, value: "Brasil" },
  { weight: 0.004, value: "Bulgaria" },
  { weight: 0.01, value: "Canadá" },
  { weight: 0.004, value: "China" },
  { weight: 0.002, value: "Chipre" },
  { weight: 0.0414, value: "Colombia" },
  { weight: 0.016, value: "Costa Rica" },
  { weight: 0.004, value: "Croacia" },
  { weight: 0.0414, value: "Cuba" },
  { weight: 0.002, value: "Dinamarca" },
  { weight: 0.0614, value: "El Salvador" },
  { weight: 0.002, value: "Estonia" },
  { weight: 0.01, value: "España" },
  { weight: 0.002, value: "Eslovaquia" },
  { weight: 0.002, value: "Eslovenia" },
  { weight: 0.1, value: "Estados Unidos" },
  { weight: 0.002, value: "Finlandia" },
  { weight: 0.004, value: "Francia" },
  { weight: 0.004, value: "Grecia" },
  { weight: 0.0814, value: "Guatemala" },
  { weight: 0.002, value: "Guayana Francesa" },
  { weight: 0.006, value: "Guyana" },
  { weight: 0.0614, value: "Haití" },
  { weight: 0.0614, value: "Honduras" },
  { weight: 0.002, value: "Irlanda" },
  { weight: 0.002, value: "Islandia" },
  { weight: 0.004, value: "Italia" },
  { weight: 0.01, value: "Jamaica" },
  { weight: 0.002, value: "Japón" },
  { weight: 0.002, value: "Kosovo" },
  { weight: 0.002, value: "Letonia" },
  { weight: 0.002, value: "Lituania" },
  { weight: 0.002, value: "Luxemburgo" },
  { weight: 0.002, value: "Macedonia del Norte" },
  { weight: 0.002, value: "Malta" },
  { weight: 0.004, value: "Moldavia" },
  { weight: 0.002, value: "Montenegro" },
  { weight: 0.0514, value: "Nicaragua" },
  { weight: 0.002, value: "Noruega" },
  { weight: 0.004, value: "Países Bajos" },
  { weight: 0.016, value: "Panamá" },
  { weight: 0.01, value: "Paraguay" },
  { weight: 0.0314, value: "Perú" },
  { weight: 0.004, value: "Polonia" },
  { weight: 0.002, value: "Portugal" },
  { weight: 0.02, value: "Puerto Rico" },
  { weight: 0.006, value: "Reino Unido" },
  { weight: 0.004, value: "República Checa" },
  { weight: 0.0254, value: "República Dominicana" },
  { weight: 0.004, value: "Rumania" },
  { weight: 0.01, value: "Rusia" },
  { weight: 0.004, value: "Serbia" },
  { weight: 0.002, value: "Suecia" },
  { weight: 0.004, value: "Surinam" },
  { weight: 0.004, value: "Suiza" },
  { weight: 0.004, value: "Trinidad y Tobago" },
  { weight: 0.02, value: "Turquía" },
  { weight: 0.01, value: "Ucrania" },
  { weight: 0.016, value: "Uruguay" },
  { weight: 0.0914, value: "Venezuela" },
] as const;

export interface typeRandomData {
  randomEmail: string;
  randomPassword: string;
  randomFirstName: string;
  randomLastName: string;
  randomLicense: string;
  randomState: string;
  randomInstitution: string;
  randomCURP: string;
  randomYesNoStatic: string;
  randomYesNoDynamic: () => string;
  randomDateInPast: Date;
  randomPeso: string;
  randomTalla: string;
  randomSexoNacer: string;
  randomGenero: string;
  migrationCountries: string[];
  randomPrimary: string;
  EDASSecondaryConditions: string[];
  randomEvacuaciones: string;
  randomVomitos: string;
}

type typeRandomGenero =
  | "Prefiere no decir"
  | "Hombre cisgénero"
  | "Mujer cisgénero"
  | "Hombre transexual"
  | "Mujer transexual"
  | "Queer"
  | "Persona No Binaria"
  | "Otra identidad de género";

type typeStates =
  | "Aguascalientes"
  | "Baja California"
  | "Baja California Sur"
  | "Campeche"
  | "Chiapas"
  | "Chihuahua"
  | "Ciudad de México"
  | "Coahuila"
  | "Colima"
  | "Durango"
  | "Estado de México"
  | "Guanajuato"
  | "Guerrero"
  | "Hidalgo"
  | "Jalisco"
  | "Michoacán"
  | "Morelos"
  | "Nayarit"
  | "Nuevo León"
  | "Oaxaca"
  | "Puebla"
  | "Querétaro"
  | "Quintana Roo"
  | "San Luis Potosí"
  | "Sinaloa"
  | "Sonora"
  | "Tabasco"
  | "Tamaulipas"
  | "Tlaxcala"
  | "Veracruz"
  | "Yucatán"
  | "Zacatecas";

type typeSpecialCharacters = "@" | "$" | "!" | "%" | "*" | "?" | "&";

type typeSexoNacer =
  | "Hombre"
  | "Mujer"
  | "Intersex"
  | "Indeterminado"
  | "Prefiere no decir";

type typePrimary = "IVU" | "ITS" | "IRAS" | "EDAS";

export const createRandom = (): typeRandomData => {
  const randomEmail: string = faker.internet.email();
  const randomUppercase: string = faker.string.alpha({
    length: 1,
    casing: "upper",
  });
  const randomLowercase: string = faker.string.alpha({
    length: 1,
    casing: "lower",
  });
  const randomDigit: string = faker.string.numeric(1);
  const randomSpecial: typeSpecialCharacters = faker.helpers.arrayElement([
    "@",
    "$",
    "!",
    "%",
    "*",
    "?",
    "&",
  ]);
  const randomExtra: string = faker.string.alphanumeric({
    length: faker.number.int({ min: 3, max: 10 }),
  });
  const randomPassword: string = faker.helpers
    .shuffle([
      randomUppercase,
      randomLowercase,
      randomDigit,
      randomSpecial,
      ...randomExtra,
    ])
    .join("");
  const randomFirstName: string = faker.person.firstName();
  const randomLastName: string = faker.person.lastName();
  const randomLicense: string = faker.string.numeric({
    length: { min: 5, max: 7 },
  });
  const randomState: typeStates = faker.helpers.arrayElement([
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Ciudad de México",
    "Coahuila",
    "Colima",
    "Durango",
    "Estado de México",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Michoacán",
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
    "Veracruz",
    "Yucatán",
    "Zacatecas",
  ]);
  const randomInstitution: string = faker.company.name();

  const random4Chars: string = faker.string.alpha({
    length: 4,
    casing: "upper",
  });
  const random6Chars: string = faker.string.alpha({
    length: 6,
    casing: "upper",
  });
  const random6Digits: string = faker.string.numeric({ length: 6 });
  const random2Digits: string = faker.string.numeric({ length: 2 });
  const randomCURP: string = [
    random4Chars,
    random6Digits,
    random6Chars,
    random2Digits,
  ].join("");

  const randomYesNoStatic: "Sí" | "No" = faker.helpers.arrayElement([
    "Sí",
    "No",
  ]);

  const today: Date = new Date();

  let randomDateInPast: Date;
  if (randomYesNoStatic === "Sí") {
    randomDateInPast = faker.date.past({
      years: faker.number.int({ min: 1, max: 100 }), // Random date between 1 and 100 years ago.
      refDate: today,
    });
  } else {
    randomDateInPast = faker.date.recent({
      days: faker.number.int({ min: 1, max: 365 }), // Random date between 1 and 365 days ago.
      refDate: today,
    });
  }

  const randomPeso: string = String(
    faker.number.float({ min: 0.4, max: 100.0, fractionDigits: 2 })
  );
  const randomTalla: string = String(faker.number.int({ min: 15, max: 200 }));

  const randomSexoNacer: typeSexoNacer = faker.helpers.arrayElement([
    "Hombre",
    "Mujer",
    "Intersex",
    "Indeterminado",
    "Prefiere no decir",
  ]);

  const randomGenero: typeRandomGenero = faker.helpers.arrayElement([
    "Hombre cisgénero",
    "Mujer cisgénero",
    "Hombre transexual",
    "Mujer transexual",
    "Queer",
    "Persona No Binaria",
    "Otra identidad de género",
    "Prefiere no decir",
  ]);

  const randomMigrationNumber: number = faker.number.int({ min: 1, max: 4 });

  const setMigrationCountries: Set<string> = new Set();
  // Loop to get random countries. Avoid duplicates but ensures the number of countries
  // selected is the same as randomMigrationNumber.
  while (setMigrationCountries.size < randomMigrationNumber) {
    const country = faker.helpers.weightedArrayElement(list_of_countries);
    setMigrationCountries.add(country);
  }
  // Convert set to array
  const migrationCountries: string[] = Array.from(
    setMigrationCountries
  ) as string[];

  const randomPrimary: typePrimary = faker.helpers.arrayElement([
    "IVU",
    "ITS",
    "IRAS",
    "EDAS",
  ]);

  const list_of_EDAS_conditions = [
    "Disentería - Sospecha de enfermedad por Shigella sp. o presenta fiebre, dolor, y sangre en heces. - Sospecha de enfermedad por Shigella sp. o presenta fiebre, dolor, y sangre en heces.",
    "Fiebre - Temperatura corporal elevada a más de 38℃.",
    "Dolor abdominal tipo cólico o tenesmo - Dolor abdominal tipo cólico o tenesmo.",
    "Diarrea - Cuántas evacuaciones en 24 horas.",
    "Sangre en heces - Con más de 3 evacuaciones.",
    "Vómito - Cuántos vómitos en 24 horas.",
    "Signos o síntomas de deshidratación - Con mucosas secas u ojos hundidos.",
    "Ninguno(a) - No se muestra ninguno de los síntomas anteriores.",
  ];
  const randomEDASNumber = faker.number.int({ min: 1, max: 7 });
  const setEDASChoices = new Set();
  // Loop to get random EDAS. Avoid duplicates but ensures the number of EDAS conditions
  // selected is the same as randomEDASNumber.
  while (setEDASChoices.size < randomEDASNumber) {
    setEDASChoices.add(faker.helpers.arrayElement(list_of_EDAS_conditions));
  }
  const EDASSecondaryConditions = Array.from(setEDASChoices) as string[];

  const randomEvacuaciones = String(faker.number.int({ min: 1, max: 20 }));
  const randomVomitos = String(faker.number.int({ min: 1, max: 20 }));

  return {
    randomEmail,
    randomPassword,
    randomFirstName,
    randomLastName,
    randomLicense,
    randomState,
    randomInstitution,
    randomCURP,
    randomYesNoStatic,
    randomYesNoDynamic: () => faker.helpers.arrayElement(["Sí", "No"]),
    randomDateInPast,
    randomPeso,
    randomTalla,
    randomSexoNacer,
    randomGenero,
    migrationCountries,
    randomPrimary,
    EDASSecondaryConditions,
    randomEvacuaciones,
    randomVomitos,
  };
};
