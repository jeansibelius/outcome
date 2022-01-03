import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_ENTRIES } from "../queries";
import { Entry } from "../types";
import SingleEntry from "../components/Entry";

const Entries = () => {
  const getEntries = useQuery(ALL_ENTRIES);
  const [entries, setEntries] = useState<Entry[] | undefined>(undefined);

  useEffect(() => {
    if (getEntries.data) {
      setEntries(getEntries.data.returnAllEntries);
    }
  }, [getEntries.data]);

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
        {entries.map((entry) => (
          <SingleEntry key={entry.id} entry={entry} />
        ))}
      </>
    );
  }
  return null;
};

export default Entries;
