import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.svg";
import { logout } from "../../redux/authSlice";
import DefaultUserAvatar from "./DefaultUserAvatar.svg";
import "./Header.scss";
import mobileLogoutBtnImg from "./mobileLogoutBtn.svg";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let currentUser = useSelector((state) => state.auth.currentUser);

  const handleAuthButton = (e) => {
    if (currentUser) {
      dispatch(logout());
    } else {
      navigate("./register");
    }
  };
  return (
    <header className="header">
      <div className="headerDiv">
        <div className="logo">
          <Link to="../../pages/MainPage.jsx">
            <img src={logo} alt="Логотип" className="logoImg" />
          </Link>
        </div>
        <div className="user">
          <Link to="#" className="profile">
            <img src={DefaultUserAvatar} alt="Avatar" className="avatarImg" />
          </Link>
          <span className="userName">
            <span className="userName">
              {currentUser?.username || "User name"}
            </span>
          </span>{" "}
          <div className="verticalLine"></div>
          <button className="logoutBtn" onClick={handleAuthButton}>
            {currentUser ? "Вийти" : "Увійти"}
          </button>{" "}
          <button className="mobileLogoutBtn" onClick={handleAuthButton}>
            <img
              src={mobileLogoutBtnImg}
              alt="Вийти"
              className="mobileLogoutBtnImg"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
