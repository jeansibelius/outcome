import React from "react";
import { BrowserRouter as Router, Link, Outlet, Route, Routes } from "react-router-dom";
import { Menu, Container, Divider, Button, Header } from "semantic-ui-react";
import EntryModal from "./components/EntryModal";
import Entries from "./pages/Entries";
import Categories from "./pages/Categories";

const Navigation = ({ openModal }: { openModal: Function }) => {
  return (
    <Menu fixed="bottom">
      <Menu.Item as={Link} to="/">
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="entries">
        Entries
      </Menu.Item>
      <Menu.Item as={Link} to="categories">
        Categories
      </Menu.Item>
      <Menu.Item position="right">
        <Button onClick={() => openModal()}>New entry</Button>
      </Menu.Item>
    </Menu>
  );
};
const Layout = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  return (
    <>
      <Outlet />
      <Navigation openModal={openModal} />
      <EntryModal modalOpen={modalOpen} onClose={closeModal} />
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

function App() {
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
}

export default App;
