import { useEffect } from "react";
import { MdBarChart } from "react-icons/md";
import { Link } from "react-router";
import tippy from "tippy.js";

import "./Balance.scss";

const Balance = () => {
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

  return (
    <section className="balance">
      <div className="balance__counter">
        <span className="span__balance">Баланс:</span>

        <div className="balance__inputs">
          <div className="input-wrapper">
            <input type="number" placeholder="0.00" />
            <span className="currency">UAH</span>
          </div>
          <button className="button">ПІДТВЕРДИТИ</button>
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
