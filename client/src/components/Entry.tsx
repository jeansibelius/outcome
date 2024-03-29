import { Button, Card, Feed, Header, Icon } from "semantic-ui-react";
import { Entry as EntryType } from "../types";
import { getYearMonthDay } from "../utils/dates";

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
            {entry.category.icon ? (
              <Icon className={entry.category.icon} />
            ) : null}
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
    <Feed.Event
      style={{ margin: "0 0 0.7em" }}
      onClick={() => updateEntry(entry)}
    >
      <Feed.Label>
        {entry.category?.icon ? (
          <Icon
            circular
            inverted
            bordered
            color={entry.type === "Expense" ? "pink" : "teal"}
            className={entry.category.icon}
            style={{ fontSize: "1em" }}
          />
        ) : null}
      </Feed.Label>
      <Feed.Content>
        <Feed.Date></Feed.Date>
        <Feed.Summary>
          <strong
            style={
              entry.type === "Expense"
                ? { color: "#e03997" }
                : { color: "teal" }
            }
          >
            {entry.type === "Expense" ? `-${entry.amount}` : `${entry.amount}`}
          </strong>
           {entry.name}
          <Feed.Date>
            {entry.category ? entry.category.name : <i>Not categorised</i>}
          </Feed.Date>
        </Feed.Summary>

        {entry.description ? (
          <Feed.Extra>{entry.description}</Feed.Extra>
        ) : null}
        <Feed.Meta>
          {getYearMonthDay(entry.date)} · {entry.user.first_name}
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

const Entry = (props: SingleEntryProps) => {
  return <EntryAsAFeedEvent {...props} />;
};

export default Entry;
