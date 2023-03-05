import { Container, Image, Header } from "semantic-ui-react";
import { IsLoggedIn } from "../utils";
import Dashboard from "./Dashboard";
import * as logo from "../logo.svg";

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
