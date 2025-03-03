import { getAllClinicos, getAllVisitation } from "~/server/getters.server";
import {
  ChartDataObject,
  ChartMainTitlesObject,
  ChartSubTitlesObject,
  ChartServerObject,
  typeSimpleRadialChart,
  typeRadialBarServerObject,
  typeSimpleRadarServerObject,
} from "~/utilities/types";
import { Clinicos } from "@prisma/client";

// Here T can be either Visitation or Clinicos.
function countNationwideByKey<T>(
  data: T[],
  key: keyof T
): { [key: string]: number } {
  // 'key' would be 'sexonacer' for a 'Clinicos' object and 'genero' for a 'Visitation' object.
  // 'data' would be an array of either 'Clinicos' objects or 'Visitation' objects.
  // So for example, if 'data' is an array of 'Clinicos' objects, and 'key' is 'sexonacer'
  // then 'nationwideCounts' would be something like:
  // {
  //   Mujer: 15,
  //   Intersex: 11,
  //   Indeterminado: 8,
  // }
  return data.reduce<{ [key: string]: number }>((accumulator, item) => {
    const value = item[key] as string;
    if (value) {
      if (accumulator[value]) {
        accumulator[value] += 1;
      } else {
        accumulator[value] = 1;
      }
    }
    // The 'accumulator' will now contain the counts of each unique 'value' found in the array.
    return accumulator;
  }, {});
}

// Here T can be either Visitation or Clinicos.
function getUniqueLocations<T extends { location?: string }>(
  data: T[]
): string[] {
  // 'key' would be 'sexonacer' for a 'Clinicos' object and 'genero' for a 'Visitation' object.
  // 'data' would be an array of either 'Clinicos' objects or 'Visitation' objects.
  // 'uniqueLocations' would be an array of unique 'location' values (string[]).
  const uniqueLocations: string[] = [];
  data.forEach((item) => {
    if (item.location && !uniqueLocations.includes(item.location)) {
      uniqueLocations.push(item.location);
    }
  });
  return uniqueLocations;
}

// Here T can be either Visitation or Clinicos.
function countByLocationAndKey<T extends { location?: string }>(
  data: T[],
  uniqueLocations: string[],
  key: keyof T
): { [key: string]: { [key: string]: number } } {
  // 'key' would be 'sexonacer' for a 'Clinicos' object and 'genero' for a 'Visitation' object.
  // 'data' would be an array of either 'Clinicos' objects or 'Visitation' objects.
  // 'byLocationCounts' would be something like:
  // {
  //   'Ciudad de México': { 'Hombre cisgénero': 1, 'Persona No Binaria': 1 },
  //   Campeche: { 'Mujer cisgénero': 1 }
  // }
  const result: { [key: string]: { [key: string]: number } } = {};
  uniqueLocations.forEach((location) => {
    result[location] = data.reduce<{ [key: string]: number }>(
      (accumulator, item) => {
        if (item.location === location && item[key]) {
          const value = item[key] as string;
          if (accumulator[value]) {
            accumulator[value] += 1;
          } else {
            accumulator[value] = 1;
          }
        }
        return accumulator;
      },
      {}
    );
  });
  return result;
}

function createChartData<T>(
  entityNationwide: { [key: string]: number },
  data: T[]
): ChartDataObject {
  // {
  //   Nacional: [
  //     {
  //       name: 'Hombre cisgénero',
  //       cuenta: 14,
  //       porcentaje: 23.728813559322035
  //     },
  //     {
  //       name: 'Mujer cisgénero',
  //       cuenta: 10,
  //       porcentaje: 16.94915254237288
  //     },
  //     {
  //       name: 'Hombre transexual',
  //       cuenta: 8,
  //       porcentaje: 13.559322033898304
  //     }
  //   ]
  // }
  return {
    Nacional: Object.keys(entityNationwide).map((key) => {
      return {
        name: key,
        cuenta: entityNationwide[key],
        porcentaje: (entityNationwide[key] / data.length) * 100,
      };
    }),
  };
}

function addLocationDataToChart(
  chartData: ChartDataObject,
  uniqueLocations: string[],
  entityByLocation: { [key: string]: { [key: string]: number } }
): ChartDataObject {
  // {
  //   Nacional: [
  //     {
  //       name: 'Hombre cisgénero',
  //       cuenta: 14,
  //       porcentaje: 23.728813559322035
  //     },
  //     {
  //       name: 'Mujer cisgénero',
  //       cuenta: 10,
  //       porcentaje: 16.94915254237288
  //     },
  //     {
  //       name: 'Hombre transexual',
  //       cuenta: 8,
  //       porcentaje: 13.559322033898304
  //     }
  //   ],
  //   Aguascalientes: [
  //     {
  //       name: 'Hombre cisgénero',
  //       cuenta: 14,
  //       porcentaje: 23.728813559322035
  //     },
  //     {
  //       name: 'Mujer cisgénero',
  //       cuenta: 10,
  //       porcentaje: 16.94915254237288
  //     },
  //     {
  //       name: 'Hombre transexual',
  //       cuenta: 8,
  //       porcentaje: 13.559322033898304
  //     }
  //   ]
  // }
  uniqueLocations.forEach((location) => {
    const totalCount = Object.values(entityByLocation[location]).reduce(
      (sum, current) => sum + current,
      0
    );

    chartData[location] = Object.keys(entityByLocation[location]).map((key) => {
      return {
        name: key,
        cuenta: entityByLocation[location][key],
        porcentaje: (entityByLocation[location][key] / totalCount) * 100,
      };
    });
  });
  return chartData;
}

