import {
  LinkProps,
  useResolvedPath,
  useMatch,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Menu, Button, Icon } from "semantic-ui-react";
import { IsLoggedIn, logout } from "../utils";
import { useApolloClient } from "@apollo/client";

const CustomLink = ({ children, to }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Menu.Item as={Link} active={!!match} to={to}>
      {children}
    </Menu.Item>
  );
};

interface NavigationProps {
  openLoginModal: () => void;
  openEntryModal?: () => void;
  openCategoryModal?: () => void;
}

const BottomNavigation = ({
  openEntryModal,
  openCategoryModal,
  openLoginModal,
}: NavigationProps) => {
  let navigate = useNavigate();
  const location = useLocation();

  const dashboardPath = "dashboard";
  const entriesPath = "entries";
  const budgetPath = "budget";

  const client = useApolloClient();

  const handleLogout = async () => {
    await logout(client);
    navigate("/");
  };
  return (
    <div
      style={{ position: "fixed", width: "100%", padding: "0 1em", bottom: "1em" }}
      className="drop-shadow-lg"
    >
      {IsLoggedIn() ? (
        <>
          <Menu inverted size="mini" secondary fluid>
            {openEntryModal &&
            (location.pathname === `/${entriesPath}` || location.pathname === "/") ? (
              <Menu.Item position="right">
                <Button circular size="small" primary onClick={() => openEntryModal()}>
                  <Icon name="plus" />
                  New entry
                </Button>
              </Menu.Item>
            ) : openCategoryModal && location.pathname === `/${budgetPath}` ? (
              <Menu.Item position="right">
                <Button circular size="small" primary onClick={() => openCategoryModal()}>
                  <Icon name="plus" />
                  New category
                </Button>
              </Menu.Item>
            ) : null}
          </Menu>
          <Menu fluid widths={4} size="mini" icon="labeled" borderless>
            <CustomLink to="/">
              <Icon name={dashboardPath} />
              Dashboard
            </CustomLink>
            <CustomLink to={entriesPath}>
              <Icon name="list ul" />
              Entries
            </CustomLink>
            <CustomLink to={budgetPath}>
              <Icon name="tags" />
              Budget
            </CustomLink>
            <Menu.Item position="right" onClick={() => handleLogout()}>
              <Icon name="log out" />
              Logout
            </Menu.Item>
          </Menu>
        </>
      ) : (
        <Menu fluid widths={2} size="mini" icon="labeled" borderless>
          <Menu.Item floated="right" onClick={() => openLoginModal()}>
            <Icon name="user" />
            Login
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default BottomNavigation;
