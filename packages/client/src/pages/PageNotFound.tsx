import { Link } from "react-router-dom";
import { Divider, Button } from "semantic-ui-react";

const PageNotFound = () => {
  return (
    <>
      <h2 className="text-xl">Sorry, no content here...</h2>
      <p>You used a broken link or typed something funny in the address bar. Please check!</p>
      <Divider />
      <Button as={Link} to="/">
        Go to the home page
      </Button>
    </>
  );
};

export default PageNotFound;
