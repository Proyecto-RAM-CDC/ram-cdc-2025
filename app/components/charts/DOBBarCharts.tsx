// "_app.analyse.tsx". A route that displays two bar charts side by side.
import SimpleRadialBarChart from "~/components/charts/SimpleRadialBarChart";
import { ChartsData } from "~/utilities/types";

type typeProps = {
  data: ChartsData;
};

const DOBBarCharts: React.FC<typeProps> = ({ data }) => {
  return (
    <SimpleRadialBarChart data={data} className="col-span-6 col-start-1" />
  );
};

export default DOBBarCharts;
