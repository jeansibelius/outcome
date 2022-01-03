import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_CATEGORIES } from "../queries";
import { Category, IncomeExpenseType } from "../types";
import { Button, Icon, Table } from "semantic-ui-react";
import AddCategoryModal from "../components/AddCategoryModal";

const Categories = () => {
  const getCategories = useQuery(ALL_CATEGORIES);
  const [categories, setCategories] = useState<Category[] | undefined>(undefined);

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
