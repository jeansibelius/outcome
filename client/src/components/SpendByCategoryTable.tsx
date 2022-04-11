import { Header, Table } from "semantic-ui-react";
import { CustomPieChartData } from "../types";
import { getCountOfDaysInMonth } from "../utils";

interface SpendByCategoryTableProps {
  categoryData: CustomPieChartData[];
  entrySumData: CustomPieChartData[];
}

const SpendByCategoryTable = ({
  categoryData,
  entrySumData,
}: SpendByCategoryTableProps) => {
  const categoriesTotal = categoryData.reduce(
    (sum, cat) => (sum += cat.value),
    0
  );
  const entriesTotal = entrySumData.reduce(
    (sum, expense) => (sum += expense.value),
    0
  );

  const today = new Date();
  const weekDivider =
    getCountOfDaysInMonth(today.getFullYear(), today.getMonth()) / 7;
  const getWeeklyBudget = (budget: number): number =>
    Math.floor(budget / weekDivider);

  return (
    <>
      <Header as="h3">Spend by category</Header>
      <div style={{ overflowX: "scroll" }}>
        <Table basic="very" unstackable singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Expenses</Table.HeaderCell>
              <Table.HeaderCell>Budget</Table.HeaderCell>
              <Table.HeaderCell>/ week</Table.HeaderCell>
              <Table.HeaderCell>Spent</Table.HeaderCell>
              <Table.HeaderCell>+/-</Table.HeaderCell>
              <Table.HeaderCell>/ week</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {categoryData
              .sort((a, b) => a.id.localeCompare(b.id))
              .map((category) => {
                const expenseValue = entrySumData.find(
                  (data) => data.id === category.id
                )?.value;
                const remainingBudget = expenseValue
                  ? category.value - expenseValue
                  : category.value;
                return (
                  <Table.Row
                    negative={remainingBudget < 0 ? true : false}
                    warning={
                      remainingBudget > 0 &&
                      remainingBudget < category.value / 5
                        ? true
                        : false
                    }
                    positive={
                      remainingBudget > category.value / 2 ? true : false
                    }
                  >
                    <Table.Cell collapsing>{category.id}</Table.Cell>
                    <Table.Cell>{category.value}</Table.Cell>
                    <Table.Cell>{getWeeklyBudget(category.value)}</Table.Cell>
                    <Table.Cell>{expenseValue}</Table.Cell>
                    <Table.Cell>{remainingBudget}</Table.Cell>
                    <Table.Cell>{getWeeklyBudget(remainingBudget)}</Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell>{categoriesTotal}</Table.HeaderCell>
              <Table.HeaderCell>
                {getWeeklyBudget(categoriesTotal)}
              </Table.HeaderCell>
              <Table.HeaderCell>{entriesTotal}</Table.HeaderCell>
              <Table.HeaderCell>
                {categoriesTotal - entriesTotal}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {getWeeklyBudget(categoriesTotal - entriesTotal)}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    </>
  );
};

export default SpendByCategoryTable;
