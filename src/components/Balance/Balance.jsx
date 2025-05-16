import { MdBarChart } from "react-icons/md";
import { Link } from "react-router";

import "./Balance.scss";

const Balance = () => {
  return (
    <section className="balance">
      <div className="balance__counter">
        <span className="span__balance">Баланс:</span>
        <div className="input-wrapper">
          <input type="number" placeholder="0.00" />
          <span className="currency">UAH</span>
        </div>
        <button className="button">ПІДТВЕРДИТИ</button>
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
