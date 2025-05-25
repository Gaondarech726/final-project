import { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import tippy from "tippy.js";
import { updateBalance } from "../../redux/authSlice";

import { Link } from "react-router-dom";
import Header from "./../Header/Header";
import "./Calculations.scss";

const Calculations = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [inputBalance, setInputBalance] = useState(currentUser?.balance || "");

  useEffect(() => {
    const alreadyShown = localStorage.getItem("balanceTooltipShown");

    if (!alreadyShown) {
      const inputWrapper = document.querySelector(
        ".calc-balance__inputs .calc-input-wrapper"
      );

      if (inputWrapper) {
        const instance = tippy(inputWrapper, {
          content: `
            <div class="custom-tooltip">
              <strong>Привіт! Для початку роботи внесіть свій поточний баланс рахунку!</strong><br/>
              <span class="note">Ви не можете витрачати гроші, поки їх у Вас немає :)</span>
            </div>
          `,
          allowHTML: true,
          placement: "bottom",
          animation: "shift-away",
          theme: "custom",
          trigger: "manual",
          hideOnClick: true,
        });

        instance.show();

        setTimeout(() => {
          instance.hide();
        }, 5000);

        localStorage.setItem("balanceTooltipShown", "true");
      }
    }
  }, []);

  const handleBalanceSubmit = () => {
    const numericBalance = parseFloat(inputBalance);
    if (!isNaN(numericBalance)) {
      dispatch(updateBalance(numericBalance));
    }
  };

  useEffect(() => {
    setInputBalance(currentUser?.balance || "");
  }, [currentUser]);

  return (
    <>
      <Header />
      <section className="calculations">
        <section className="calc-balance">
          <Link className="calc-balance__return" to="/start">
            <FaLongArrowAltLeft className="calc-return__arrow" />
            <p className="calc-return__p">Повернутись на головну</p>
          </Link>
          <div className="calc-balance_period">
            <div className="calc-balance__counter">
              <span className="calc-span__balance">Баланс:</span>

              <div className="calc-balance__inputs">
                <div className="calc-input-wrapper">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={inputBalance}
                    disabled
                  />
                  <span className="calc-currency">UAH</span>
                </div>
              </div>
            </div>
            <div className="calc-balance__period">
              <p className="period__p">Поточний період</p>
              <div className="period__div">
                <MdKeyboardArrowLeft className="period__arrow" />
                <p className="period__date">Листопад 2019</p>
                <MdKeyboardArrowRight className="period__arrow" />
              </div>
            </div>
          </div>
        </section>
        <section className="calc-expenses__income">
          <div className="calc-expenses_income-show">
            <div className="calc-expenses">
              <p className="calc-expenses__p">Витрати: </p>
              <p className="calc-expenses__number">- 14500 грн</p>
            </div>
            <div className="verticalLine"></div>
            <div className="calc-income">
              <p className="calc-income__p">Доходи: </p>
              <p className="calc-income__number">+ 14500 грн</p>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Calculations;
