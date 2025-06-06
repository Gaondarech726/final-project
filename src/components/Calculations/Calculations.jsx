import { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";

import { ReactComponent as AlcoholIcon } from "./svg/costs/Alcohol.svg";
import { ReactComponent as CommunicationIcon } from "./svg/costs/Communication.svg";
import { ReactComponent as EducationIcon } from "./svg/costs/Education.svg";
import { ReactComponent as EntertainmentIcon } from "./svg/costs/Entertainment.svg";
import { ReactComponent as EquipmentIcon } from "./svg/costs/Equipment.svg";
import { ReactComponent as EverythingForTheHomeIcon } from "./svg/costs/EverythingForTheHome.svg";
import { ReactComponent as HealthIcon } from "./svg/costs/Health.svg";
import { ReactComponent as OtherIcon } from "./svg/costs/Other.svg";
import { ReactComponent as ProductsIcon } from "./svg/costs/Products.svg";
import { ReactComponent as SportIcon } from "./svg/costs/Sport.svg";
import { ReactComponent as TransportIcon } from "./svg/costs/Transport.svg";
import { ReactComponent as AdditionalRevenueIcon } from "./svg/revenues/AdditionalRevenue.svg";
import { ReactComponent as SalaryIcon } from "./svg/revenues/Salary.svg";

import { Link } from "react-router-dom";
import Header from "./../Header/Header";
import "./Calculations.scss";
import DynamicCategoryChart from "./DynamicCategoryChart";

const Calculations = () => {
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const currentUser = useSelector((state) => state.auth.currentUser);
  const [inputBalance, setInputBalance] = useState(currentUser?.balance || "");

  const [viewMode, setViewMode] = useState("costs");
  const [activeCategory, setActiveCategory] = useState(null);

  const [financeEntries, setFinanceEntries] = useState([]);

  useEffect(() => {
    setInputBalance(currentUser?.balance || "");
  }, [currentUser]);

  useEffect(() => {
    const data = localStorage.getItem("financeEntries");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setFinanceEntries(parsed);
      } catch (e) {
        setFinanceEntries([]);
      }
    } else {
      setFinanceEntries([]);
    }
  }, []);

  const categoriesCosts = [
    { order: 1, name: "products", renderName: "Продукти" },
    { order: 2, name: "alcohol", renderName: "Алкоголь" },
    { order: 3, name: "entertainment", renderName: "Розваги" },
    { order: 4, name: "health", renderName: "Здоров'я" },
    { order: 5, name: "transport", renderName: "Транспорт" },
    { order: 6, name: "everythingForTheHome", renderName: "Все для дому" },
    { order: 7, name: "equipment", renderName: "Техніка" },
    { order: 8, name: "communication", renderName: "Комуналка, Зв’язок" },
    { order: 9, name: "sport", renderName: "Спорт" },
    { order: 10, name: "education", renderName: "Навчання" },
    { order: 11, name: "other", renderName: "Інше" },
  ];

  const categoriesRevenues = [
    { order: 1, name: "salary", renderName: "ЗП" },
    { order: 2, name: "additionalRevenue", renderName: "Дод. прибуток" },
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
    salary: SalaryIcon,
    additionalRevenue: AdditionalRevenueIcon,
  };

  const toggleDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setHours(0, 0, 0, 0);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1);
    } else if (direction === "next") {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "costs" ? "revenues" : "costs"));
    setActiveCategory(null);
  };

  const currentCategories =
    viewMode === "costs" ? categoriesCosts : categoriesRevenues;

  const filteredEntries = financeEntries.filter(
    (entry) =>
      entry.type === (viewMode === "costs" ? "Витрати" : "Дохід") &&
      entry.date === formatDate(selectedDate)
  );

  const getSumByCategory = (renderName) => {
    if (renderName === "Інше") {
      const allRenderNames = currentCategories.map((cat) => cat.renderName);
      return filteredEntries
        .filter((entry) => !allRenderNames.includes(entry.category))
        .reduce((total, entry) => total + Number(entry.amount), 0);
    }

    return filteredEntries
      .filter((entry) => entry.category === renderName)
      .reduce((total, entry) => total + Number(entry.amount), 0);
  };

  const totalCosts = financeEntries
    .filter(
      (entry) =>
        entry.type === "Витрати" && entry.date === formatDate(selectedDate)
    )
    .reduce((sum, entry) => sum + Number(entry.amount), 0);

  const totalRevenues = financeEntries
    .filter(
      (entry) =>
        entry.type === "Дохід" && entry.date === formatDate(selectedDate)
    )
    .reduce((sum, entry) => sum + Number(entry.amount), 0);

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
                <MdKeyboardArrowLeft
                  className="period__arrow"
                  onClick={() => toggleDate("prev")}
                />
                <p className="period__date">{formatDate(selectedDate)}</p>
                <MdKeyboardArrowRight
                  className="period__arrow"
                  onClick={() => toggleDate("next")}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="calc-expenses__income">
          <div className="calc-expenses_income-show">
            <div className="calc-expenses">
              <p className="calc-expenses__p">Витрати: </p>
              <p className="calc-expenses__number">
                - {totalCosts.toFixed(2)} грн
              </p>
            </div>
            <div className="verticalLine"></div>
            <div className="calc-income">
              <p className="calc-income__p">Доходи: </p>
              <p className="calc-income__number">
                + {totalRevenues.toFixed(2)} грн
              </p>
            </div>
          </div>
        </section>

        <section className="calc-costs">
          <div className="calc-costs-show">
            <div className="costs__div">
              <MdKeyboardArrowLeft
                className="costs__arrow"
                onClick={toggleViewMode}
              />
              <p className="costs__p">
                {viewMode === "costs" ? "Витрати" : "Доходи"}
              </p>
              <MdKeyboardArrowRight
                className="costs__arrow"
                onClick={toggleViewMode}
              />
            </div>

            <div className="costs__categories">
              <div className="categories__top-row">
                {currentCategories.slice(0, 6).map(({ name, renderName }) => {
                  const IconComponent = iconsMap[name];
                  const sum = getSumByCategory(renderName);
                  return (
                    <div
                      key={name}
                      className="categories__category"
                      onClick={() => setActiveCategory(renderName)}
                    >
                      <p className="categories__money">{sum.toFixed(2)}</p>
                      <IconComponent
                        className={`categories__icon ${
                          activeCategory === renderName ? "active" : ""
                        }`}
                      />
                      <p className="categories__name">{renderName}</p>
                    </div>
                  );
                })}
              </div>

              {currentCategories.length > 6 && (
                <div className="categories__bottom-row">
                  {currentCategories.slice(6).map(({ name, renderName }) => {
                    const IconComponent = iconsMap[name];
                    const sum = getSumByCategory(renderName);
                    return (
                      <div
                        key={name}
                        className="categories__category"
                        onClick={() => setActiveCategory(renderName)}
                      >
                        <p className="categories__money">{sum.toFixed(2)}</p>
                        <IconComponent
                          className={`categories__icon ${
                            activeCategory === renderName ? "active" : ""
                          }`}
                        />
                        <p className="categories__name">{renderName}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="calc-chart">
              <DynamicCategoryChart
                activeCategory={activeCategory}
                categoryDisplayName={
                  currentCategories.find((cat) => cat.name === activeCategory)
                    ?.renderName
                }
                viewMode={viewMode}
                currentDate={formatDate(selectedDate)}
                currentCategories={currentCategories}
              />
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Calculations;
