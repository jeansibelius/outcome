import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_CATEGORIES, DELETE_CATEGORY } from "../queries";
import { Category, IncomeExpenseType } from "../types";
import { Button, Icon, Table } from "semantic-ui-react";
import AddCategoryModal from "../components/AddCategoryModal";

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
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (getCategories.data) {
      setCategories(getCategories.data.returnAllCategories);
    }
  }, [getCategories.data]);

  const onDelete = async (id: string) => {
    try {
      console.log("trying to delete", id);
      const response = await deleteCategory({ variables: { id: id } });
      console.log("delete response", response);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        //TODO add some toast or error handling
      }
      console.log(error);
    }
  };

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
  console.log("categories", categories);

  return (
    <>
      <Button onClick={openModal}>New category</Button>
      <AddCategoryModal modalOpen={modalOpen} onClose={closeModal} />
      {Object.values(IncomeExpenseType).map((type) => {
        return (
          <Table key={type} color={type === "Expense" ? "orange" : "green"} unstackable>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell>{type}s</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Monthly budget</Table.HeaderCell>
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
                          icon="trash"
                          color="red"
                          size="mini"
                          inverted
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
          </Table>
        );
      })}
    </>
  );
};

export default Categories;
