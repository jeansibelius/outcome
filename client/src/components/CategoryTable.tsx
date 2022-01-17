import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { Table, Icon, Button } from "semantic-ui-react";
import { ALL_CATEGORIES } from "../queries";
import { IncomeExpenseType, Category } from "../types";

interface CategoryTableProps {
  key?: IncomeExpenseType | string;
  type: IncomeExpenseType;
  openUpdateCategoryModal: (data: Category) => void;
}

const CategoryTable = ({ type, openUpdateCategoryModal }: CategoryTableProps) => {
  const getCategories = useQuery(ALL_CATEGORIES);
  const [categories, setCategories] = useState<Category[] | undefined>(undefined);

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
    <Table selectable color={type === "Expense" ? "orange" : "green"} unstackable>
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
              <Table.Row key={category.id} onClick={() => openUpdateCategoryModal(category)}>
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
};

export default CategoryTable;
