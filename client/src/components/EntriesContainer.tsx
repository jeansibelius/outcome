import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_ENTRIES } from "../queries";
import { Entry } from "../types";
import SingleEntry from "./Entry";

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
    return <div>Error loading entries</div>;
  }
  if (entries) {
    return (
      <div className="container">
        <div className="grid grid-cols-1">
          {entries.map((entry) => (
            <SingleEntry key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default Entries;
