// "_app.analyse.tsx". A route that displays two bar charts side by side.
import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import BarChartGenero from "~/components/charts/BarChartGenero";
import BarChartSexoNacer from "~/components/charts/BarChartSexoNacer";
import { ChartsData } from "~/utilities/types";

const BarChart: React.FC = () => {
  const data = useLoaderData<ChartsData>();

  // --------------------------------------------------------------
  // For the bar chart of 'genero' values only.
  // Initial state - set it to the nationwide frequency counts.
  const [currentBarGeneroChartData, setCurrentBarGeneroChartData] = useState(
    data ? (data.barChart ? data.barChart.chartData.Nacional : null) : null
  );
  // Initialize to nationwide titles.
  const [currentChartMainTitle, setCurrentChartMainTitle] = useState(
    data
      ? data.barChart
        ? data.barChart.chartMainTitles.Nacional
        : null
      : null
  );

  // Initialize to nationwide subtitles.
  const [currentChartSubTitle, setCurrentChartSubTitle] = useState(
    data ? (data.barChart ? data.barChart.chartSubTitles.Nacional : null) : null
  );
  // --------------------------------------------------------------

  // --------------------------------------------------------------
  // For the bar chart of 'sexonacer' values only.
  // Initial state - set it to the nationwide frequency counts.
  const [currentBarSexoNacerChartData, setCurrentBarSexoNacerChartData] =
    useState(
      data
        ? data.barChartSexoNacer
          ? data.barChartSexoNacer.chartData.Nacional
          : null
        : null
    );
  // Initialize to nationwide titles.
  const [currentSexoNacerMainTitle, setCurrentSexoNacerMainTitle] = useState(
    data
      ? data.barChartSexoNacer
        ? data.barChartSexoNacer.chartMainTitles.Nacional
        : null
      : null
  );
  // Initialize to nationwide subtitles.
  const [currentSexoNacerSubTitle, setCurrentSexoNacerSubTitle] = useState(
    data
      ? data.barChartSexoNacer
        ? data.barChartSexoNacer.chartSubTitles.Nacional
        : null
      : null
  );
  // --------------------------------------------------------------
  return (
    <>
      <div className="col-span-12 md:col-span-3 col-start-1 flex items-center text-xs sm:text-sm text-justify border-2 border-secondary rounded-md p-1 mb-1 md:mr-3 md:-ml-3">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi soluta
          at distinctio! Suscipit delectus minima fugiat, dolor assumenda rem
          consectetur eveniet alias, cumque sint accusantium tempore pariatur.
          Voluptatibus, illum quia?
        </p>
      </div>
      <BarChartSexoNacer
        className="col-span-12 md:col-span-9 col-start-1 md:col-start-4"
        data={data}
        setCurrentBarSexoNacerChartData={setCurrentBarSexoNacerChartData}
        setCurrentSexoNacerMainTitle={setCurrentSexoNacerMainTitle}
        setCurrentSexoNacerSubTitle={setCurrentSexoNacerSubTitle}
        currentBarSexoNacerChartData={currentBarSexoNacerChartData ?? []}
        currentSexoNacerMainTitle={currentSexoNacerMainTitle ?? ""}
        currentSexoNacerSubTitle={currentSexoNacerSubTitle ?? ""}
      />
      <div className="col-span-12 md:col-span-3 col-start-1 flex items-center text-xs sm:text-sm text-justify border-2 border-secondary rounded-md p-1 mb-1 mt-4 md:mr-3 md:-ml-3">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi soluta
          at distinctio! Suscipit delectus minima fugiat, dolor assumenda rem
          consectetur eveniet alias, cumque sint accusantium tempore pariatur.
          Voluptatibus, illum quia?
        </p>
      </div>
      <BarChartGenero
        className="col-span-12 md:col-span-9 col-start-1 md:col-start-4 md:mt-4"
        data={data}
        setCurrentBarGeneroChartData={setCurrentBarGeneroChartData}
        setCurrentChartMainTitle={setCurrentChartMainTitle}
        setCurrentChartSubTitle={setCurrentChartSubTitle}
        currentBarGeneroChartData={currentBarGeneroChartData ?? []}
        currentChartMainTitle={currentChartMainTitle ?? ""}
        currentChartSubTitle={currentChartSubTitle ?? ""}
      />
    </>
  );
};

export default BarChart;
