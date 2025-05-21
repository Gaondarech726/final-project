import googleLogo from "../../img/google-logo.svg";
import loginBackgroundSecond from "../../img/login-background-second.svg";
import loginBackground from "../../img/login-background.svg";
import logo from "../../img/logo.svg";
import "./Login.scss";

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  //   const navigate = useNavigate();
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       navigate("/start");
  //     }
  //   }, [navigate]);

  //   const handleLogin = (e) => {
  //     e.preventDefault();

  //     if (email && password) {
  //       localStorage.setItem("token", "mock-token");
  //       navigate("/start");
  //     } else {
  //       console.log("Введіть email та пароль");
  //     }
  //   };

  return (
    <div className="login-container">
      <img src={logo} alt="" className="login-container-logo" />
      <img
        src={loginBackground}
        alt=""
        className="login-container-background"
      />
      <img
        src={loginBackgroundSecond}
        alt=""
        className="login-container-background-second"
      />
      <div className="login-title-container">
        <h1>InvestIQ</h1>
        <h3>Smart Finance</h3>
      </div>
      <div className="login-form-container">
        <form className="login-form">
          <div className="google-login">
            <span>Ви можете авторизуватися за допомогою акаунта Google</span>
            <button>
              <img src={googleLogo} alt="googleLogo" />
              <span>Google</span>
            </button>
          </div>

          <div className="email-login">
            <span>
              Або увійти за допомогою ел. пошти та праолю після реєстрації
            </span>

            <div className="email-login-email">
              <span>Електронна пошта:</span>
              <input
                type="email"
                // placeholder="your@email.com"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="email-login-password">
              <span>Пароль:</span>
              <input
                type="password"
                placeholder="••••••••"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-submit-container">
            <button className="login-btn">Увійти</button>
            <button className="register-btn">реєстрація</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
