import { useState } from "react";
import { Menu, Button, Icon, Header, Popup, Form } from "semantic-ui-react";
import { currentViewDateRangeVar } from "../cache";
import { ViewDateRange } from "../types";

const DateFilter = () => {
  const today = new Date();
  const startInit = new Date(today.getFullYear(), today.getMonth());
  const endInit = new Date(today.getFullYear(), today.getMonth() + 1);
  const initDate = { start: startInit, end: endInit };
  const [dateFilter, setDateFilter] = useState<ViewDateRange>(initDate);

  const prevMonth = () => {
    const newStart = new Date(
      dateFilter.start.getFullYear(),
      dateFilter.start.getMonth() - 1
    );
    const newEnd = new Date(
      dateFilter.end.getFullYear(),
      dateFilter.end.getMonth() - 1
    );
    const newDate = { start: newStart, end: newEnd };
    currentViewDateRangeVar(newDate);
    setDateFilter(newDate);
  };

  const nextMonth = () => {
    const newStart = new Date(
      dateFilter.start.getFullYear(),
      dateFilter.start.getMonth() + 1
    );
    const newEnd = new Date(
      dateFilter.end.getFullYear(),
      dateFilter.end.getMonth() + 1
    );
    const newDate = { start: newStart, end: newEnd };
    currentViewDateRangeVar(newDate);
    setDateFilter(newDate);
  };

  const resetMonth = () => {
    currentViewDateRangeVar(initDate);
    setDateFilter(initDate);
  };

  return (
    <>
      <Menu size="mini" borderless compact>
        <Menu.Item fitted>
          <Button attached="left" size="mini" onClick={() => prevMonth()}>
            <Icon name="caret left" inverted color="black" />
          </Button>
        </Menu.Item>
        <Popup
          trigger={
            <Button as={Menu.Item} size="mini" fitted>
              <Header as="h4" style={{ padding: "0 1em" }}>
                {dateFilter.start.toLocaleString("default", {
                  month: "short",
                  year: "2-digit",
                })}
              </Header>
            </Button>
          }
        >
          <Form>
            <Form.Input
              label="Start"
              type="date"
              value={dateFilter.start.toString()}
            />
            <Form.Input label="End" type="date" value={dateFilter.end} />
          </Form>
          <Button onClick={() => resetMonth()}>View ongoing</Button>
        </Popup>
        <Menu.Item fitted>
          <Button attached="right" size="mini" onClick={() => nextMonth()}>
            <Icon name="caret right" />
          </Button>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default DateFilter;
