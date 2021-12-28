import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_ENTRIES } from "./queries";
import { Entry } from "./types";

function App() {
  const { loading, error, data } = useQuery(ALL_ENTRIES);
  const [entries, setEntries] = useState<Entry[] | undefined>(undefined);

  useEffect(() => {
    if (data) {
      setEntries(data.returnAllEntries);
    }
  }, [data]);

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error loading entries</div>;
  }
  if (entries) {
    return (
      <div className="App">
        <header className="App-header"></header>
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
