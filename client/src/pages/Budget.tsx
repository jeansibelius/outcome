import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_CATEGORIES } from "../queries";
import { Category, IncomeExpenseType } from "../types";
import { Container, Statistic, Tab } from "semantic-ui-react";
import CategoryModal from "../components/CategoryModal";
import CategoryTable from "../components/CategoryTable";
import { IsLoggedIn } from "../utils";
import DashboardDataPane from "../components/DashboardDataPane";
import CustomPieChart, { CustomPieChartData } from "../components/charts/CustomResponsivePie";
import { categoriesToIdAndValue } from "../utils/data";

const Categories = () => {
  const getCategories = useQuery(ALL_CATEGORIES);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [updateCategoryValues, setUpdateCategoryValues] = useState<Category | undefined>(undefined);

  const [categoryChartData, setCategoryChartData] = useState<CustomPieChartData[]>();

  useEffect(() => {
    if (getCategories.data) {
      const categories = getCategories.data.returnAllCategories;
      const formattedChartData: CustomPieChartData[] = categoriesToIdAndValue(categories);
      setCategoryChartData(formattedChartData);
    }
  }, [getCategories.data]);

  const openUpdateCategoryModal = (data: Category): void => {
    setUpdateCategoryValues(data);
    setModalOpen(true);
  };
  const closeCategoryModal = (): void => {
    setModalOpen(false);
  };

  if (!IsLoggedIn()) {
    return <div>Please login.</div>;
  }

  if (getCategories.loading || !categoryChartData) return <div>Loading...</div>;

  const panes = Object.values(IncomeExpenseType).map((type) => ({
    menuItem: { key: type, content: `${type}s` },
    render: () => (
      <Tab.Pane key={type}>
        <DashboardDataPane>
          <CustomPieChart data={categoryChartData.filter((cat) => cat.type === type)} />
        </DashboardDataPane>
        <CategoryTable type={type} openUpdateCategoryModal={openUpdateCategoryModal} />
      </Tab.Pane>
    ),
  }));

  const totals = categoryChartData.reduce((arr: any[], cat) => {
    const index = cat.type === "Expense" ? 0 : 1;
    let sum = arr[index] ? arr[index]["total"] : 0;
    arr[index] = { total: sum + cat.value, type: cat.type };
    return arr;
  }, []);

  const balance = totals.reduce(
    (balance, totals) =>
      totals.type === IncomeExpenseType.Expense ? balance - totals.total : balance + totals.total,
    0
  );

  return (
    <Container>
      <Statistic.Group>
        <Statistic color={balance >= 0 ? "teal" : "pink"} style={{ margin: "0 auto 2em" }}>
          <Statistic.Label>Monthly balance</Statistic.Label>
          <Statistic.Value>{balance}</Statistic.Value>
        </Statistic>
      </Statistic.Group>
      <Statistic.Group widths={2} style={{ marginBottom: "2em" }}>
        {totals.map((obj) => (
          <Statistic key={obj.type} size="mini">
            <Statistic.Value>{obj.total}</Statistic.Value>
            <Statistic.Label>{obj.type}s</Statistic.Label>
          </Statistic>
        ))}
      </Statistic.Group>
      <Tab menu={{ pointing: true }} panes={panes} />
      <CategoryModal
        modalOpen={modalOpen}
        onClose={closeCategoryModal}
        isUpdatingCategory={updateCategoryValues ? true : false}
        updateCategoryValues={updateCategoryValues}
      />
    </Container>
  );
};

export default Categories;
