import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_CATEGORIES, DELETE_CATEGORY } from "../queries";
import { Category, IncomeExpenseType } from "../types";
import { Button, Icon, Table } from "semantic-ui-react";
import CategoryModal from "../components/CategoryModal";
import { IsLoggedIn } from "..";

const Categories = () => {
  const getCategories = useQuery(ALL_CATEGORIES);
  const [categories, setCategories] = useState<Category[] | undefined>(undefined);
  const [deleteCategory] = useMutation<{ DeleteCategory: boolean }, { id: string }>(
    DELETE_CATEGORY,
    {
      refetchQueries: [{ query: ALL_CATEGORIES }],
    }
  );
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [updateCategoryValues, setUpdateCategoryValues] = useState<Category | undefined>(undefined);

  const openUpdateCategoryModal = (data: Category): void => {
    setUpdateCategoryValues(data);
    setModalOpen(true);
  };
  const closeCategoryModal = (): void => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (getCategories.data) {
      setCategories(getCategories.data.returnAllCategories);
    }
  }, [getCategories.data]);

  const onDelete = async (id: string) => {
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

  if (getCategories.loading) {
    return <div>Loading</div>;
  }

  if (getCategories.error) {
    return (
      <div>
        <p>Error loading categories.</p>
        <i>{getCategories.error.message}</i>
      </div>
    );
  }

  return (
    <>
      <CategoryModal
        modalOpen={modalOpen}
        onClose={closeCategoryModal}
        isUpdatingCategory={updateCategoryValues ? true : false}
        updateCategoryValues={updateCategoryValues}
      />
      {Object.values(IncomeExpenseType).map((type) => {
        return (
          <Table key={type} color={type === "Expense" ? "orange" : "green"} unstackable>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell width={3}>{type}s</Table.HeaderCell>
                <Table.HeaderCell width={8}>Description</Table.HeaderCell>
                <Table.HeaderCell width={3}>Monthly budget</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {categories ? (
                categories
                  .filter((category) => category.type === type)
                  .map((category) => (
                    <Table.Row key={category.id}>
                      <Table.Cell>
                        <Icon className={category.icon} />
                        {category.name}
                      </Table.Cell>
                      <Table.Cell>{category.description}</Table.Cell>
                      <Table.Cell>{category.monthlyBudget}</Table.Cell>
                      <Table.Cell>
                        <Icon
                          floated="right"
                          as={Button}
                          icon="pencil"
                          size="mini"
                          style={{ margin: "2px 0" }}
                          onClick={() => openUpdateCategoryModal(category)}
                        />
                        <Icon
                          floated="right"
                          as={Button}
                          icon="trash"
                          size="mini"
                          style={{ margin: "2px 0" }}
                          onClick={() => onDelete(category.id)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan="3">No {type} categories defined yet.</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
            {categories ? (
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="2">
                    {categories.filter((category) => category.type === type).length} categories
                  </Table.HeaderCell>
                  <Table.HeaderCell colSpan="2">
                    Total:{" "}
                    {categories
                      .filter((category) => category.type === type)
                      .reduce((sum, cat) => (cat.monthlyBudget ? sum + cat.monthlyBudget : sum), 0)}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            ) : null}
          </Table>
        );
      })}
    </>
  );
};

export default Categories;
