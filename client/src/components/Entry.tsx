import { Entry } from "../types";
import { getYearMonthDay } from "../utils";

const SingleEntry = ({ entry }: { entry: Entry }) => {
  return (
    <div className="w-full p-6 my-2 bg-white rounded-lg shadow-lg grid space-x-4">
      <div className="w-full">
        <h3 className="font-bold">{entry.name}</h3>
        {entry.category ? (
          <div>
            <i className={entry.category.icon} />
            {entry.category.name}
          </div>
        ) : null}
      </div>
      <div>
        <div>Amount: {entry.amount}</div>
        <div>{getYearMonthDay(entry.date)}</div>
        <div>{entry.type}</div>
      </div>
    </div>
  );
};

export default SingleEntry;
