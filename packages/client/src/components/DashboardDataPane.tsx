import React from "react";
import { Header } from "semantic-ui-react";

interface DashboardDataPaneProps {
  title?: string;
  children?: React.ReactNode;
}

const DashboardDataPane = ({ title, children }: DashboardDataPaneProps) => {
  const style = { marginBottom: "10vh", width: "100%", height: "30vh" };
  return (
    <div style={style}>
      {title && <Header as="h3">{title}</Header>}
      {children}
    </div>
  );
};

export default DashboardDataPane;
