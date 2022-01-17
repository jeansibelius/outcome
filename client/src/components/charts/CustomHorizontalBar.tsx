import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
export interface CustomHorizontalBarData {
  [key: string]: string | number;
}

const CustomHorizontalBar = ({
  data,
  keys,
}: {
  data: CustomHorizontalBarData[];
  keys: string[];
}) => (
  <ResponsiveBar
    data={data}
    keys={keys}
    indexBy="type"
    margin={{ top: 20, right: 30, bottom: 80, left: 10 }}
    padding={0.15}
    layout="horizontal"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    valueFormat=">-"
    colors={{ scheme: "set2" }}
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
          id: keys[0],
        },
        id: "dots",
      },
      {
        match: {
          id: keys[1],
        },
        id: "lines",
      },
    ]}
    borderRadius={5}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 12,
      tickValues: 3,
      tickPadding: 5,
      tickRotation: 0,
      legend: "JPY",
      legendPosition: "middle",
      legendOffset: 42,
    }}
    axisLeft={null}
    enableGridX={true}
    enableGridY={false}
    labelSkipWidth={15}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 2.5]],
    }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 80,
        itemsSpacing: 2,
        itemWidth: 120,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        symbolShape: "circle",
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
    role="application"
    // TODO: Improve labeling
    ariaLabel="Horizontal bar chart"
    barAriaLabel={function (e: any) {
      return e.name + ": " + e.formattedValue + e.indexValue;
    }}
  />
);

export default CustomHorizontalBar;
