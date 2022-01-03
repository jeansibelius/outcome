import React from "react";
import { BrowserRouter as Router, Link, Outlet, Route, Routes } from "react-router-dom";
import { Button, Container, Divider, Grid } from "semantic-ui-react";
import AddEntryModal from "./components/AddEntryModal";
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
      <Grid>
        <Grid.Row>
          <Button.Group basic>
            <Button as={Link} to="/">
              Home
            </Button>
            <Button as={Link} to="entries">
              Entries
            </Button>
            <Button as={Link} to="categories">
              Categories
            </Button>
          </Button.Group>
        </Grid.Row>
        <Grid.Row>
          <Button onClick={() => openModal()}>New entry</Button>
        </Grid.Row>
        <AddEntryModal modalOpen={modalOpen} onClose={closeModal} />
        <Outlet />
      </Grid>
    </>
  );
};

const NotFound = () => {
  return (
    <div>
      <h2 className="text-xl">Sorry, no content here...</h2>
      <p>You used a broken link or typed something funny in the address bar. Please check!</p>
      <Divider />
      <Button as={Link} to="/">
        Go to the home page
      </Button>
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
