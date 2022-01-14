import React from "react";
import {
  BrowserRouter as Router,
  Link,
  LinkProps,
  Outlet,
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";
import { Menu, Container, Divider, Button, Header, Icon, Segment } from "semantic-ui-react";
import EntryModal from "./components/EntryModal";
import Entries from "./pages/Entries";
import Categories from "./pages/Categories";
import LoginModal from "./components/LoginModal";
import { isLoggedInVar } from "./cache";
import { IsLoggedIn } from ".";
import CategoryModal from "./components/CategoryModal";

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
              <Icon name="home" />
              Home
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
          <CustomLink to="/">
            <Icon name="home" />
            Home
          </CustomLink>
          <Menu.Item floated="right" onClick={() => openLoginModal()}>
            <Icon name="user" />
            Login
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

const Layout = () => {
  const [entryModalOpen, setEntryModalOpen] = React.useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = React.useState<boolean>(false);
  const [categoryModalOpen, setCategoryModalOpen] = React.useState<boolean>(false);

  const openEntryModal = (): void => setEntryModalOpen(true);
  const openCategoryModal = (): void => setCategoryModalOpen(true);
  const openLoginModal = (): void => setLoginModalOpen(true);

  const closeEntryModal = (): void => {
    setEntryModalOpen(false);
  };
  const closeCategoryModal = (): void => {
    setCategoryModalOpen(false);
  };
  const closeLoginModal = (): void => {
    setLoginModalOpen(false);
  };

  return (
    <>
      <Container className="px-4 pt-8 pb-40">
        <Outlet />
      </Container>
      <Navigation
        openEntryModal={openEntryModal}
        openCategoryModal={openCategoryModal}
        openLoginModal={openLoginModal}
      />
      <EntryModal modalOpen={entryModalOpen} onClose={closeEntryModal} />
      <CategoryModal modalOpen={categoryModalOpen} onClose={closeCategoryModal} />
      <LoginModal modalOpen={loginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

const NotFound = () => {
  return (
    <>
      <h2 className="text-xl">Sorry, no content here...</h2>
      <p>You used a broken link or typed something funny in the address bar. Please check!</p>
      <Divider />
      <Button as={Link} to="/">
        Go to the home page
      </Button>
    </>
  );
};

const HomeView = () => {
  return (
    <Container textAlign="center">
      <Header as="h2">Welcome to Outcome.io</Header>
      <p>Use the bottom navigation to move around.</p>
    </Container>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeView />} />
          <Route path="entries" element={<Entries />} />
          <Route path="categories" element={<Categories />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
