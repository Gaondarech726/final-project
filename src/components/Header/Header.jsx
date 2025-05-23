import { Link } from "react-router";
import "./Header.scss";
import logo from "../../img/logo.svg";
import mobileLogoutBtnImg from "./mobileLogoutBtn.svg"
import DefaultUserAvatar from "./DefaultUserAvatar.svg";

const Header = ({ username }) => {
  return (
    <header className="header">
      <div className="headerDiv">
      <div className="logo">
        <Link to="../../pages/MainPage.jsx">
          <img src={logo} alt="Логотип" className="logoImg"/>
          {/*лого */}
        </Link>
      </div>
      <div className="user">
            <Link to="/кабінетКористувача " className="profile">
              <img src={DefaultUserAvatar} alt="Avatar" className="avatarImg" />
            </Link>
            <span className="userName">user Name</span> {/* замінити на {userName} */}
            <div className="verticalLine"></div>
            <button className="logoutBtn">Вийти</button> {/* Додайти обробник виходу */}
            <button className="mobileLogoutBtn"><img src={mobileLogoutBtnImg} alt="Вийти" className="mobileLogoutBtnImg" /></button>
      </div>
      </div>
    </header>
  );
};

export default Header;
