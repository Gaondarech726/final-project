import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.svg";
import { logout } from "../../redux/authSlice";
import DefaultUserAvatar from "./DefaultUserAvatar.svg";
import "./Header.scss";
import mobileLogoutBtnImg from "./mobileLogoutBtn.svg";
import { useState } from "react";
import { ModalTwo } from "../Modal/Modal";

const Header = ({ username }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAuthButton = () => {
    if (currentUser) {
      setIsModalOpen(true);
    } else {
      navigate("./register");
    }
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    setIsModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="header">
      <div className="headerDiv">
        <div className="logo">
          <Link to="/start">
            <img src={logo} alt="Логотип" className="logoImg" />
          </Link>
        </div>
        <div className="user">
          <Link to="#" className="profile">
            <img src={DefaultUserAvatar} alt="Avatar" className="avatarImg" />
          </Link>
          <span className="userName">
            {currentUser?.username || "User name"}
          </span>
          <div className="verticalLine"></div>
          <button className="logoutBtn" onClick={handleAuthButton}>
            {currentUser ? "Вийти" : "Увійти"}
          </button>
          <button className="mobileLogoutBtn" onClick={handleAuthButton}>
            <img
              src={mobileLogoutBtnImg}
              alt="Вийти"
              className="mobileLogoutBtnImg"
            />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ModalTwo
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </header>
  );
};

export default Header;
