import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_ENTRIES, DELETE_ENTRY } from "../queries";
import { Entry } from "../types";
import SingleEntry from "../components/Entry";
import { Card } from "semantic-ui-react";
import EntryModal from "../components/EntryModal";

const Entries = () => {
  const getEntries = useQuery(ALL_ENTRIES);
  const [deleteEntry] = useMutation<{ DeleteEntry: boolean }, { id: string }>(DELETE_ENTRY, {
    refetchQueries: [{ query: ALL_ENTRIES }],
  });
  const [entries, setEntries] = useState<Entry[] | undefined>(undefined);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [updateEntryValues, setUpdateEntryValues] = React.useState<Entry | undefined>(undefined);

  useEffect(() => {
    if (getEntries.data) {
      setEntries(getEntries.data.returnAllEntries);
    }
  }, [getEntries.data]);

  const openEntryUpdateModal = (data: Entry): void => {
    setUpdateEntryValues(data);
    setModalOpen(true);
  };

  const closeEntryUpdateModal = (): void => {
    setModalOpen(false);
  };

  const onDelete = async (id: string) => {
    try {
      const response = await deleteEntry({ variables: { id: id } });
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        //TODO add some toast or error handling
      }
      console.log(error);
    }
  };

  if (getEntries.loading) {
    return <div>Loading</div>;
  }
  if (getEntries.error) {
    return (
      <div>
        <p>Error loading entries.</p>
        <i>{getEntries.error.message}</i>
      </div>
    );
  }
  if (entries) {
    return (
      <>
        {updateEntryValues ? (
          <EntryModal
            modalOpen={modalOpen}
            onClose={closeEntryUpdateModal}
            isUpdatingEntry={true}
            updateEntryValues={updateEntryValues}
          />
        ) : null}
        <Card.Group>
          {entries.map((entry) => (
            <SingleEntry
              key={entry.id}
              entry={entry}
              onDelete={onDelete}
              updateEntry={openEntryUpdateModal}
            />
          ))}
        </Card.Group>
      </>
    );
  }
  return null;
};

export default Entries;
