import { useApolloClient } from "@apollo/client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image, Menu, Dropdown, Icon } from "semantic-ui-react";
import logo from "../logo.svg";
import { localStorageUser, Space } from "../types";
import { GetActiveSpace, GetMe, logout } from "../utils";
import { budgetPath } from "./BottomNavigation";
import CustomMenuItemWithLink from "./CustomMenuItemWithLink";

const TopNavigation = () => {
  const user: localStorageUser | null = GetMe();
  const space: Space | null = GetActiveSpace();
  const [currentUser, setCurrentUser] = React.useState<localStorageUser | null>(
    null
  );
  const [currentSpace, setCurrentSpace] = React.useState<Space | null>(null);
  let navigate = useNavigate();
  const client = useApolloClient();

  React.useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  React.useEffect(() => {
    setCurrentSpace(space);
  }, [space]);

  const handleLogout = async () => {
    await logout(client);
    navigate("/");
  };

  if (!currentUser || !currentSpace) return <div>Loading user...</div>;
  return (
    <Menu fluid secondary>
      <Menu.Item position="left">
        <Image as={Link} to="/" src={logo} size="mini" />
      </Menu.Item>
      <CustomMenuItemWithLink to={budgetPath}>
        <Icon name="tags" />
        {currentSpace.name}
      </CustomMenuItemWithLink>
      <Dropdown icon="user" button className="icon right item">
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/account"
            text="Account"
            icon="setting"
          />
          <Dropdown.Item
            text="Log out"
            icon="log out"
            onClick={() => handleLogout()}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};

export default TopNavigation;
