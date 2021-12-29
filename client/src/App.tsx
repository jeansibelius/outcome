import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_CATEGORIES, ALL_ENTRIES, CREATE_ENTRY } from "./queries";
import { Category, Entry, NewEntry } from "./types";
import NewEntryForm from "./components/NewEntryForm";
import { useMutation } from "@apollo/client";

function App() {
  const getEntries = useQuery(ALL_ENTRIES);
  const [entries, setEntries] = useState<Entry[] | undefined>(undefined);
  const categoryData = useQuery(ALL_CATEGORIES);
  const [categories, setCategories] = useState<Category[] | undefined>(undefined);

  const [createEntry] = useMutation<{ CreateEntry: Entry }, { data: NewEntry }>(CREATE_ENTRY, {
    refetchQueries: [{ query: ALL_ENTRIES }],
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  useEffect(() => {
    if (getEntries.data) {
      setEntries(getEntries.data.returnAllEntries);
    }
  }, [getEntries.data]);

  useEffect(() => {
    if (categoryData.data) {
      setCategories(categoryData.data.returnAllCategories);
    }
  }, [categoryData]);

  if (getEntries.loading) {
    return <div>Loading</div>;
  }
  if (getEntries.error) {
    return <div>Error loading entries</div>;
  }
  if (entries) {
    return (
      <div className="App">
        <header className="App-header"></header>
        <div>
          <NewEntryForm headerTitle="New entry" createEntry={createEntry} categories={categories} />
        </div>
        <ul>
          {entries.map((entry) => {
            const date = new Date(entry.date);
            const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            return (
              <div key={entry.id}>
                <li>{entry.name}</li>
                <ul>
                  <li>{entry.amount}</li>
                  {entry.category ? <li>{entry.category.name}</li> : null}
                  <li>{dateString}</li>
                  <li>{entry.type}</li>
                </ul>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
  return null;
}

export default App;
