import { ResponsiveContainer } from "recharts";
import { RenderBarChart } from "~/components/charts/CustomBarChartComponents";
import {
  ChartDataObject,
  ChartDataEntry,
  ChartMainTitlesObject,
  ChartSubTitlesObject,
  ChartsData,
} from "~/utilities/types";

interface IProps {
  className: string;
  data: ChartsData;
  setCurrentBarSexoNacerChartData: React.Dispatch<
    React.SetStateAction<ChartDataEntry[] | null>
  >;
  setCurrentSexoNacerMainTitle: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  setCurrentSexoNacerSubTitle: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  currentSexoNacerMainTitle: string;
  currentSexoNacerSubTitle: string;
  currentBarSexoNacerChartData: ChartDataEntry[];
}

const handleStateChange = (
  data: ChartsData,
  setCurrentBarSexoNacerChartData: React.Dispatch<
    React.SetStateAction<ChartDataEntry[] | null>
  >,
  setCurrentSexoNacerMainTitle: React.Dispatch<
    React.SetStateAction<string | null>
  >,
  setCurrentSexoNacerSubTitle: React.Dispatch<
    React.SetStateAction<string | null>
  >,
  chartKey: "barChart" | "radarChart" | "barChartSexoNacer",
  selectedState: string
) => {
  // 'chartKey' will be one of 'barChart', 'radarChart', etc., thereby matching the possible
  // keys of the 'ChartsData' object.
  const key = chartKey;
  const chartType: {
    chartData: ChartDataObject;
    chartMainTitles: ChartMainTitlesObject;
    chartSubTitles: ChartSubTitlesObject;
  } | null = data[key];

  const chartMainTitles: ChartMainTitlesObject | null = chartType
    ? chartType.chartMainTitles
    : null;

  const chartSubTitles: ChartSubTitlesObject | null = chartType
    ? chartType.chartSubTitles
    : null;

  if (chartKey === "barChartSexoNacer" && chartType?.chartData) {
    setCurrentBarSexoNacerChartData(chartType.chartData[selectedState]);
  }

  if (chartMainTitles && chartSubTitles) {
    setCurrentSexoNacerMainTitle(chartMainTitles[selectedState]);
  }

  if (chartMainTitles && chartSubTitles) {
    setCurrentSexoNacerSubTitle(chartSubTitles[selectedState]);
  }
};

const BarChartSexoNacer: React.FC<IProps> = (props) => {
  const data: ChartsData = props.data;
  const setCurrentBarSexoNacerChartData: React.Dispatch<
    React.SetStateAction<ChartDataEntry[] | null>
  > = props.setCurrentBarSexoNacerChartData;
  const setCurrentSexoNacerMainTitle: React.Dispatch<
    React.SetStateAction<string | null>
  > = props.setCurrentSexoNacerMainTitle;
  const setCurrentSexoNacerSubTitle: React.Dispatch<
    React.SetStateAction<string | null>
  > = props.setCurrentSexoNacerSubTitle;

  return (
    <div
      className={`barchart h-[36rem] max-w-7xl border-2 border-secondary overflow-hidden flex flex-col items-stretch rounded-md ${props.className}`}
    >
      <div className="dropdown mt-1 ml-1">
        <button className="btn btn-primary btn-xs text-primary-content">
          Clic
        </button>
        <ul className="dropdown-content menu menu-xs bg-secondary text-secondary-content rounded-box z-[1] w-52 p-1 shadow max-h-60 overflow-y-auto">
          {
            // Loop over the keys of the 'chartData' object and create a button for each key.
            data.barChartSexoNacer?.chartData ? (
              Object.keys(data.barChartSexoNacer.chartData)
                .sort()
                .map((key) => (
                  <li key={key}>
                    <button
                      onClick={() =>
                        handleStateChange(
                          data,
                          setCurrentBarSexoNacerChartData,
                          setCurrentSexoNacerMainTitle,
                          setCurrentSexoNacerSubTitle,
                          "barChartSexoNacer",
                          key
                        )
                      }
                    >
                      {key}
                    </button>
                  </li>
                ))
            ) : (
              <></>
            )
          }
        </ul>
      </div>
      <h2 className="mt-1 text-center w-full text-xs sm:text-base font-semibold">
        {props.currentSexoNacerMainTitle}
      </h2>{" "}
      <h3 className="mb-4 text-center w-full text-xs sm:text-sm font-normal">
        {props.currentSexoNacerSubTitle}
      </h3>{" "}
      <ResponsiveContainer width="100%" height="100%">
        {data.barChart?.chartData && props.currentBarSexoNacerChartData ? (
          RenderBarChart(props.currentBarSexoNacerChartData)
        ) : (
          <div>No hay datos disponibles.</div>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartSexoNacer;
