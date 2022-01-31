import React from "react";
import { Link } from "react-router-dom";
import { Segment, Grid, Icon, Image } from "semantic-ui-react";
import logo from "../logo.svg";
import { localStorageUser, Space } from "../types";
import { GetActiveSpace, GetMe } from "../utils";

const BottomNavigation = () => {
  const [user] = React.useState<localStorageUser | null>(GetMe());
  const [space] = React.useState<Space | null>(GetActiveSpace());
  if (user && space) {
    return (
      <Segment basic>
        <Grid verticalAlign="middle" columns={3}>
          <Grid.Column floated="left">
            <Image as={Link} to="/" src={logo} size="mini" />
          </Grid.Column>
          <Grid.Column textAlign="center">{space.name}</Grid.Column>
          <Grid.Column textAlign="right" floated="right">
            <span className="px-2">{user.first_name}</span>
            <Icon name="user" size="large" />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
  return <div>Loading user...</div>;
};

export default BottomNavigation;
