import { ChangeEvent, useState } from "react";
import { Menu, Button, Icon, Header, Popup, Divider } from "semantic-ui-react";
import { currentViewDateRangeVar } from "../cache";
import { ViewDateRange } from "../types";
import { getYearMonthDay } from "../utils/dates";

type DateFilterInputProps = {
  title: string;
  handleDateFilterChange: Function;
  currentValue: Date;
  min?: Date | undefined;
  max?: Date;
};

const DateFilterInput = ({
  title,
  handleDateFilterChange,
  currentValue,
  min,
  max,
}: DateFilterInputProps) => {
  const isStart = title === "Start";
  const minString = min ? getYearMonthDay(min) : "";
  const maxString = max ? getYearMonthDay(max) : "";
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={title + "DateInput"} className="font-bold mb-1">
        {title}
      </label>
      <input
        id={title + "DateInput"}
        type="date"
        onChange={(event) => handleDateFilterChange(event, isStart)}
        value={getYearMonthDay(currentValue)}
        min={minString}
        max={maxString}
        className="p-2 border rounded-md border-slate-300"
      />
    </div>
  );
};

const DateFilter = () => {
  const today = new Date();
  const startInit = new Date(today.getFullYear(), today.getMonth());
  const endInit = new Date(today.getFullYear(), today.getMonth() + 1);
  const initDate = { start: startInit, end: endInit };
  const [dateFilter, setDateFilter] = useState<ViewDateRange>(initDate);
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);

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

  const handleDateFilterChange = (
    event: ChangeEvent<HTMLInputElement>,
    isStart: boolean
  ) => {
    if (isStart) {
      const newStart = new Date(event.target.value);
      const newDate = { start: newStart, end: dateFilter.end };
      currentViewDateRangeVar(newDate);
      setDateFilter(newDate);
    } else {
      const newEnd = new Date(event.target.value);
      const newDate = { start: dateFilter.start, end: newEnd };
      currentViewDateRangeVar(newDate);
      setDateFilter(newDate);
    }
    event.target.blur(); // Needed for mobile browsers to re-enable the date selector
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
            <Button
              as={Menu.Item}
              onClick={() => setPopupIsOpen(true)}
              size="mini"
              fitted
            >
              <Header as="h4" style={{ padding: "0 1em" }}>
                {dateFilter.start.toLocaleString("default", {
                  month: "short",
                  year: "2-digit",
                })}
                {dateFilter.end.valueOf() - dateFilter.start.valueOf() >
                1000 * 60 * 60 * 24 * 31 // Milliseconds to 31 days
                  ? "-"
                  : ""}
              </Header>
            </Button>
          }
          position="top center"
          open={popupIsOpen}
          hideOnScroll
        >
          <form>
            <DateFilterInput
              title="Start"
              handleDateFilterChange={handleDateFilterChange}
              currentValue={dateFilter.start}
              max={dateFilter.end}
            />
            <DateFilterInput
              title="End"
              handleDateFilterChange={handleDateFilterChange}
              currentValue={dateFilter.end}
              min={dateFilter.start}
            />
          </form>
          <Divider />
          <Button.Group widths={2}>
            <Button basic onClick={() => resetMonth()}>
              Reset
            </Button>
            <Button primary onClick={() => setPopupIsOpen(false)}>
              Ok
            </Button>
          </Button.Group>
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
