import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { Entry, EntryInput, NewEntry } from "../types";
import { useMutation } from "@apollo/client";
import { CREATE_ENTRY, ALL_ENTRIES, UPDATE_ENTRY } from "../queries";
import { toNewEntry } from "../utils";
import NewEntryForm from "./NewEntryForm";
import UpdateEntryForm from "./UpdateEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  isUpdatingEntry?: boolean;
  updateEntryValues?: Entry;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  isUpdatingEntry = false,
  updateEntryValues,
}: Props) => {
  const [error, setError] = React.useState<string | undefined>();
  const [createEntry] = useMutation<{ CreateEntry: Entry }, { entryData: NewEntry }>(CREATE_ENTRY, {
    refetchQueries: [{ query: ALL_ENTRIES }],
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  const [updateEntry] = useMutation<{ UpdateEntry: Entry }, { id: string; data: EntryInput }>(
    UPDATE_ENTRY,
    {
      refetchQueries: [{ query: ALL_ENTRIES }],
    }
  );

  const submitNewEntry = async (values: EntryInput): Promise<void> => {
    try {
      const newEntry = toNewEntry(values);
      await createEntry({
        variables: { entryData: newEntry },
      }).then(
        (response: unknown) =>
          response instanceof Object ? console.log("success", response) : null,
        (error: unknown) => (error instanceof Error ? console.log("error", error) : null)
      );
      setError(undefined);
      onClose();
    } catch (error: unknown) {
      if (error && error instanceof Error) {
        //TODO handle error better
        setError(error.message);
      }
      console.log("error", error);
    }
  };

  const submitUpdateEntry = async (data: EntryInput): Promise<void> => {
    try {
      if (!updateEntryValues) {
        throw new Error("Values missing from the entry you're trying to update.");
      }
      const updateData = toNewEntry(data);
      await updateEntry({
        variables: { id: updateEntryValues.id, data: updateData },
      });
      onClose();
    } catch (error: unknown) {
      if (error && error instanceof Error) {
        //TODO handle error better
        setError(error.message);
      }
      console.log(error);
    }
  };

  return (
    <Modal className="p-2" open={modalOpen} onClose={onClose} centered={true} closeIcon>
      <Modal.Header>{isUpdatingEntry ? "Edit entry" : "Add a new entry"}</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {isUpdatingEntry && updateEntryValues ? (
          <UpdateEntryForm onSubmit={submitUpdateEntry} updateEntryValues={updateEntryValues} />
        ) : (
          <NewEntryForm onSubmit={submitNewEntry} />
        )}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
