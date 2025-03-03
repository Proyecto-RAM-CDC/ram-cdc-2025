// "_app.analyse.tsx". A route that displays two bar charts side by side.
import DOBBarCharts from "~/components/charts/DOBBarCharts";
import SimpleRadarChart from "~/components/charts/SimpleRadarChart";
import SimplePieChart from "~/components/charts/SimplePieChart";
import { useLoaderData } from "@remix-run/react";
import { ChartsData } from "~/utilities/types";

const DemographicCharts: React.FC = () => {
  const data = useLoaderData<ChartsData>();

  return (
    <>
      <DOBBarCharts data={data} />
      <SimpleRadarChart data={data} />
      <SimplePieChart data={data} />
    </>
  );
};

export default DemographicCharts;
