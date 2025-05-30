import { useEffect, useState } from "react";
import { MdBarChart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import tippy from "tippy.js";
import { updateBalance } from "../../redux/authSlice";

import "./Balance.scss";

const Balance = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [inputBalance, setInputBalance] = useState(currentUser?.balance || "");
  const [isBalanceSet, setIsBalanceSet] = useState(false);

  useEffect(() => {
    const alreadyShown = localStorage.getItem("balanceTooltipShown");

    if (!alreadyShown) {
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

        localStorage.setItem("balanceTooltipShown", "true");
      }
    }
  }, []);

  useEffect(() => {
    setInputBalance(currentUser?.balance || "");

    // Перевіряємо, чи вже встановлено баланс у localStorage
    const savedBalance = localStorage.getItem("balance");
    if (savedBalance && parseFloat(savedBalance) > 0) {
      setIsBalanceSet(true);
    }
  }, [currentUser]);

  const handleBalanceSubmit = () => {
    const numericBalance = parseFloat(inputBalance);
    if (!isNaN(numericBalance)) {
      dispatch(updateBalance(numericBalance));
      localStorage.setItem("balance", numericBalance);
      setIsBalanceSet(true);
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
                if (/^\d*\.?\d{0,2}$/.test(value)) {
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
