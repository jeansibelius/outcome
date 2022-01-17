import React, { useEffect, useState } from "react";
import { FetchResult, useMutation, useQuery } from "@apollo/client";
import { ALL_CATEGORIES, DELETE_CATEGORY } from "../queries";
import { Category, IncomeExpenseType } from "../types";
import { Statistic, Tab } from "semantic-ui-react";
import CategoryModal from "../components/CategoryModal";
import CategoryTable from "../components/CategoryTable";
import { IsLoggedIn } from "..";
import DashboardDataPane from "../components/DashboardDataPane";
import CustomPieChart, { CustomPieChartData } from "../components/charts/CustomResponsivePie";
import { categoriesToIdAndValue } from "../utils/data";

const Categories = () => {
  const getCategories = useQuery(ALL_CATEGORIES);
  const [deleteCategory] = useMutation<{ DeleteCategory: boolean }, { id: string }>(
    DELETE_CATEGORY,
    {
      refetchQueries: [{ query: ALL_CATEGORIES }],
    }
  );
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

  const onDelete = async (id: string): Promise<FetchResult | undefined> => {
    try {
      const response = await deleteCategory({ variables: { id: id } });
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        //TODO add some toast or error handling
      }
      console.log(error);
    }
  };

  if (!IsLoggedIn()) {
    return <div>Please login.</div>;
  }

  if (getCategories.loading || !categoryChartData) return <div>Loading...</div>;

  const panes = Object.values(IncomeExpenseType).map((type) => ({
    menuItem: { key: type, content: type },
    render: () => (
      <Tab.Pane key={type}>
        <DashboardDataPane>
          <CustomPieChart data={categoryChartData.filter((cat) => cat.type === type)} />
        </DashboardDataPane>
        <CategoryTable
          type={type}
          onDelete={onDelete}
          openUpdateCategoryModal={openUpdateCategoryModal}
        />
      </Tab.Pane>
    ),
  }));

  const totals = categoryChartData.reduce((arr: any[], cat) => {
    const index = cat.type === "Expense" ? 0 : 1;
    let sum = arr[index] ? arr[index]["total"] : 0;
    arr[index] = { total: sum + cat.value, type: cat.type };
    return arr;
  }, []);

  return (
    <>
      <Statistic.Group widths={2} style={{ marginBottom: "2em" }}>
        {totals.map((obj) => (
          <Statistic key={obj.type} size="small">
            <Statistic.Value>{obj.total}</Statistic.Value>
            <Statistic.Label>{obj.type}</Statistic.Label>
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
    </>
  );
};

export default Categories;
