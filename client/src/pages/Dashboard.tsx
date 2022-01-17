import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Grid, Header } from "semantic-ui-react";
import CustomHorizontalBar, {
  CustomHorizontalBarData,
} from "../components/charts/CustomHorizontalBar";
import CustomResponsivePie, { PieChartData } from "../components/charts/CustomResponsivePie";
import { ALL_CATEGORIES, ALL_ENTRIES } from "../queries";
import {
  categoriesToIdAndValue,
  entriesToIncomeAndExpenseSumBarData,
  entriesToIncomeAndExpenseSumBarDataKeys,
} from "../utils/data";

const Dashboard = () => {
  const getEntries = useQuery(ALL_ENTRIES);
  const getCategories = useQuery(ALL_CATEGORIES);
  const [incomeExpenseData, setIncomeExpenseData] = useState<CustomHorizontalBarData[]>();
  const [incomeExpenseDataKeys, setIncomeExpenseDataKeys] = useState<string[]>();
  const [categoryChartData, setCategoryChartData] = useState<PieChartData[]>();

  useEffect(() => {
    if (getEntries.data) {
      const entries = getEntries.data.returnAllEntries;
      const formattedChartData: CustomHorizontalBarData[] =
        entriesToIncomeAndExpenseSumBarData(entries);
      const formattedChartDataKeys: string[] = entriesToIncomeAndExpenseSumBarDataKeys(entries);
      setIncomeExpenseData(formattedChartData);
      setIncomeExpenseDataKeys(formattedChartDataKeys);
      console.log(formattedChartData);
      console.log(formattedChartDataKeys);
    }
  }, [getEntries.data]);

  useEffect(() => {
    if (getCategories.data) {
      const categories = getCategories.data.returnAllCategories;
      const formattedChartData: PieChartData[] = categoriesToIdAndValue(categories);
      setCategoryChartData(formattedChartData);
      console.log("categoryChartData", formattedChartData);
    }
  }, [getCategories.data]);

  if (
    getCategories.loading ||
    getEntries.loading ||
    !incomeExpenseData ||
    !incomeExpenseDataKeys ||
    !categoryChartData
  )
    return <div>Loading...</div>;

  const style = { marginBottom: "10vh", width: "100%", height: "30vh" };
  return (
    <>
      <Grid stackable columns={3}>
        <Grid.Column>
          <div style={style}>
            <Header as="h3">Income vs. Expenses</Header>
            <CustomHorizontalBar data={incomeExpenseData} keys={incomeExpenseDataKeys} />
          </div>
        </Grid.Column>
        <Grid.Column>
          <div style={style}>
            <Header as="h3">Distribution of all categories</Header>
            <CustomResponsivePie data={categoryChartData} />
          </div>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Dashboard;
