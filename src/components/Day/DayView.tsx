import { useEffect, useState } from "react";
import { getTransactionsFromDay } from "../../util/transactions";
import { Navigate } from "react-router-dom";
import { UserType, TransactionType } from "../../types.d";
import moment from "moment/moment";
import Transaction from "../Transaction/Transaction";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../../styles/list.scss";

interface DayViewProps {
  user: UserType;
  day: moment.Moment;
  setDay: React.Dispatch<React.SetStateAction<moment.Moment>>;
}

function DayView({ user, day, setDay }: DayViewProps) {
  const [dayTransactions, setDayTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    setDayTransactions(getTransactionsFromDay(user.transactions, day));
  }, [day, user.transactions]);

  const handlePreviousDayButton = () => {
    setDay(moment(day).subtract(1, "days"));
  };
  const handleNextDayButton = () => {
    setDay(moment(day).add(1, "days"));
  };
  const handleCloseButton = () => {
    <Navigate to="/calendar" />;
  };
  const openNewTransaction = () => {
    <Navigate to="/new-transaction" />;
  };

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
              onClick={handlePreviousDayButton}
            >
              <ChevronLeftIcon />
            </button>
            <button
              className="day-change-button previous-day-button"
              onClick={handleNextDayButton}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="items-container">
        {dayTransactions.map((transaction, index) => {
          return <Transaction transaction={transaction} key={index} />;
        })}
      </div>
      <div className="new-button-container">
        <button className="new-button" onClick={openNewTransaction}>
          Add new transaction
        </button>
      </div>
    </div>
  );
}

export default DayView;
