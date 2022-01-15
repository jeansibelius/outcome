import { Container, Image, Header } from "semantic-ui-react";
import logo from "../logo.svg";

const FrontPage = () => {
  return (
    <Container textAlign="center">
      <Image src={logo} centered size="large" />
      <Header as="h2">
        Welcome to outcome.io
        <Header.Subheader>A simple app to track the outcome of your income.</Header.Subheader>
      </Header>
    </Container>
  );
};

export default FrontPage;
