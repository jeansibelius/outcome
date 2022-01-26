import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_ENTRIES } from "../queries";
import { Entry as EntryType } from "../types";
import { Feed } from "semantic-ui-react";
import EntryModal from "../components/EntryModal";
import { IsLoggedIn } from "../index";
import Entry from "../components/Entry";

const Entries = () => {
  const getEntries = useQuery(ALL_ENTRIES);
  const [entries, setEntries] = React.useState<EntryType[] | undefined>(undefined);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [updateEntryValues, setUpdateEntryValues] = React.useState<EntryType | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (getEntries.data) {
      setEntries(getEntries.data.returnAllEntries);
    }
  }, [getEntries.data]);

  const openEntryUpdateModal = (data: EntryType): void => {
    setUpdateEntryValues(data);
    setModalOpen(true);
  };

  const closeEntryUpdateModal = (): void => {
    setModalOpen(false);
  };

  if (!IsLoggedIn()) {
    return <div>Please login.</div>;
  }

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
        <Feed size="large">
          {[...entries] // create a copy of entries array to disable strict mode in order to sort it
            .sort((a, b) => Date.parse(b.date.toString()) - Date.parse(a.date.toString()))
            .map((entry) => (
              <Entry key={entry.id} entry={entry} updateEntry={openEntryUpdateModal} />
            ))}
        </Feed>
      </>
    );
  }
  return null;
};

export default Entries;
