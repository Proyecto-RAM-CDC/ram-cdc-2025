// "app/routes/_app.analyse.tsx".
// A route module that provides data for the analysis section of the application.
import { useState } from "react";
import { useRouteError, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { requireUserSession } from "~/server/auth.server";
import {
  barChartGeneroCount,
  radarChartGenero,
  barChartSexoNacerCount,
  barChartDOBCount,
  simpleRadarChart,
} from "~/server/charting.server";
import GenderBarCharts from "~/components/charts/GenderBarCharts";
import DemographicCharts from "~/components/charts/DemographicCharts";
import { getAllStates, getGeoJsonByState } from "~/server/getters.server";
import { ErrorBody } from "~/utilities/ErrorBody";
import { ChartsData } from "~/utilities/types";
import {
  State,
  ChartServerObject,
  typeRadialBarServerObject,
  typeSimpleRadarServerObject,
} from "~/utilities/types";
import { StateGeoJson } from "@prisma/client";
import Mapping from "~/components/charts/Mapping";

export default function AnalysisMode() {
  const [geoJson, setGeoJson] = useState(null);
  const [selectedTab, setSelectedTab] = useState("tab1");

  const loaderData = useLoaderData<ChartsData>();
  return (
    <div role="tablist" className="tabs tabs-lifted">
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab text-xs sm:text-sm lg:text-base"
        aria-label="Sexualidad y Género"
        onChange={() => setSelectedTab("tab1")}
        defaultChecked
      />
      {selectedTab === "tab1" && (
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box sm:p-6 mx-2 sm:mx-4 md:mx-6 my-12 grid grid-cols-12 justify-start items-start"
        >
          <GenderBarCharts />
        </div>
      )}

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab text-xs sm:text-sm lg:text-base"
        aria-label="Cartografía"
        onChange={() => setSelectedTab("tab2")}
      />
      {selectedTab === "tab2" && (
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6 mx-6 my-12 grid grid-cols-12 justify-start items-start"
        >
          <Mapping
            stateList={loaderData.stateList}
            geoJson={geoJson}
            setGeoJson={setGeoJson}
          />
        </div>
      )}

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab text-xs sm:text-sm lg:text-base"
        aria-label="Demografía"
        onChange={() => setSelectedTab("tab3")}
      />
      {selectedTab === "tab3" && (
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6 mx-6 my-12 grid grid-cols-12 justify-start items-start"
        >
          <DemographicCharts />
        </div>
      )}
    </div>
  );
}

// Runs on the server only.
// Runs for GET requests made to the route. But runs after any action functions (if any).
// On the initial server render, it will provide data to the HTML document.
// On navigations in the browser, Remix will call the function via fetch from the browser.
export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserSession(request);

  const url = new URL(request.url);
  const estado = url.searchParams.get("estado");

  try {
    if (estado) {
      const geoData: StateGeoJson = await getGeoJsonByState(estado);
      return Response.json(geoData.geoJson);
    }

    const stateList: State[] = await getAllStates();
    const barChartData: ChartServerObject = await barChartGeneroCount();
    const radarChartData: ChartServerObject = await radarChartGenero();
    const barChartSexoNacerData: ChartServerObject =
      await barChartSexoNacerCount();
    const radialBarChartData: typeRadialBarServerObject =
      await barChartDOBCount();
    const radarIndigAfroChartData: typeSimpleRadarServerObject =
      await simpleRadarChart();

    const data: ChartsData = {
      barChart: barChartData,
      radarChart: radarChartData,
      barChartSexoNacer: barChartSexoNacerData,
      radialBarChart: radialBarChartData,
      radarIndigAfroChart: radarIndigAfroChartData,
      stateList: stateList,
    };

    return Response.json(data);
  } catch (error) {
    throw new Error("Error al obtener datos.");
  }
}

// All errors for this route will be caught by this ErrorBoundary.
export function ErrorBoundary() {
  // To obtain the thrown object, we use the 'useRouteError' hook.
  const error = useRouteError();

  return (
    <ErrorBody
      error={error}
      routetext="_app.analyse.tsx"
      className="col-start-1 col-span-12 my-3 pt-1 pb-2 px-2 border-2 border-dashed border-primary-content rounded-md text-primary-content text-xs sm:text-sm md:text-base lg:text-lg"
    />
  );
}
