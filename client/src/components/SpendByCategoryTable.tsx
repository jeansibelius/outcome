import _ from "lodash";
import { useReducer } from "react";
import { Header, Table } from "semantic-ui-react";
import { CustomPieChartData } from "../types";
import { getCountOfDaysInMonth } from "../utils";

enum SortActionKind {
  CHANGE_SORT = "CHANGE_SORT",
}

interface SortAction {
  type: SortActionKind;
  column: string;
}

enum SortDirection {
  ascending = "ascending",
  descending = "descending",
}

interface SortState {
  column: string | undefined;
  data: TableDataType;
  direction: SortDirection | undefined;
}

type TableDataType = {
  name: string;
  budget: number;
  weeklyBudget: number;
  spend: number | undefined;
  remainingBudget: number;
  remainingWeeklyBudget: number;
}[];

function tableReducer(state: SortState, action: SortAction): SortState {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending"
              ? SortDirection.descending
              : SortDirection.ascending,
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: SortDirection.ascending,
      };
    default:
      throw new Error();
  }
}

interface SpendByCategoryTableProps {
  categoryData: CustomPieChartData[];
  entrySumData: CustomPieChartData[];
}

const SpendByCategoryTable = ({
  categoryData,
  entrySumData,
}: SpendByCategoryTableProps) => {
  const today = new Date();
  const weekDivider =
    getCountOfDaysInMonth(today.getFullYear(), today.getMonth()) / 7;
  const getWeeklyBudget = (budget: number): number =>
    Math.floor(budget / weekDivider);

  const tableData: TableDataType = categoryData.map((category) => {
    const expenseValue = entrySumData.find(
      (data) => data.id === category.id
    )?.value;
    const remainingBudget = expenseValue
      ? category.value - expenseValue
      : category.value;
    return {
      name: category.id,
      budget: category.value,
      weeklyBudget: getWeeklyBudget(category.value),
      spend: expenseValue,
      remainingBudget: remainingBudget,
      remainingWeeklyBudget: getWeeklyBudget(remainingBudget),
    };
  });
  const initialState = {
    column: undefined,
    data: tableData,
    direction: undefined,
  };

  const [state, dispatch] = useReducer(tableReducer, initialState);

  const { column, data, direction }: SortState = state;

  const categoriesTotal = categoryData.reduce(
    (sum, cat) => (sum += cat.value),
    0
  );
  const entriesTotal = entrySumData.reduce(
    (sum, expense) => (sum += expense.value),
    0
  );

  return (
    <>
      <Header as="h3">Spend by category</Header>
      <div style={{ overflowX: "scroll" }}>
        <Table basic="very" sortable unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "name" ? direction : undefined}
                onClick={() =>
                  dispatch({ type: SortActionKind.CHANGE_SORT, column: "name" })
                }
              >
                Expenses
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "budget" ? direction : undefined}
                onClick={() =>
                  dispatch({
                    type: SortActionKind.CHANGE_SORT,
                    column: "budget",
                  })
                }
              >
                Budget
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "weeklyBudget" ? direction : undefined}
                onClick={() =>
                  dispatch({
                    type: SortActionKind.CHANGE_SORT,
                    column: "weeklyBudget",
                  })
                }
              >
                / week
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "spend" ? direction : undefined}
                onClick={() =>
                  dispatch({
                    type: SortActionKind.CHANGE_SORT,
                    column: "spend",
                  })
                }
              >
                Spent
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "remainingBudget" ? direction : undefined}
                onClick={() =>
                  dispatch({
                    type: SortActionKind.CHANGE_SORT,
                    column: "remainingBudget",
                  })
                }
              >
                +/-
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={
                  column === "remainingWeeklyBudget" ? direction : undefined
                }
                onClick={() =>
                  dispatch({
                    type: SortActionKind.CHANGE_SORT,
                    column: "remainingWeeklyBudget",
                  })
                }
              >
                / week
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(
              ({
                name,
                budget,
                weeklyBudget,
                spend,
                remainingBudget,
                remainingWeeklyBudget,
              }) => {
                return (
                  <Table.Row
                    key={name}
                    negative={remainingBudget < 0 ? true : false}
                    warning={
                      remainingBudget > 0 && remainingBudget < budget / 5
                        ? true
                        : false
                    }
                    positive={remainingBudget > budget / 2 ? true : false}
                  >
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>{budget}</Table.Cell>
                    <Table.Cell>{weeklyBudget}</Table.Cell>
                    <Table.Cell>{spend}</Table.Cell>
                    <Table.Cell>{remainingBudget}</Table.Cell>
                    <Table.Cell>{remainingWeeklyBudget}</Table.Cell>
                  </Table.Row>
                );
              }
            )}
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
