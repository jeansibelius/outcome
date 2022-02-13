import React from "react";
import { Link } from "react-router-dom";
import { Segment, Grid, Icon, Image } from "semantic-ui-react";
import logo from "../logo.svg";
import { localStorageUser, Space } from "../types";
import { GetActiveSpace, GetMe } from "../utils";

const BottomNavigation = () => {
  const user: localStorageUser | null = GetMe();
  const space: Space | null = GetActiveSpace();
  const [currentUser, setCurrentUser] = React.useState<localStorageUser | null>(null);
  const [currentSpace, setCurrentSpace] = React.useState<Space | null>(null);

  React.useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  React.useEffect(() => {
    setCurrentSpace(space);
  }, [space]);

  if (!currentUser || !currentSpace) return <div>Loading user...</div>;
  return (
    <Segment basic>
      <Grid verticalAlign="middle" columns={3}>
        <Grid.Column floated="left">
          <Image as={Link} to="/" src={logo} size="mini" />
        </Grid.Column>
        <Grid.Column textAlign="center">{currentSpace.name}</Grid.Column>
        <Grid.Column textAlign="right" floated="right">
          <span className="px-2">{currentUser.first_name}</span>
          <Icon name="user" size="large" />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default BottomNavigation;
