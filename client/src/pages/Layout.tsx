import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "semantic-ui-react";
import CategoryModal from "../components/CategoryModal";
import EntryModal from "../components/EntryModal";
import LoginModal from "../components/LoginModal";
import Navigation from "../components/Navigation";

const Layout = () => {
  const [entryModalOpen, setEntryModalOpen] = React.useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = React.useState<boolean>(false);
  const [categoryModalOpen, setCategoryModalOpen] = React.useState<boolean>(false);

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

  return (
    <>
      <Container className="px-4 pt-8 pb-40">
        <Outlet />
      </Container>
      <Navigation
        openEntryModal={openEntryModal}
        openCategoryModal={openCategoryModal}
        openLoginModal={openLoginModal}
      />
      <EntryModal modalOpen={entryModalOpen} onClose={closeEntryModal} />
      <CategoryModal modalOpen={categoryModalOpen} onClose={closeCategoryModal} />
      <LoginModal modalOpen={loginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default Layout;
