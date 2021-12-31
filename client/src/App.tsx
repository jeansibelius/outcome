import React from "react";
import { Button, Container } from "semantic-ui-react";
import AddEntryModal from "./components/AddEntryModal";
import Entries from "./components/EntriesContainer";

function App() {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  return (
    <Container className="p-8">
      <Button onClick={() => openModal()}>New entry</Button>
      <AddEntryModal modalOpen={modalOpen} onClose={closeModal} error={error} />
      <Entries />
    </Container>
  );
}

export default App;
