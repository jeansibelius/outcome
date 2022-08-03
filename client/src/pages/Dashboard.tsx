import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Grid, Header } from "semantic-ui-react";
import CustomHorizontalBar, {
  CustomHorizontalBarData,
} from "../components/charts/CustomHorizontalBar";
import CustomPieChart from "../components/charts/CustomResponsivePie";
import DashboardDataPane from "../components/DashboardDataPane";
import SpendByCategoryTable from "../components/SpendByCategoryTable";
import {
  ALL_CATEGORIES,
  ALL_ENTRIES,
  GET_CURRENT_VIEW_RANGE,
} from "../queries";
import {
  CustomPieChartData,
  Entry,
  IncomeExpenseType,
  ViewDateRange,
} from "../types";
import {
  categoriesToIdAndValue,
  entriesByCategoryToIdAndValue,
  entriesToIncomeAndExpenseSumBarData,
  entriesToIncomeAndExpenseSumBarDataKeys,
} from "../utils/data";
import { NoEntries } from "./Entries";

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

  const currentViewDateRange = useQuery(GET_CURRENT_VIEW_RANGE);
  const today = new Date();
  const startInit = new Date(today.getFullYear(), today.getMonth());
  const endInit = new Date(today.getFullYear(), today.getMonth() + 1);
  const initDate = { start: startInit, end: endInit };
  const [dateFilter, setDateFilter] = useState<ViewDateRange>(initDate);

  useEffect(() => {
    setDateFilter(currentViewDateRange.data.currentViewMonth);
  }, [currentViewDateRange]);

  useEffect(() => {
    if (getEntries.data) {
      const entries = getEntries.data.returnAllEntries.filter(
        (entry: Entry) => {
          const entryDate = new Date(entry.date);
          return entryDate >= dateFilter.start && entryDate < dateFilter.end;
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

  if (getEntries.data.returnAllEntries.length === 0) return <NoEntries />;

  return (
    <>
      <Grid stackable columns={2}>
        <Grid.Column>
          <SpendByCategoryTable
            categoryData={categoryChartData.filter(
              (category) => category.type === IncomeExpenseType.Expense
            )}
            entrySumData={expensesByCategory}
          />
        </Grid.Column>
        <Grid.Column>
          <DashboardDataPane title="Income vs. Expenses">
            <CustomHorizontalBar
              data={incomeExpenseData}
              keys={incomeExpenseDataKeys}
            />
          </DashboardDataPane>
          <Header sub textAlign="center">
            Balance:{" "}
            {incomeExpenseData.reduce(
              (sum, entry) =>
                entry.type === IncomeExpenseType.Income
                  ? (sum += entry.total as number)
                  : (sum -= entry.total as number),
              0
            )}
          </Header>
        </Grid.Column>
        {expensesByCategory.length > 0 ? (
          <Grid.Column>
            <DashboardDataPane title="Expenses by category">
              <CustomPieChart data={expensesByCategory} />
            </DashboardDataPane>
          </Grid.Column>
        ) : null}
        {incomesByCategory.length > 0 ? (
          <Grid.Column>
            <DashboardDataPane title="Incomes by category">
              <CustomPieChart data={incomesByCategory} />
            </DashboardDataPane>
          </Grid.Column>
        ) : null}
      </Grid>
    </>
  );
};

export default Dashboard;
