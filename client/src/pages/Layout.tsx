import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Container, Segment, Image, Grid, Icon } from "semantic-ui-react";
import CategoryModal from "../components/CategoryModal";
import EntryModal from "../components/EntryModal";
import LoginModal from "../components/LoginModal";
import Navigation from "../components/Navigation";
import logo from "../logo.svg";
import { localStorageUser } from "../types";
import { GetMe, IsLoggedIn } from "../utils";

const Layout = () => {
  const [entryModalOpen, setEntryModalOpen] = React.useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = React.useState<boolean>(false);
  const [categoryModalOpen, setCategoryModalOpen] = React.useState<boolean>(false);
  const [user] = React.useState<localStorageUser | null>(GetMe());

  const openEntryModal = (): void => setEntryModalOpen(true);
  const openCategoryModal = (): void => setCategoryModalOpen(true);
  const openLoginModal = (): void => setLoginModalOpen(true);

  const closeEntryModal = (): void => {
    setEntryModalOpen(false);
  };
  const closeCategoryModal = (): void => {
    setCategoryModalOpen(false);
  };
  const closeLoginModal = (): void => {
    setLoginModalOpen(false);
  };

  const sharedContent = () => (
    <>
      <Container className="px-1 pt-8 pb-40">
        <Outlet />
      </Container>
      <Navigation
        openEntryModal={openEntryModal}
        openCategoryModal={openCategoryModal}
        openLoginModal={openLoginModal}
      />
      <LoginModal modalOpen={loginModalOpen} onClose={closeLoginModal} />
    </>
  );

  if (IsLoggedIn() && user) {
    return (
      <>
        <Segment basic>
          <Grid verticalAlign="middle" columns={3}>
            <Grid.Column floated="left">
              <Image as={Link} to="/" src={logo} size="mini" />
            </Grid.Column>
            <Grid.Column textAlign="right" floated="right">
              <span className="px-2">{user.first_name}</span>
              <Icon name="user" size="large" />
            </Grid.Column>
          </Grid>
        </Segment>
        {sharedContent()}
        <EntryModal modalOpen={entryModalOpen} onClose={closeEntryModal} />
        <CategoryModal modalOpen={categoryModalOpen} onClose={closeCategoryModal} />
      </>
    );
  } else {
    return sharedContent();
  }
};

export default Layout;
