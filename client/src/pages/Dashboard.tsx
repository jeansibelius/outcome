import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import CustomHorizontalBar, {
  CustomHorizontalBarData,
} from "../components/charts/CustomHorizontalBar";
import CustomPieChart, { CustomPieChartData } from "../components/charts/CustomResponsivePie";
import DashboardDataPane from "../components/DashboardDataPane";
import { ALL_CATEGORIES, ALL_ENTRIES } from "../queries";
import { IncomeExpenseType } from "../types";
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
  const [categoryChartData, setCategoryChartData] = useState<CustomPieChartData[]>();

  useEffect(() => {
    if (getEntries.data) {
      const entries = getEntries.data.returnAllEntries;
      const formattedChartData: CustomHorizontalBarData[] =
        entriesToIncomeAndExpenseSumBarData(entries);
      const formattedChartDataKeys: string[] = entriesToIncomeAndExpenseSumBarDataKeys(entries);
      setIncomeExpenseData(formattedChartData);
      setIncomeExpenseDataKeys(formattedChartDataKeys);
    }
  }, [getEntries.data]);

  useEffect(() => {
    if (getCategories.data) {
      const categories = getCategories.data.returnAllCategories;
      const formattedChartData: CustomPieChartData[] = categoriesToIdAndValue(categories);
      setCategoryChartData(formattedChartData);
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

  return (
    <>
      <Grid stackable columns={3}>
        <Grid.Column>
          <DashboardDataPane title="Income vs. Expenses">
            <CustomHorizontalBar data={incomeExpenseData} keys={incomeExpenseDataKeys} />
          </DashboardDataPane>
        </Grid.Column>
        <Grid.Column>
          <DashboardDataPane title="Expenses">
            <CustomPieChart
              data={categoryChartData.filter((cat) => cat.type === IncomeExpenseType.Expense)}
            />
          </DashboardDataPane>
        </Grid.Column>
        <Grid.Column>
          <DashboardDataPane title="Incomes">
            <CustomPieChart
              data={categoryChartData.filter((cat) => cat.type === IncomeExpenseType.Income)}
            />
          </DashboardDataPane>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Dashboard;