function createChartTitles(
  uniqueLocations: string[],
  mainTitle: string,
  subTitle: string
): { mainTitles: ChartMainTitlesObject; subTitles: ChartSubTitlesObject } {
  // Create a companion object whose keys are the same as those of 'chartData' and whose values
  // are the chart titles for each key.
  const chartMainTitles: ChartMainTitlesObject = {
    Nacional: mainTitle,
  };
  uniqueLocations.forEach((location) => {
    chartMainTitles[location] = mainTitle;
  });

  // Likewise for the subtitles.
  const chartSubTitles: ChartSubTitlesObject = {
    Nacional: subTitle,
  };
  uniqueLocations.forEach((location) => {
    chartSubTitles[location] = `Específicamente en ${location}`;
  });

  return { mainTitles: chartMainTitles, subTitles: chartSubTitles };
}

async function generateChartData<T extends { location?: string }>(
  fetchData: () => Promise<T[] | null>,
  key: keyof T,
  mainTitle: string,
  subTitle: string
): Promise<ChartServerObject | null> {
  const data: T[] | null = await fetchData();
  if (!data) return null;

  const nationwideCounts = countNationwideByKey(data, key);
  const uniqueLocations = getUniqueLocations(data);
  const byLocationCounts = countByLocationAndKey(data, uniqueLocations, key);

  let chartData: ChartDataObject = createChartData(nationwideCounts, data);
  chartData = addLocationDataToChart(
    chartData,
    uniqueLocations,
    byLocationCounts
  );

  const { mainTitles: chartMainTitles, subTitles: chartSubTitles } =
    createChartTitles(uniqueLocations, mainTitle, subTitle);

  let order: String[] = [];
  if (key === "sexonacer") {
    order = [
      "Hombre",
      "Mujer",
      "Intersex",
      "Indeterminado",
      "Prefiere no decir",
    ];
  }
  if (key === "genero") {
    order = [
      "Hombre cisgénero",
      "Mujer cisgénero",
      "Hombre transexual",
      "Mujer transexual",
      "Queer",
      "Persona No Binaria",
      "Otra identidad de género",
      "Prefiere no decir",
    ];
  }

  // Loop over each item in "chartData":
  for (const [key, value] of Object.entries(chartData)) {
    // Reorder the items in value array based on the defined order:
    value.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  }

  return {
    chartData,
    chartMainTitles,
    chartSubTitles,
  };
}

async function generateSimpleRadialBarChart<T extends { location?: string }>(
  fetchData: () => Promise<T[] | null>,
  key: keyof T,
  mainTitle: string,
  subTitle: string
): Promise<typeRadialBarServerObject | null> {
  const data: T[] | null = await fetchData();
  if (!data) return null;

  // {
  //   'Thu Mar 01 1990 18:00:00 GMT-0600 (Central Standard Time)': 1,
  //   'Fri Oct 02 2015 19:00:00 GMT-0500 (Central Daylight Time)': 1,
  //   'Mon Aug 11 2008 19:00:00 GMT-0500 (Central Daylight Time)': 1,
  // }
  const nationwideCounts = countNationwideByKey(data, key);
  const uniqueLocations = getUniqueLocations(data);

  let chartData: typeSimpleRadialChart = {};
  chartData["Nacional"] = [
    {
      name: "18-24",
      fill: "#8884d8",
      count: 0,
      percent: 0,
    },
    {
      name: "25-29",
      fill: "#83a6ed",
      count: 0,
      percent: 0,
    },
    {
      name: "30-34",
      fill: "#8dd1e1",
      count: 0,
      percent: 0,
    },
    {
      name: "35-39",
      fill: "#82ca9d",
      count: 0,
      percent: 0,
    },
    {
      name: "40-49",
      fill: "#a4de6c",
      count: 0,
      percent: 0,
    },
    {
      name: "50+",
      fill: "#d0ed57",
      count: 0,
      percent: 0,
    },
    {
      name: "n/a",
      fill: "#ffc658",
      count: 0,
      percent: 0,
    },
  ];

  const currentYear = new Date().getFullYear();

  Object.keys(nationwideCounts).forEach((key) => {
    const date = new Date(key);
    const age = currentYear - date.getFullYear();

    if (isNaN(age)) {
      chartData["Nacional"][0]["count"] += nationwideCounts[key];
    } else if (age >= 18 && age <= 24) {
      chartData["Nacional"][1]["count"] += nationwideCounts[key];
    } else if (age >= 25 && age <= 29) {
      chartData["Nacional"][2]["count"] += nationwideCounts[key];
    } else if (age >= 30 && age <= 34) {
      chartData["Nacional"][3]["count"] += nationwideCounts[key];
    } else if (age >= 35 && age <= 39) {
      chartData["Nacional"][4]["count"] += nationwideCounts[key];
    } else if (age >= 40 && age <= 49) {
      chartData["Nacional"][5]["count"] += nationwideCounts[key];
    } else if (age >= 50) {
      chartData["Nacional"][6]["count"] += nationwideCounts[key];
    } else {
      chartData["Nacional"][0]["count"] += nationwideCounts[key];
    }
  });

  chartData["Nacional"].forEach((item) => {
    item.percent = (item.count / data.length) * 100;
  });

  const { mainTitles: chartMainTitles, subTitles: chartSubTitles } =
    createChartTitles(uniqueLocations, mainTitle, subTitle);

  return {
    chartData,
    chartMainTitles,
    chartSubTitles,
  };
}

