import { Container, Image, Header } from "semantic-ui-react";
import logo from "../logo.svg";
import { IsLoggedIn } from "../utils";
import Dashboard from "./Dashboard";

const FrontPage = () => {
  return (
    <>
      {IsLoggedIn() ? (
        <Dashboard />
      ) : (
        <Container textAlign="center">
          <Image src={logo} centered size="large" />
          <Header as="h2">
            Welcome to Outcome
            <Header.Subheader>
              A simple app to track
              <br />
              the outcome of your income.
            </Header.Subheader>
          </Header>
        </Container>
      )}
    </>
  );
};

export default FrontPage;
