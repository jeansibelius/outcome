import { useLocation } from "react-router-dom";
import { Menu, Button, Icon, Grid } from "semantic-ui-react";
import { IsLoggedIn } from "../utils";
import CustomMenuItemWithLink from "./CustomMenuItemWithLink";
import DateFilter from "./DateFilter";

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
                <DateFilter />
              </Grid.Column>
            ) : null}
            <Grid.Column>
              <Menu inverted size="mini" secondary>
                <Menu.Item position="right" fitted>
                  {openEntryModal &&
                  (location.pathname === `/${entriesPath}` ||
                    location.pathname === "/account" ||
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