export const barChartGeneroCount = () =>
  generateChartData(
    getAllVisitation,
    "genero",
    "Total y Porcentaje de 'Identificación de Género'",
    "A nivel nacional"
  );

export const radarChartGenero = () =>
  generateChartData(
    getAllVisitation,
    "genero",
    "Total y Porcentaje de 'Identificación de Género'",
    "A nivel nacional"
  );

export const barChartSexoNacerCount = () =>
  generateChartData(
    getAllClinicos,
    "sexonacer",
    "Total y Porcentaje de 'Sexo al Nacer'",
    "A nivel nacional"
  );

export const barChartDOBCount = () =>
  generateSimpleRadialBarChart(
    getAllClinicos,
    "dob",
    "Total y Porcentaje de 'Fecha de Nacimiento'",
    "A nivel nacional"
  );

export const simpleRadarChart = () =>
  generateSimpleRadarChart(
    "Total y Porcentaje de 'Indígena y Afrodescendiente'",
    "A nivel nacional"
  );

async function generateSimpleRadarChart(
  mainTitle: string,
  subTitle: string
): Promise<typeSimpleRadarServerObject | null> {
  const data: (Omit<Clinicos, "location"> & { location?: string })[] | null =
    await getAllClinicos();
  if (!data) return null;

  const countIndigenousAfrodescendant = {
    yesIndigenousYesAfrodescendant: 0,
    yesIndigenousNoAfrodescendant: 0,
    noIndigenousYesAfrodescendant: 0,
    noIndigenousNoAfrodescendant: 0,
  };

  // Iterate over each item in 'data'.
  data.forEach((item) => {
    if (item.indigenous && item.afrodescendant) {
      countIndigenousAfrodescendant.yesIndigenousYesAfrodescendant += 1;
    } else if (item.indigenous && !item.afrodescendant) {
      countIndigenousAfrodescendant.yesIndigenousNoAfrodescendant += 1;
    } else if (!item.indigenous && item.afrodescendant) {
      countIndigenousAfrodescendant.noIndigenousYesAfrodescendant += 1;
    } else {
      countIndigenousAfrodescendant.noIndigenousNoAfrodescendant += 1;
    }
  });

  // Number of patients.
  const nationwideCountPatients = data.length;

  const chartData = [
    {
      name: "Indígena y Afrodescendiente",
      count: countIndigenousAfrodescendant.yesIndigenousYesAfrodescendant,
      percent:
        (countIndigenousAfrodescendant.yesIndigenousYesAfrodescendant /
          nationwideCountPatients) *
        100,
    },
    {
      name: "Indígena, No Afrodescendiente",
      count: countIndigenousAfrodescendant.yesIndigenousNoAfrodescendant,
      percent:
        (countIndigenousAfrodescendant.yesIndigenousNoAfrodescendant /
          nationwideCountPatients) *
        100,
    },
    {
      name: "Afrodescendiente, No Indígena",
      count: countIndigenousAfrodescendant.noIndigenousYesAfrodescendant,
      percent:
        (countIndigenousAfrodescendant.noIndigenousYesAfrodescendant /
          nationwideCountPatients) *
        100,
    },
    {
      name: "No Indígena y No Afrodescendiente",
      count: countIndigenousAfrodescendant.noIndigenousNoAfrodescendant,
      percent:
        (countIndigenousAfrodescendant.noIndigenousNoAfrodescendant /
          nationwideCountPatients) *
        100,
    },
  ];

  const uniqueLocations = getUniqueLocations(data);
  const { mainTitles: chartMainTitles, subTitles: chartSubTitles } =
    createChartTitles(uniqueLocations, mainTitle, subTitle);

  return {
    chartData,
    chartMainTitles,
    chartSubTitles,
  };
}
