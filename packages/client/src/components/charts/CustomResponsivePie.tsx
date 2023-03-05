import { ResponsivePie } from "@nivo/pie";
import { CustomPieChartData } from "../../types";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.

const CustomResponsivePie = ({ data }: { data: CustomPieChartData[] }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 30, right: 80, bottom: 30, left: 80 }}
    innerRadius={0.3}
    padAngle={4}
    cornerRadius={5}
    activeOuterRadiusOffset={9}
    colors={{ scheme: "set2" }}
    borderWidth={2}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor={{ from: "color", modifiers: [["darker", 1]] }}
    arcLinkLabelsThickness={3}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    defs={[
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.2)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: "*",
        id: "lines",
      },
    ]}
    legends={
      [
        /*
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
      */
      ]
    }
  />
);

export default CustomResponsivePie;
