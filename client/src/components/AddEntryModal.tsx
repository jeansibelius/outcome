import React, { useEffect, useState } from "react";
import { Modal, Segment } from "semantic-ui-react";
import NewEntryForm from "./NewEntryForm";
import { Category, Entry, EntryInput, NewEntry } from "../types";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_CATEGORIES, CREATE_ENTRY, ALL_ENTRIES } from "../queries";
import { toNewEntry } from "../utils";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, error }: Props) => {
  const categoryData = useQuery(ALL_CATEGORIES);
  const [categories, setCategories] = useState<Category[] | undefined>(undefined);

  const [createEntry] = useMutation<{ CreateEntry: Entry }, { entryData: NewEntry }>(CREATE_ENTRY, {
    refetchQueries: [{ query: ALL_ENTRIES }],
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  useEffect(() => {
    if (categoryData.data) {
      setCategories(categoryData.data.returnAllCategories);
    }
  }, [categoryData]);

  const submitNewEntry = async (values: EntryInput) => {
    console.log("here with", values);
    try {
      const newEntry = toNewEntry(values);
      createEntry({
        variables: { entryData: newEntry },
      }).then(
        (response: unknown) =>
          response instanceof Object ? console.log("success", response) : null,
        (error: unknown) => (error instanceof Error ? console.log("error", error) : null)
      );
      onClose();
    } catch (error: unknown) {
      if (error && error instanceof Error) {
        //TODO handle error better
      }
      console.log("error", error);
    }
  };
  return (
    <Modal className="p-2" open={modalOpen} onClose={onClose} centered={true} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <NewEntryForm onSubmit={submitNewEntry} categories={categories} />
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
