import { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import tippy from "tippy.js";
import { updateBalance } from "../../redux/authSlice";
import { ReactComponent as AlcoholIcon } from "./svg/Alcohol.svg";
import { ReactComponent as CommunicationIcon } from "./svg/Communication.svg";
import { ReactComponent as EducationIcon } from "./svg/Education.svg";
import { ReactComponent as EntertainmentIcon } from "./svg/Entertainment.svg";
import { ReactComponent as EquipmentIcon } from "./svg/Equipment.svg";
import { ReactComponent as EverythingForTheHomeIcon } from "./svg/EverythingForTheHome.svg";
import { ReactComponent as HealthIcon } from "./svg/Health.svg";
import { ReactComponent as OtherIcon } from "./svg/Other.svg";
import { ReactComponent as ProductsIcon } from "./svg/Products.svg";
import { ReactComponent as SportIcon } from "./svg/Sport.svg";
import { ReactComponent as TransportIcon } from "./svg/Transport.svg";

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

  const categories = [
    {
      order: 1,
      name: "products",
      path: "./svg/Products.svg",
      renderName: "Продукти",
    },
    {
      order: 2,
      name: "alcohol",
      path: "./svg/Alcohol.svg",
      renderName: "Алкоголь",
    },
    {
      order: 3,
      name: "entertainment",
      path: "./svg/Entertainment.svg",
      renderName: "Розваги",
    },
    {
      order: 4,
      name: "health",
      path: "./svg/Health.svg",
      renderName: "Здоров'я",
    },
    {
      order: 5,
      name: "transport",
      path: "./svg/Transport.svg",
      renderName: "Транспорт",
    },
    {
      order: 6,
      name: "everythingForTheHome",
      path: "./svg/EverythingForTheHome.svg",
      renderName: "Все для дому",
    },
    {
      order: 7,
      name: "equipment",
      path: "./svg/Equipment.svg",
      renderName: "Техніка",
    },
    {
      order: 8,
      name: "communication",
      path: "./svg/Communication.svg",
      renderName: "Комуналка, Зв’язок",
    },
    {
      order: 9,
      name: "sport",
      path: "./svg/Sport.svg",
      renderName: "Спорт",
    },
    {
      order: 10,
      name: "education",
      path: "./svg/Education.svg",
      renderName: "Навчання",
    },
    {
      order: 11,
      name: "other",
      path: "./svg/Other.svg",
      renderName: "Інше",
    },
  ];

  const iconsMap = {
    products: ProductsIcon,
    alcohol: AlcoholIcon,
    entertainment: EntertainmentIcon,
    health: HealthIcon,
    transport: TransportIcon,
    everythingForTheHome: EverythingForTheHomeIcon,
    equipment: EquipmentIcon,
    communication: CommunicationIcon,
    sport: SportIcon,
    education: EducationIcon,
    other: OtherIcon,
  };

  const [activeCategory, setActiveCategory] = useState(null);

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
        <section className="calc-costs">
          <div className="calc-costs-show">
            <div className="costs__div">
              <MdKeyboardArrowLeft className="costs__arrow" />
              <p className="costs__p">Витрати</p>
              <MdKeyboardArrowRight className="costs__arrow" />
            </div>
            <div className="costs__categories">
              <div className="categories__top-row">
                {categories.slice(0, 6).map(({ name, renderName }) => {
                  const IconComponent = iconsMap[name];
                  return (
                    <div
                      key={name}
                      className="categories__category"
                      onClick={() => setActiveCategory(name)}
                    >
                      <p className="categories__money">5000</p>
                      <IconComponent
                        className={`categories__icon ${
                          activeCategory === name ? "active" : ""
                        }`}
                      />
                      <p className="categories__name">{renderName}</p>
                    </div>
                  );
                })}
              </div>

              <div className="categories__bottom-row">
                {categories.slice(6).map(({ name, renderName }) => {
                  const IconComponent = iconsMap[name];
                  return (
                    <div
                      key={name}
                      className="categories__category"
                      onClick={() => setActiveCategory(name)}
                    >
                      <p className="categories__money">5000</p>
                      <IconComponent
                        className={`categories__icon ${
                          activeCategory === name ? "active" : ""
                        }`}
                      />
                      <p className="categories__name">{renderName}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Calculations;
