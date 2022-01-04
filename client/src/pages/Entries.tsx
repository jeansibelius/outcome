import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_ENTRIES, DELETE_ENTRY } from "../queries";
import { Entry } from "../types";
import SingleEntry from "../components/Entry";
import { Card } from "semantic-ui-react";

const Entries = () => {
  const getEntries = useQuery(ALL_ENTRIES);
  const [deleteEntry] = useMutation<{ DeleteEntry: boolean }, { id: string }>(DELETE_ENTRY, {
    refetchQueries: [{ query: ALL_ENTRIES }],
  });
  const [entries, setEntries] = useState<Entry[] | undefined>(undefined);

  useEffect(() => {
    if (getEntries.data) {
      setEntries(getEntries.data.returnAllEntries);
    }
  }, [getEntries.data]);

  const onDelete = async (id: string) => {
    try {
      console.log("trying to delete", id);
      const response = await deleteEntry({ variables: { id: id } });
      console.log("delete response", response);
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
      <Card.Group>
        {entries.map((entry) => (
          <SingleEntry key={entry.id} entry={entry} onDelete={onDelete} />
        ))}
      </Card.Group>
    );
  }
  return null;
};

export default Entries;
