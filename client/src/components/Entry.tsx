import { Button, Card, Header, Icon } from "semantic-ui-react";
import { Entry } from "../types";
import { getYearMonthDay } from "../utils";

const SingleEntry = ({
  entry,
  onDelete,
  updateEntry,
}: {
  entry: Entry;
  onDelete: Function;
  updateEntry: Function;
}) => {
  return (
    <Card color={entry.type === "Expense" ? "orange" : "green"}>
      <Card.Content>
        <Icon
          floated="right"
          as={Button}
          icon="pencil"
          size="mini"
          onClick={() => updateEntry(entry)}
        />
        <Icon
          floated="right"
          as={Button}
          icon="trash"
          size="mini"
          onClick={() => onDelete(entry.id)}
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
};

export default SingleEntry;
