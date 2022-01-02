import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
import AddEntryModal from "./components/AddEntryModal";
import Entries from "./components/EntriesContainer";

const RootView = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  return (
    <>
      <Button onClick={() => openModal()}>New entry</Button>
      <AddEntryModal modalOpen={modalOpen} onClose={closeModal} error={error} />
    </>
  );
};
function App() {
  return (
    <Router>
      <Container className="p-8">
        <Routes>
          <Route path="/" element={<RootView />}>
            <Route path="entries" element={<Entries />} />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
