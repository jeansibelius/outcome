import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "semantic-ui-react";
import CategoryModal from "../components/CategoryModal";
import EntryModal from "../components/EntryModal";
import LoginModal from "../components/LoginModal";
import BottomNavigation from "../components/BottomNavigation";
import { IsLoggedIn } from "../utils";
import TopNavigation from "../components/TopNavigation";

const Layout = () => {
  const [entryModalOpen, setEntryModalOpen] = React.useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = React.useState<boolean>(false);
  const [categoryModalOpen, setCategoryModalOpen] =
    React.useState<boolean>(false);

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
      <Container className="px-1 pt-8 pb-80">
        <Outlet />
      </Container>
      <BottomNavigation
        openEntryModal={openEntryModal}
        openCategoryModal={openCategoryModal}
        openLoginModal={openLoginModal}
      />
      <LoginModal modalOpen={loginModalOpen} onClose={closeLoginModal} />
    </>
  );

  if (IsLoggedIn()) {
    return (
      <>
        <TopNavigation />
        {sharedContent()}
        <EntryModal modalOpen={entryModalOpen} onClose={closeEntryModal} />
        <CategoryModal
          modalOpen={categoryModalOpen}
          onClose={closeCategoryModal}
        />
      </>
    );
  } else {
    return sharedContent();
  }
};

export default Layout;
