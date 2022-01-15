import {
  LinkProps,
  useResolvedPath,
  useMatch,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Menu, Button, Icon } from "semantic-ui-react";
import { IsLoggedIn } from "..";
import { isLoggedInVar } from "../cache";

const CustomLink = ({ children, to }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Menu.Item as={Link} active={!!match} to={to}>
      {children}
    </Menu.Item>
  );
};

const Navigation = ({
  openEntryModal,
  openCategoryModal,
  openLoginModal,
}: {
  openEntryModal: () => void;
  openCategoryModal: () => void;
  openLoginModal: () => void;
}) => {
  let navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      style={{ position: "fixed", width: "94%", margin: "0 3% 2%", bottom: 10 }}
      className="drop-shadow-lg"
    >
      {IsLoggedIn() ? (
        <>
          <Menu inverted size="mini" secondary fluid>
            {location.pathname === "/entries" || location.pathname === "/" ? (
              <Menu.Item position="right">
                <Button circular size="small" primary onClick={() => openEntryModal()}>
                  <Icon name="plus" />
                  New entry
                </Button>
              </Menu.Item>
            ) : location.pathname === "/categories" ? (
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
              <Icon name="dashboard" />
              Dashboard
            </CustomLink>
            <CustomLink to="entries">
              <Icon name="list ul" />
              Entries
            </CustomLink>
            <CustomLink to="categories">
              <Icon name="tags" />
              Categories
            </CustomLink>
            <Menu.Item
              position="right"
              onClick={() => {
                /*
                    client.cache.evict({ fieldName: "me" });
                    client.cache.gc();
                    */
                window.localStorage.removeItem("token");
                isLoggedInVar(false);
                navigate("/");

                //client.resetStore();
              }}
            >
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

export default Navigation;
