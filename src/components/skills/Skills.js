import React from "react";
import { ResponsiveBar } from "@nivo/bar";

export default function Skills() {
  return (
    <ResponsiveBar
      data={data}
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
}

const data = [
  {
    country: "AD",
    "hot dog": 112,
    "hot dogColor": "hsl(128, 70%, 50%)",
    burger: 134,
    burgerColor: "hsl(254, 70%, 50%)",
    sandwich: 9,
    sandwichColor: "hsl(89, 70%, 50%)",
    kebab: 196,
    kebabColor: "hsl(116, 70%, 50%)",
    fries: 197,
    friesColor: "hsl(347, 70%, 50%)",
    donut: 120,
    donutColor: "hsl(50, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 73,
    "hot dogColor": "hsl(81, 70%, 50%)",
    burger: 200,
    burgerColor: "hsl(255, 70%, 50%)",
    sandwich: 103,
    sandwichColor: "hsl(38, 70%, 50%)",
    kebab: 18,
    kebabColor: "hsl(148, 70%, 50%)",
    fries: 147,
    friesColor: "hsl(192, 70%, 50%)",
    donut: 11,
    donutColor: "hsl(3, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 24,
    "hot dogColor": "hsl(316, 70%, 50%)",
    burger: 3,
    burgerColor: "hsl(10, 70%, 50%)",
    sandwich: 191,
    sandwichColor: "hsl(278, 70%, 50%)",
    kebab: 122,
    kebabColor: "hsl(94, 70%, 50%)",
    fries: 105,
    friesColor: "hsl(43, 70%, 50%)",
    donut: 77,
    donutColor: "hsl(178, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 81,
    "hot dogColor": "hsl(243, 70%, 50%)",
    burger: 142,
    burgerColor: "hsl(312, 70%, 50%)",
    sandwich: 84,
    sandwichColor: "hsl(252, 70%, 50%)",
    kebab: 19,
    kebabColor: "hsl(336, 70%, 50%)",
    fries: 189,
    friesColor: "hsl(104, 70%, 50%)",
    donut: 76,
    donutColor: "hsl(350, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 87,
    "hot dogColor": "hsl(67, 70%, 50%)",
    burger: 100,
    burgerColor: "hsl(222, 70%, 50%)",
    sandwich: 96,
    sandwichColor: "hsl(352, 70%, 50%)",
    kebab: 92,
    kebabColor: "hsl(143, 70%, 50%)",
    fries: 137,
    friesColor: "hsl(162, 70%, 50%)",
    donut: 111,
    donutColor: "hsl(185, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 33,
    "hot dogColor": "hsl(302, 70%, 50%)",
    burger: 121,
    burgerColor: "hsl(89, 70%, 50%)",
    sandwich: 121,
    sandwichColor: "hsl(161, 70%, 50%)",
    kebab: 137,
    kebabColor: "hsl(122, 70%, 50%)",
    fries: 124,
    friesColor: "hsl(277, 70%, 50%)",
    donut: 139,
    donutColor: "hsl(84, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 34,
    "hot dogColor": "hsl(19, 70%, 50%)",
    burger: 4,
    burgerColor: "hsl(346, 70%, 50%)",
    sandwich: 32,
    sandwichColor: "hsl(92, 70%, 50%)",
    kebab: 51,
    kebabColor: "hsl(325, 70%, 50%)",
    fries: 106,
    friesColor: "hsl(222, 70%, 50%)",
    donut: 142,
    donutColor: "hsl(312, 70%, 50%)",
  },
];
