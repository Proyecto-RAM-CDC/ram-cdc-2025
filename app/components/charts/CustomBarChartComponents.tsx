import React, { useState, useEffect } from "react";
import {
  TooltipProps,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ChartDataEntry } from "~/utilities/types";

const smallScreen = 640;
const mediumScreen = 768;

type CustomTickProps = {
  x: number;
  y: number;
  payload: {
    value: string;
    coordinate: number;
    index: number;
    offset: number;
  };
};

const getSmallScreenTicks = (tick: string) => {
  if (tick === "Hombre cisgénero") {
    tick = "Hom Cis";
  }
  if (tick === "Mujer cisgénero") {
    tick = "Muj Cis";
  }
  if (tick === "Hombre transexual") {
    tick = "Hom Trans";
  }
  if (tick === "Mujer transexual") {
    tick = "Muj Trans";
  }
  if (tick === "Persona No Binaria") {
    tick = "No Binaria";
  }
  if (tick === "Prefiere no decir") {
    tick = "No Decir";
  }
  if (tick === "Otra identidad de género") {
    tick = "Otra";
  }

  if (tick === "Indeterminado") {
    tick = "Indet.";
  }
  if (tick === "Intersex") {
    tick = "Inter.";
  }

  return tick;
};

const getMediumScreenTicks = (tick: string) => {
  if (tick === "Hombre cisgénero") {
    tick = "Hombre cis";
  }
  if (tick === "Mujer cisgénero") {
    tick = "Mujer cis";
  }
  if (tick === "Hombre transexual") {
    tick = "Hom Trans";
  }
  if (tick === "Mujer transexual") {
    tick = "Muj Trans";
  }
  if (tick === "Persona No Binaria") {
    tick = "No Binaria";
  }
  if (tick === "Prefiere no decir") {
    tick = "No Decir";
  }
  if (tick === "Otra identidad de género") {
    tick = "Otra";
  }

  if (tick === "Indeterminado") {
    tick = "Indet.";
  }
  if (tick === "Intersex") {
    tick = "Inter.";
  }

  return tick;
};

const getLargeScreenTicks = (tick: string) => {
  return tick;
};

export const CustomTick: React.FC<CustomTickProps> = ({ x, y, payload }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatTick = (tick: string) => {
    if (screenWidth < smallScreen) {
      tick = getSmallScreenTicks(tick);
    } else if (screenWidth < mediumScreen) {
      tick = getMediumScreenTicks(tick);
    } else {
      tick = getLargeScreenTicks(tick);
    }

    const maxCharsPerLine =
      screenWidth < smallScreen ? 6 : screenWidth < mediumScreen ? 6 : 10;
    const words = tick.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      if (currentLine.length + word.length <= maxCharsPerLine) {
        currentLine += `${word} `;
      } else {
        lines.push(currentLine.trim());
        currentLine = `${word} `;
      }
    });

    if (currentLine) {
      lines.push(currentLine.trim());
    }

    return lines;
  };

  const lines = formatTick(payload.value);

  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line, index) => (
        <text
          key={index}
          x={0}
          // "index * 12" adjusts vertical spacing between lines.
          // "12" is the vertical space to the X-axis.
          y={12 + index * 12}
          textAnchor="middle"
          fontSize={screenWidth < smallScreen ? "9" : "12"}
          fill="#666"
        >
          {line}
        </text>
      ))}
    </g>
  );
};

export const CustomLegend: React.FC<any> = (props) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Adjust font size based on screen width
  const fontSize = screenWidth < 600 ? "10px" : "14px";
  const legendStyle = {
    display: "flex",
    justifyContent: "center",
    fontSize: fontSize,
    gap: "10px",
    marginTop: "10px",
  };

  return (
    <div style={legendStyle}>
      {props.payload.map((entry: any, index: number) => (
        <span key={`legend-${index}`} style={{ color: entry.color }}>
          ⬤ {entry.value}
        </span>
      ))}
    </div>
  );
};

export const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
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
  const fontSize = screenWidth < 600 ? "12px" : "16px";
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
          {entry.name}: <strong>{entry.value}</strong>
        </p>
      ))}
    </div>
  );
};

export const RenderBarChart = (currentBarChartData: ChartDataEntry[]) => {
  return (
    <BarChart
      data={currentBarChartData}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="name"
        tick={(props) => <CustomTick {...props} />} // Renders an actual SVG element for each tick.
        interval={0} // If set to 0, all labels will be shown.
      />
      <YAxis
        tick={{ fontSize: 12 }}
        yAxisId="left"
        orientation="left"
        stroke="#af5178"
      />
      <YAxis
        tick={{ fontSize: 12 }}
        yAxisId="right"
        orientation="right"
        stroke="#5178af"
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend content={<CustomLegend />} />
      <Bar
        dataKey="cuenta"
        yAxisId="left"
        fill="#af5178"
        activeBar={<Rectangle stroke="blue" />}
      />
      <Bar
        dataKey="porcentaje"
        yAxisId="right"
        fill="#5178af"
        activeBar={<Rectangle stroke="blue" />}
      />
    </BarChart>
  );
};
