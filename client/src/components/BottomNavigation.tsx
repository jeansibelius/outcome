import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Button, Icon, Grid, Header } from "semantic-ui-react";
import { currentViewMonthVar } from "../cache";
import { ALL_ENTRIES } from "../queries";
import { Entry } from "../types";
import { GetCurrentViewMonth, IsLoggedIn } from "../utils";
import CustomMenuItemWithLink from "./CustomMenuItemWithLink";

interface NavigationProps {
  openLoginModal: () => void;
  openEntryModal?: () => void;
  openCategoryModal?: () => void;
}

export const dashboardPath = "dashboard";
export const entriesPath = "entries";
export const budgetPath = "budget";

const BottomNavigation = ({
  openEntryModal,
  openCategoryModal,
  openLoginModal,
}: NavigationProps) => {
  const location = useLocation();

  const currentViewMonth = GetCurrentViewMonth();
  const today = new Date();
  const initMonth = new Date(today.getFullYear(), today.getMonth());
  const [dateFilter, setDateFilter] = useState<Date>(initMonth);

  const entries = useQuery(ALL_ENTRIES);
  const [oldestDate, setOldestDate] = useState<Date>(initMonth);
  const [newestDate, setNewestDate] = useState<Date>(initMonth);
  const [prevButtonDisabled, setPrevButtonDisabled] = useState<boolean>(true);
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    setDateFilter(currentViewMonth);
  }, [currentViewMonth]);

  useEffect(() => {
    if (entries.data) {
      const sortedEntries = [...entries.data.returnAllEntries].sort(
        (a: Entry, b: Entry) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          return aDate.valueOf() - bDate.valueOf();
        }
      );
      const oldestEntryDate = new Date(sortedEntries[0].date);
      const newestEntryDate = new Date(
        sortedEntries[sortedEntries.length - 1].date
      );
      setOldestDate(oldestEntryDate);
      setNewestDate(
        new Date(newestEntryDate.getFullYear(), newestEntryDate.getMonth())
      );
    }
  }, [entries.data]);

  useEffect(() => {
    if (dateFilter <= oldestDate) setPrevButtonDisabled(true);
    if (dateFilter > oldestDate) setPrevButtonDisabled(false);
    if (dateFilter >= newestDate) setNextButtonDisabled(true);
    if (dateFilter < newestDate) setNextButtonDisabled(false);
  }, [dateFilter, newestDate, oldestDate]);

  const prevMonth = () => {
    const newMonth = new Date(
      dateFilter.getFullYear(),
      dateFilter.getMonth() - 1
    );
    currentViewMonthVar(newMonth);
    setDateFilter(newMonth);
  };

  const nextMonth = () => {
    const newMonth = new Date(
      dateFilter.getFullYear(),
      dateFilter.getMonth() + 1
    );
    currentViewMonthVar(newMonth);
    setDateFilter(newMonth);
  };

  const resetMonth = () => {
    currentViewMonthVar(initMonth);
    setDateFilter(initMonth);
  };

  return (
    <div
      style={{
        position: "fixed",
        padding: "0 1em",
        bottom: "2em",
        width: "100%",
      }}
      className="drop-shadow-lg"
    >
      {IsLoggedIn() ? (
        <Grid>
          <Grid.Row>
            <Grid.Column floated="right">
              <Menu
                floated="right"
                vertical
                widths={1}
                size="mini"
                icon="labeled"
                borderless
              >
                <CustomMenuItemWithLink to="/">
                  <Icon name={dashboardPath} />
                  Dashboard
                </CustomMenuItemWithLink>
                <CustomMenuItemWithLink to={entriesPath}>
                  <Icon name="list ul" />
                  Entries
                </CustomMenuItemWithLink>
              </Menu>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            {openEntryModal &&
            (location.pathname === `/${entriesPath}` ||
              location.pathname === "/") ? (
              <Grid.Column floated="left">
                <Menu size="mini" borderless compact>
                  <Menu.Item fitted>
                    <Button
                      attached="left"
                      size="mini"
                      disabled={prevButtonDisabled}
                      onClick={() => prevMonth()}
                    >
                      <Icon name="caret left" inverted color="black" />
                    </Button>
                  </Menu.Item>
                  <Button
                    as={Menu.Item}
                    size="mini"
                    onClick={() => resetMonth()}
                    fitted
                  >
                    <Header as="h4" style={{ padding: "0 1em" }}>
                      {dateFilter.toLocaleString("default", {
                        month: "short",
                        year: "2-digit",
                      })}
                    </Header>
                  </Button>
                  <Menu.Item fitted>
                    <Button
                      attached="right"
                      size="mini"
                      disabled={nextButtonDisabled}
                      onClick={() => nextMonth()}
                    >
                      <Icon name="caret right" />
                    </Button>
                  </Menu.Item>
                </Menu>
              </Grid.Column>
            ) : null}
            <Grid.Column>
              <Menu inverted size="mini" secondary>
                <Menu.Item position="right" fitted>
                  {openEntryModal &&
                  (location.pathname === `/${entriesPath}` ||
                    location.pathname === "/") ? (
                    <Button
                      circular
                      size="small"
                      primary
                      onClick={() => openEntryModal()}
                    >
                      <Icon name="plus" />
                      New entry
                    </Button>
                  ) : openCategoryModal &&
                    location.pathname === `/${budgetPath}` ? (
                    <Button
                      circular
                      size="small"
                      primary
                      onClick={() => openCategoryModal()}
                    >
                      <Icon name="plus" />
                      New category
                    </Button>
                  ) : null}
                </Menu.Item>
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <Menu fluid widths={4} size="mini" icon="labeled" borderless>
          <Menu.Item style={{ width: "100%" }} onClick={() => openLoginModal()}>
            <Icon name="user" />
            Login
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default BottomNavigation;
