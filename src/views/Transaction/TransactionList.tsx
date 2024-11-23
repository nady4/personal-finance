import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Transaction from "../../components/Transaction/Transaction";
import { getTransactionsFromDay } from "../../util/transactions";
import { UserType, TransactionType } from "../../types";
import "../../styles/list.scss";

interface TransactionListProps {
  user: UserType;
  day: moment.Moment;
  setDay: React.Dispatch<React.SetStateAction<moment.Moment>>;
  setSelectedTransaction: React.Dispatch<
    React.SetStateAction<TransactionType | null>
  >;
}

function TransactionList({
  user,
  day,
  setDay,
  setSelectedTransaction,
}: TransactionListProps) {
  const [dayTransactions, setDayTransactions] = useState<TransactionType[]>([]);
  const navigate = useNavigate();

  const handleCloseButton = () => {
    setSelectedTransaction(null);
    setDay(moment());
    navigate("/dashboard");
  };

  useEffect(() => {
    setDayTransactions(getTransactionsFromDay(user.transactions, day));
  }, [day, user.transactions]);

  return (
    <div className="list">
      <h2>{day.format("DD-MM")}</h2>
      <button className="exit-button" onClick={handleCloseButton}>
        X
      </button>
      <div className="day-view-header">
        <div className="day-view-buttons">
          <div className="day-change-buttons-container">
            <button
              className="day-change-button next-day-button"
              onClick={() => {
                setDay(moment(day).subtract(1, "days"));
              }}
            >
              <ChevronLeftIcon />
            </button>
            <button
              className="day-change-button previous-day-button"
              onClick={() => {
                setDay(moment(day).add(1, "days"));
              }}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="items-container">
        {dayTransactions.map((transaction, index) => {
          return (
            <div
              key={index}
              className="item"
              onClick={() => {
                setSelectedTransaction(transaction);
                navigate("/edit-transaction");
              }}
            >
              <Transaction transaction={transaction} key={index} />
            </div>
          );
        })}
      </div>
      <div className="new-button-container">
        <button
          className="new-button"
          onClick={() => {
            navigate("/new-transaction");
          }}
        >
          Add new transaction
        </button>
      </div>
    </div>
  );
}

export default TransactionList;