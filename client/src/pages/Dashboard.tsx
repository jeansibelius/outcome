import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import CustomHorizontalBar, {
  CustomHorizontalBarData,
} from "../components/charts/CustomHorizontalBar";
import CustomPieChart, {
  CustomPieChartData,
} from "../components/charts/CustomResponsivePie";
import DashboardDataPane from "../components/DashboardDataPane";
import {
  ALL_CATEGORIES,
  ALL_ENTRIES,
  GET_CURRENT_VIEW_MONTH,
} from "../queries";
import { Entry, IncomeExpenseType } from "../types";
import {
  categoriesToIdAndValue,
  entriesByCategoryToIdAndValue,
  entriesToIncomeAndExpenseSumBarData,
  entriesToIncomeAndExpenseSumBarDataKeys,
} from "../utils/data";

const Dashboard = () => {
  const getEntries = useQuery(ALL_ENTRIES);
  const getCategories = useQuery(ALL_CATEGORIES);
  const [incomeExpenseData, setIncomeExpenseData] =
    useState<CustomHorizontalBarData[]>();
  const [incomeExpenseDataKeys, setIncomeExpenseDataKeys] =
    useState<string[]>();
  const [categoryChartData, setCategoryChartData] =
    useState<CustomPieChartData[]>();
  const [expensesByCategory, setExpensesByCategory] =
    useState<CustomPieChartData[]>();
  const [incomesByCategory, setIncomesByCategory] =
    useState<CustomPieChartData[]>();

  const today = new Date();
  const currentViewMonth = useQuery(GET_CURRENT_VIEW_MONTH);
  const [dateFilter, setDateFilter] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth())
  );

  useEffect(() => {
    setDateFilter(currentViewMonth.data.currentViewMonth);
  }, [currentViewMonth]);

  useEffect(() => {
    if (getEntries.data) {
      const entries = getEntries.data.returnAllEntries.filter(
        (entry: Entry) => {
          const entryDate = new Date(entry.date);
          const endOfMonth = new Date(
            dateFilter.getFullYear(),
            dateFilter.getMonth() + 1
          );
          return entryDate >= dateFilter && entryDate < endOfMonth;
        }
      );

      const formattedChartDataKeys: string[] =
        entriesToIncomeAndExpenseSumBarDataKeys(entries);

      const formattedChartData: CustomHorizontalBarData[] =
        entriesToIncomeAndExpenseSumBarData(entries, formattedChartDataKeys);

      setIncomeExpenseData(formattedChartData);
      setIncomeExpenseDataKeys(formattedChartDataKeys);

      const entriesByCategoryFormatted = entriesByCategoryToIdAndValue(entries);
      setExpensesByCategory(
        entriesByCategoryFormatted.filter(
          (entry) => entry.type === IncomeExpenseType.Expense
        )
      );
      setIncomesByCategory(
        entriesByCategoryFormatted.filter(
          (entry) => entry.type === IncomeExpenseType.Income
        )
      );
    }
  }, [getEntries.data, dateFilter]);

  useEffect(() => {
    if (getCategories.data) {
      const categories = getCategories.data.returnAllCategories;
      const formattedChartData: CustomPieChartData[] =
        categoriesToIdAndValue(categories);
      setCategoryChartData(formattedChartData);
    }
  }, [getCategories.data]);

  if (
    getCategories.loading ||
    getEntries.loading ||
    !incomeExpenseData ||
    !incomeExpenseDataKeys ||
    !categoryChartData ||
    !expensesByCategory ||
    !incomesByCategory
  )
    return <div>Loading...</div>;

  return (
    <>
      <Grid stackable columns={3}>
        <Grid.Column>
          <DashboardDataPane title="Income vs. Expenses">
            <CustomHorizontalBar
              data={incomeExpenseData}
              keys={incomeExpenseDataKeys}
            />
          </DashboardDataPane>
        </Grid.Column>
        <Grid.Column>
          <DashboardDataPane title="Expenses by category">
            <CustomPieChart data={expensesByCategory} />
          </DashboardDataPane>
        </Grid.Column>
        <Grid.Column>
          <DashboardDataPane title="Incomes by category">
            <CustomPieChart data={incomesByCategory} />
          </DashboardDataPane>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Dashboard;
