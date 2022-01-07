import React from "react";
import { BrowserRouter as Router, Link, Outlet, Route, Routes } from "react-router-dom";
import { Menu, Container, Divider, Button } from "semantic-ui-react";
import EntryModal from "./components/EntryModal";
import Entries from "./pages/Entries";
import Categories from "./pages/Categories";

const RootView = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  return (
    <>
      <Outlet />
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
      <EntryModal modalOpen={modalOpen} onClose={closeModal} />
    </>
  );
};

const NotFound = () => {
  return (
    <div>
      <h2 className="text-xl">Sorry, no content here...</h2>
      <p>You used a broken link or typed something funny in the address bar. Please check!</p>
      <Divider />
      <Menu as={Link} to="/">
        Go to the home page
      </Menu>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Container className="p-8">
        <Routes>
          <Route path="/" element={<RootView />}>
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
