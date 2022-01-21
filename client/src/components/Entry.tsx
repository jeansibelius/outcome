import { Button, Card, Feed, Header, Icon } from "semantic-ui-react";
import { Entry as EntryType } from "../types";
import { getYearMonthDay } from "../utils";

interface SingleEntryProps {
  entry: EntryType;
  updateEntry: Function;
}

export const EntryAsACard = ({ entry, updateEntry }: SingleEntryProps) => (
  <Card color={entry.type === "Expense" ? "orange" : "green"}>
    <Card.Content>
      <Icon
        floated="right"
        as={Button}
        icon="pencil"
        size="mini"
        onClick={() => updateEntry(entry)}
      />
      <Card.Header>¥ {entry.amount}</Card.Header>
      <Card.Meta>
        {entry.category ? (
          <>
            {entry.category.icon ? <Icon className={entry.category.icon} /> : null}
            <span>{entry.category.name}</span>
          </>
        ) : null}
      </Card.Meta>
    </Card.Content>
    <Card.Content>
      <Header as="h4">{entry.name}</Header>
      <span>{entry.description}</span>
    </Card.Content>
    <Card.Content extra>
      <span className="float-left">{getYearMonthDay(entry.date)}</span>
      <span className="float-right">{entry.type}</span>
    </Card.Content>
  </Card>
);

export const EntryAsAFeedEvent = ({ entry, updateEntry }: SingleEntryProps) => {
  return (
    <Feed.Event onClick={() => updateEntry(entry)}>
      <Feed.Label>
        {entry.category?.icon ? (
          <Icon
            color={entry.type === "Expense" ? "pink" : "teal"}
            className={entry.category.icon}
          />
        ) : null}
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          {entry.name}
          <Feed.Date>{getYearMonthDay(entry.date)}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra>
          <strong style={entry.type === "Expense" ? { color: "#e03997" } : { color: "teal" }}>
            {entry.type === "Expense" ? `-${entry.amount}` : `${entry.amount}`}
          </strong>
          {entry.description ? <div>{entry.description}</div> : null}
        </Feed.Extra>
        <Feed.Meta>{entry.category?.name}</Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

const Entry = (props: SingleEntryProps) => {
  return <EntryAsAFeedEvent {...props} />;
};

export default Entry;
