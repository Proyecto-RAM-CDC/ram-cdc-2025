import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { ChartsData } from "~/utilities/types";

type typeProps = {
  data: ChartsData;
  className: string;
};

const SimpleRadialBarChart: React.FC<typeProps> = (props) => {
  const chartData = props?.data?.radialBarChart?.chartData.Nacional;

  if (!chartData) {
    console.error("Datos del gráfico no válidos");
    return null;
  }

  const adhocClassName = props.className ? props.className : "";
  const currentChartMainTitle = props?.data?.radialBarChart?.chartMainTitles
    ? props?.data?.radialBarChart?.chartMainTitles.Nacional
    : "";
  const currentChartSubTitle = props?.data?.radialBarChart?.chartSubTitles
    ? props?.data?.radialBarChart?.chartSubTitles.Nacional
    : "";

  const style = {
    top: "50%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
  };

  const getIntroOfPage = (label: number) => {
    if (label === 0) {
      return "Grupo de edad: 18-24";
    }
    if (label === 1) {
      return "Grupo de edad: 25-29";
    }
    if (label === 2) {
      return "Grupo de edad: 30-34";
    }
    if (label === 3) {
      return "Grupo de edad: 35-39";
    }
    if (label === 4) {
      return "Grupo de edad: 40-49";
    }
    if (label === 5) {
      return "Grupo de edad: 50+";
    }
    if (label === 6) {
      return "Grupo de edad: n/a";
    }
    return "";
  };
  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="border-t border-r border-b border-l border-primary bg-white p-1 text-xs text-primary">
          <p className="font-medium">{getIntroOfPage(label)}</p>
          <p>{`Count: ${payload[0].payload.count} (${parseFloat(
            payload[0].payload.percent
          ).toFixed(2)}%)`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`barchart h-[36rem] max-w-7xl border-2 border-secondary overflow-auto flex flex-col items-stretch rounded-lg ${adhocClassName}`}
    >
      <h2 className="mt-1 text-center w-full font-semibold">
        {currentChartMainTitle}
      </h2>{" "}
      <h3 className="mb-4 text-center w-full font-normal text-sm">
        {currentChartSubTitle}
      </h3>{" "}
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="12%"
          outerRadius="95%"
          startAngle={0}
          endAngle={360}
          barSize={12}
          data={chartData}
        >
          <RadialBar
            label={{
              position: "insideStart",
              fill: "#000",
              fontSize: "12px",
              fontWeight: "bold",
            }}
            background
            dataKey="count"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={style}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleRadialBarChart;
