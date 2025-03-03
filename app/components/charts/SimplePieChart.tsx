// "_app.analyse.tsx". A route that displays two bar charts side by side.
import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Legend,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { ChartsData } from "~/utilities/types";

type typeProps = {
  data: ChartsData;
};

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Track screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!active || !payload || payload.length === 0) return null;

  // Adjust styles dynamically
  const fontSize = screenWidth < 600 ? "10px" : "12px";
  const padding = screenWidth < 600 ? "5px" : "10px";
  const tooltipStyle = {
    backgroundColor: "white",
    border: "1px solid #ddd",
    padding: padding,
    borderRadius: "4px",
    fontSize: fontSize,
    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
  };

  return (
    <div style={tooltipStyle}>
      <p style={{ fontWeight: "bold", margin: 0 }}>{label}</p>
      {payload.map((entry, index) => (
        <p key={index} style={{ color: entry.color, margin: "5px 0 0" }}>
          {entry.name}: <strong>{entry.value?.toFixed(2)}%</strong>
        </p>
      ))}
    </div>
  );
};

const SimplePieChart: React.FC<typeProps> = ({ data }) => {
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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${percent.toFixed(0)}%`}
      </text>
    );
  };

  const style = {
    top: "50%",
    right: 0,
    transform: "translate(-20%, -50%)",
    lineHeight: "24px",
    fontSize: "0.8rem",
  };

  return (
    <div
      className={`barchart h-[36rem] max-w-7xl border-2 border-secondary overflow-auto flex flex-col items-stretch rounded-lg ${adhocClassName}`}
    >
      {" "}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            cx="30%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            innerRadius={20}
            outerRadius={100}
            fill="#8884d8"
            dataKey="percent"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={style}
          />
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimplePieChart;
