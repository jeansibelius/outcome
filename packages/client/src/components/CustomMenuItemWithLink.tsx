import { LinkProps, useResolvedPath, useMatch, Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const CustomMenuItemWithLink = ({ children, to }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Menu.Item as={Link} active={!!match} to={to}>
      {children}
    </Menu.Item>
  );
};

export default CustomMenuItemWithLink;
