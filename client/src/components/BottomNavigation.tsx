import React from "react";
import { useLocation } from "react-router-dom";
import { Menu, Button, Icon, Grid, Header } from "semantic-ui-react";
import { IsLoggedIn } from "../utils";
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
  const today = new Date();
  const [dateFilter, setDateFilter] = React.useState<Date>(
    new Date(today.getFullYear(), today.getMonth())
  );

  const location = useLocation();

  //TODO: move this to the secondary bottom menu and store date in state
  const prevMonth = () => {
    console.log("Prev");
    setDateFilter(
      new Date(dateFilter.getFullYear(), dateFilter.getMonth() - 1)
    );
    console.log(dateFilter.toISOString());
  };

  const nextMonth = () => {
    console.log("Next");
    setDateFilter(
      new Date(dateFilter.getFullYear(), dateFilter.getMonth() + 1)
    );
    console.log(dateFilter.toISOString());
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
        <div
          style={{
            right: "1em",
          }}
        >
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
              <Grid.Column floated="left">
                <Menu size="mini" borderless compact>
                  <Menu.Item fitted>
                    <Button size="tiny" onClick={() => prevMonth()}>
                      <Icon name="caret left" inverted color="black" />
                    </Button>
                  </Menu.Item>
                  <Menu.Item fitted>
                    <Header as="h4" style={{ padding: "0 1em" }}>
                      {dateFilter.toLocaleString("default", {
                        month: "long",
                        year: "2-digit",
                      })}
                    </Header>
                  </Menu.Item>
                  <Menu.Item fitted>
                    <Button size="tiny" onClick={() => nextMonth()}>
                      <Icon name="caret right" />
                    </Button>
                  </Menu.Item>
                </Menu>
              </Grid.Column>
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
        </div>
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

function useState<T>(arg0: Date): [any, any] {
  throw new Error("Function not implemented.");
}
