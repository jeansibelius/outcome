import React from "react";
import { Header, Segment } from "semantic-ui-react";
import { localStorageUser } from "../types";
import { GetMe } from "../utils";

const Account = () => {
  const user: localStorageUser | null = GetMe();
  const [currentUser, setCurrentUser] = React.useState<localStorageUser | null>(null);

  React.useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  if (!currentUser) return <div>Loading account details...</div>;
  return (
    <Segment basic>
      <Header as="h4">
        <strong>
          {currentUser.first_name} {currentUser.last_name}
        </strong>
      </Header>
      <Header as="h5">Belongs to spaces:</Header>
      {currentUser.spaces.map((space) => (
        <div key={space.id}>{space.name}</div>
      ))}
    </Segment>
  );
};

export default Account;
