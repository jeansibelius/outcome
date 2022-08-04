import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_ENTRIES, GET_CURRENT_VIEW_RANGE } from "../queries";
import { Entry as EntryType, ViewDateRange } from "../types";
import { Feed } from "semantic-ui-react";
import EntryModal from "../components/EntryModal";
import { IsLoggedIn } from "../utils";
import Entry from "../components/Entry";
import { getYearMonth } from "../utils/dates";

export const NoEntries = () => (
  <div>No entries. Please add some using the "New entry" button below.</div>
);

const Entries = () => {
  const getEntries = useQuery(ALL_ENTRIES);
  const [entries, setEntries] = React.useState<EntryType[] | undefined>(
    undefined
  );
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [updateEntryValues, setUpdateEntryValues] = React.useState<
    EntryType | undefined
  >(undefined);

  const currentViewDateRange = useQuery(GET_CURRENT_VIEW_RANGE);
  const startInit = getYearMonth({});
  const endInit = getYearMonth({ addMonth: 1 });
  const initDate = { start: startInit, end: endInit };
  const [dateFilter, setDateFilter] = useState<ViewDateRange>(initDate);

  useEffect(() => {
    setDateFilter(currentViewDateRange.data.currentViewMonth);
  }, [currentViewDateRange]);

  React.useEffect(() => {
    if (getEntries.data) {
      setEntries(
        getEntries.data.returnAllEntries.filter((entry: EntryType) => {
          const entryDate = new Date(entry.date);
          return entryDate >= dateFilter.start && entryDate < dateFilter.end;
        })
      );
    }
  }, [dateFilter, getEntries.data]);

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

  if (entries && entries?.length > 0) {
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
            .sort(
              (a, b) =>
                Date.parse(b.date.toString()) - Date.parse(a.date.toString())
            )
            .map((entry) => (
              <Entry
                key={entry.id}
                entry={entry}
                updateEntry={openEntryUpdateModal}
              />
            ))}
        </Feed>
      </>
    );
  }
  return <NoEntries />;
};

export default Entries;
