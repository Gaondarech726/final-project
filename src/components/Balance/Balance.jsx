import { useEffect, useState } from "react";
import { MdBarChart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import tippy from "tippy.js";
import { updateBalance } from "../../redux/authSlice";

import "./Balance.scss";

// LOVE M8L8TH
//
// Родный мой край начинается там,
// Где просторы теряются в свете луны,
// Где дыханием зимы лес отдался снегам,
// С горизонтом сольются морозные сны.
// Дали вольные где шепчут мне свой ответ,
// Где никак не могу отыскать я покой,
// Рукой, вскинутой вверх, где встречаю рассвет,
// Солнце лишь увидав, засыпаю с зарей.

const Balance = ({ showTooltip }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [inputBalance, setInputBalance] = useState(() => {
    return currentUser && currentUser.balance !== undefined
      ? parseFloat(currentUser.balance).toFixed(2)
      : "0.00";
  });

  const [isBalanceSet, setIsBalanceSet] = useState(() => {
    return currentUser && parseFloat(currentUser.balance) > 0 ? true : false;
  });

  useEffect(() => {
    if (showTooltip && !isBalanceSet) {
      showBalanceTooltip();
    }
  }, [showTooltip, isBalanceSet]);

  const showBalanceTooltip = () => {
    const inputWrapper = document.querySelector(
      ".balance__inputs .input-wrapper"
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
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.balance !== undefined) {
      setInputBalance(parseFloat(currentUser.balance).toFixed(2));
      setIsBalanceSet(parseFloat(currentUser.balance) > 0);
    } else {
      setInputBalance("0.00");
      setIsBalanceSet(false);
    }
  }, [currentUser]);

  const handleBalanceSubmit = () => {
    const numericBalance = parseFloat(inputBalance);
    if (!isNaN(numericBalance)) {
      dispatch(updateBalance(numericBalance));
    } else {
      alert("Будь ласка, введіть коректне числове значення для балансу.");
    }
  };

  return (
    <section className="balance">
      <div className="balance__counter">
        <span className="span__balance">Баланс:</span>

        <div className="balance__inputs">
          <div className="input-wrapper">
            <input
              type="number"
              placeholder="0.00"
              value={inputBalance}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
                  setInputBalance(value);
                }
              }}
              disabled={isBalanceSet}
            />
            <span className="currency">UAH</span>
          </div>
          <button
            className="button"
            onClick={handleBalanceSubmit}
            disabled={isBalanceSet}
          >
            ПІДТВЕРДИТИ
          </button>
        </div>
      </div>
      <div className="balance__calculations">
        <div className="calculations_button">
          <Link to="/calculations">Перейти до розрахунків</Link>
          <MdBarChart />
        </div>
      </div>
    </section>
  );
};

export default Balance;
