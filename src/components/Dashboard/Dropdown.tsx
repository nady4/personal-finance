import { useNavigate } from "react-router-dom";
import { UserType } from "../../types";
import CatUser from "../../assets/catUser.svg";
import UserIcon from "../../assets/userIcon.svg";
import CalendarIcon from "../../assets/calendarIcon.svg";
import CategoriesIcon from "../../assets/categoriesIcon.svg";
import StatsIcon from "../../assets/statsIcon.svg";
import LogoutIcon from "../../assets/logoutIcon.svg";
import "../../styles/Dropdown.scss";

interface DropdownProps {
  user: UserType;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown = ({
  user,
  isDropdownOpen,
  setIsDropdownOpen,
}: DropdownProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`dropdown-container dropdown-${
        isDropdownOpen ? "open" : "closed"
      }`}
    >
      <div className="dropdown-header">
        <img className="dropdown-user-icon" src={CatUser} alt="user" />
        <h2 className="dropdown-username">{user.username}</h2>
        <h3 className="dropdown-email">{user.email}</h3>
      </div>
      <div className="dropdown-body">
        <div
          className="dropdown-item"
          onClick={() => {
            setIsDropdownOpen(false);
            navigate("/account");
          }}
        >
          <img className="dropdown-item-icon" src={UserIcon} alt="account" />
          <p className="dropdown-item-text">ACCOUNT</p>
        </div>
        <div
          className="dropdown-item"
          onClick={() => {
            setIsDropdownOpen(false);
            navigate("/dashboard");
          }}
        >
          <img
            className="dropdown-item-icon"
            src={CalendarIcon}
            alt="dashboard"
          />
          <p className="dropdown-item-text">CALENDAR</p>
        </div>
        <div
          className="dropdown-item"
          onClick={() => {
            setIsDropdownOpen(false);
            navigate("/categories");
          }}
        >
          <img
            className="dropdown-item-icon"
            src={CategoriesIcon}
            alt="categories"
          />
          <p className="dropdown-item-text">CATEGORIES</p>
        </div>
        <div
          className="dropdown-item"
          onClick={() => {
            setIsDropdownOpen(false);
            navigate("/stats");
          }}
        >
          <img className="dropdown-item-icon" src={StatsIcon} alt="stats" />
          <p className="dropdown-item-text">STATS</p>
        </div>
      </div>
      <div className="dropdown-footer">
        <div
          className="dropdown-item"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          <img className="dropdown-item-icon" src={LogoutIcon} alt="logout" />
          <p className="dropdown-item-text">LOGOUT</p>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
