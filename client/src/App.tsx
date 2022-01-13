import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Menu, Container, Divider, Button, Header, Icon } from "semantic-ui-react";
import EntryModal from "./components/EntryModal";
import Entries from "./pages/Entries";
import Categories from "./pages/Categories";
import LoginModal from "./components/LoginModal";
import { isLoggedInVar } from "./cache";
import { IsLoggedIn } from ".";

const Navigation = ({
  openModal,
  openLoginModal,
}: {
  openModal: () => void;
  openLoginModal: () => void;
}) => {
  //const client = useApolloClient();
  let navigate = useNavigate();
  return (
    <Menu fixed="bottom">
      <Menu.Item as={Link} to="/">
        Home
      </Menu.Item>
      {IsLoggedIn() ? (
        <>
          <Menu.Item as={Link} to="entries">
            Entries
          </Menu.Item>
          <Menu.Item as={Link} to="categories">
            Categories
          </Menu.Item>
          <Menu.Item>
            <Button onClick={() => openModal()}>New entry</Button>
          </Menu.Item>
          <Menu.Item position="right">
            <Button
              icon
              labelPosition="right"
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
            </Button>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item position="right">
          <Button onClick={() => openLoginModal()}>Login</Button>
        </Menu.Item>
      )}
    </Menu>
  );
};
const Layout = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = React.useState<boolean>(false);

  const openEntryModal = (): void => setModalOpen(true);
  const openLoginModal = (): void => setLoginModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };
  const closeLoginModal = (): void => {
    setLoginModalOpen(false);
  };

  return (
    <>
      <Outlet />
      <Navigation openModal={openEntryModal} openLoginModal={openLoginModal} />
      <EntryModal modalOpen={modalOpen} onClose={closeModal} />
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
      <Container className="px-4 pt-8 pb-20">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeView />} />
            <Route path="entries" element={<Entries />} />
            <Route path="categories" element={<Categories />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
