// "_app.analyse.tsx". A route that displays two bar charts side by side.
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { ChartsData } from "~/utilities/types";

type typeProps = {
  data: ChartsData;
};

const SimpleRadarChart: React.FC<typeProps> = ({ data }) => {
  const chartData = data?.radarIndigAfroChart?.chartData;

  if (!chartData) {
    console.error("Datos del gráfico no válidos");
    return null;
  }

  const adhocClassName = "col-span-6 col-start-1";
  const currentChartMainTitle = data?.radialBarChart?.chartMainTitles
    ? data?.radialBarChart?.chartMainTitles.Nacional
    : "";
  const currentChartSubTitle = data?.radialBarChart?.chartSubTitles
    ? data?.radialBarChart?.chartSubTitles.Nacional
    : "";

  const renderCustomTicks = (props: any) => {
    const { x, y, payload } = props;
    return (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        fontSize={12}
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {payload.value}
      </text>
    );
  };

  const renderCustomLabel = (props: {
    x: number;
    y: number;
    payload: {
      coordinate: number;
      index: number;
      offset: number;
      value: string;
    };
  }) => {
    const { x, y, payload } = props;
    const maxLength = 10; // Maximum number of characters per line
    const words = payload.value.split(" ");
    let lines = [""];
    let currentLine = 0;
    const offset = 20; // Adjust to move the labels further from the chart.

    words.forEach((word: string) => {
      if ((lines[currentLine] + word).length > maxLength) {
        currentLine++;
        lines[currentLine] = "";
      }
      lines[currentLine] += (lines[currentLine] ? " " : "") + word;
    });

    return (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        fontSize={12}
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {lines.map((line, index) => (
          <tspan x={x + offset} dy={index === 0 ? 0 : 14} key={index}>
            {line}
          </tspan>
        ))}
      </text>
    );
  };

  return (
    <div
      className={`barchart h-[36rem] max-w-7xl border-2 border-secondary overflow-auto flex flex-col items-stretch rounded-lg ${adhocClassName}`}
    >
      {" "}
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" tick={renderCustomLabel} />
          <PolarRadiusAxis tickCount={10} tick={renderCustomTicks} />
          <Radar
            dataKey="percent"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleRadarChart;
