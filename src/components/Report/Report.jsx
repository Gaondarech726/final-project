import { useEffect, useRef, useState } from "react";
import { Modal } from "../Modal/Modal";
import "./Report.scss";

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

import { useDispatch, useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";
import { updateBalance } from "../../redux/authSlice";
import CategorySelect from "./CategorySelect/CategorySelect";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#C9CBCF",
  "#6B7280",
];

const Report = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const currentBalance = currentUser ? parseFloat(currentUser.balance) : 0;

  const [type, setType] = useState("Витрати");
  const [customCategory, setCustomCategory] = useState("");
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("financeEntries");
    return saved ? JSON.parse(saved) : [];
  });

  const inputSectionRef = useRef(null);

  useEffect(() => {
    const storedEntries = localStorage.getItem("financeEntries");
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("financeEntries", JSON.stringify(entries));
  }, [entries]);

  const handleClearFields = () => {
    setDescription("");
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setCustomCategory("");
    setExpenseCategory("");
    setIncomeCategory("");
  };

  const handleAddEntry = () => {
    const selectedCategory =
      type === "Витрати"
        ? expenseCategory === "Інше"
          ? customCategory
          : expenseCategory
        : incomeCategory === "Інше"
        ? customCategory
        : incomeCategory;

    if (!description || !selectedCategory || !amount || !date) {
      if (inputSectionRef.current) {
        const instance = tippy(inputSectionRef.current, {
          content: `
            <div style="text-align:left;">
              <strong>Заповніть усі поля!</strong><br/>
              Опис, категорія, сума та дата — обов'язкові
            </div>
          `,
          allowHTML: true,
          placement: "top",
          theme: "light",
          trigger: "manual",
          hideOnClick: true,
        });
        instance.show();
        setTimeout(() => instance.hide(), 3000);
      }
      return;
    }

    const entryAmount = parseFloat(amount);
    if (isNaN(entryAmount) || entryAmount <= 0) return;

    let newBalance = currentBalance;

    if (type === "Витрати") {
      if (
        !currentBalance ||
        currentBalance <= 0 ||
        entryAmount > currentBalance
      ) {
        toast.error("Недостатньо коштів на рахунку", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
        return;
      }
      newBalance -= entryAmount;
    } else {
      newBalance += entryAmount;
    }

    dispatch(updateBalance(newBalance));

    const newEntry = {
      id: Date.now(),
      type,
      date: new Date(date).toLocaleDateString("uk-UA"),
      description,
      amount: entryAmount.toFixed(2),
      category: selectedCategory,
    };

    setEntries([...entries, newEntry]);
    handleClearFields();
  };

  const handleAskDelete = (id) => {
    setEntryToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const entry = entries.find((e) => e.id === entryToDelete);
    if (entry) {
      let newBalance = currentBalance;
      const amountToRemove = parseFloat(entry.amount);
      newBalance =
        entry.type === "Витрати"
          ? newBalance + amountToRemove
          : newBalance - amountToRemove;
      dispatch(updateBalance(newBalance));
    }
    setEntries(entries.filter((e) => e.id !== entryToDelete));
    setIsModalOpen(false);
    setEntryToDelete(null);
  };

  const generateChartData = () => {
    const categoryTotals = {};

    entries
      .filter((entry) => (isMobile ? true : entry.type === type))
      .forEach((entry) => {
        if (!categoryTotals[entry.category]) {
          categoryTotals[entry.category] = 0;
        }
        categoryTotals[entry.category] += parseFloat(entry.amount);
      });

    return Object.entries(categoryTotals).map(([category, value]) => ({
      name: category,
      value: Number(value.toFixed(2)),
    }));
  };

  const [isInputModalOpen, setIsInputModalOpen] = useState(false);

  const handleTypeChange = (newType) => {
    setType(newType);

    if (window.innerWidth < 768) {
      setIsInputModalOpen(true);
    }
  };

  // const handleCloseModal = () => {
  //   setIsInputModalOpen(false);
  // };

  return (
    <div className="report-container">
      {!(isInputModalOpen && isMobile) && (
        <div className="report-nav-container">
          <button
            className={`finance ${type === "Витрати" ? "_active" : ""}`}
            onClick={() => handleTypeChange("Витрати")}
          >
            Витрати
          </button>
          <button
            className={`finance ${type === "Дохід" ? "_active" : ""}`}
            onClick={() => handleTypeChange("Дохід")}
          >
            Дохід
          </button>
        </div>
      )}

      {isInputModalOpen && (
        <div className="modal-overlay">
          <div className="filter-container" ref={inputSectionRef}>
            <button
              className="modal-close"
              onClick={() => setIsInputModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_1_2595)">
                  <path
                    d="M21 11H6.83L10.41 7.41L9 6L3 12L9 18L10.41 16.59L6.83 13H21V11Z"
                    fill="#FF751D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_2595">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>

            <div className="filter-container-adaptive">
              <div className="bill-container ">
                <input
                  className="product-description"
                  type="text"
                  placeholder="Опис товару"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={25}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddEntry();
                    if (e.key === "Delete") handleClearFields();
                  }}
                />
                <CategorySelect
                  type={type}
                  selectedCategory={
                    type === "Витрати" ? expenseCategory : incomeCategory
                  }
                  setSelectedCategory={
                    type === "Витрати" ? setExpenseCategory : setIncomeCategory
                  }
                  customCategory={customCategory}
                  setCustomCategory={setCustomCategory}
                />
              </div>

              <div class="input-container">
                <input
                  className="amount-input "
                  type="number"
                  step="0.10"
                  placeholder="00.00 UAH"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddEntry();
                    if (e.key === "Delete") handleClearFields();
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M17.0312 0H2.96875C1.99949 0 1.21094 0.788555 1.21094 1.75781V18.2422C1.21094 19.2114 1.99949 20 2.96875 20H17.0312C18.0005 20 18.7891 19.2114 18.7891 18.2422V1.75781C18.7891 0.788555 18.0005 0 17.0312 0ZM17.6172 18.2422C17.6172 18.5653 17.3543 18.8281 17.0312 18.8281H2.96875C2.64566 18.8281 2.38281 18.5653 2.38281 18.2422V1.75781C2.38281 1.43473 2.64566 1.17188 2.96875 1.17188H17.0312C17.3543 1.17188 17.6172 1.43473 17.6172 1.75781V18.2422Z"
                    fill="#1D2E4A"
                  />
                  <path
                    d="M15.8594 2.34375H4.14062C3.81703 2.34375 3.55469 2.60609 3.55469 2.92969V7.69531C3.55469 8.01891 3.81703 8.28125 4.14062 8.28125H15.8594C16.183 8.28125 16.4453 8.01891 16.4453 7.69531V2.92969C16.4453 2.60609 16.183 2.34375 15.8594 2.34375ZM15.2734 7.10938H4.72656V3.51562H15.2734V7.10938Z"
                    fill="#1D2E4A"
                  />
                  <path
                    d="M6.48438 9.45312H4.14062C3.81703 9.45312 3.55469 9.71547 3.55469 10.0391V12.3828C3.55469 12.7064 3.81703 12.9688 4.14062 12.9688H6.48438C6.80797 12.9688 7.07031 12.7064 7.07031 12.3828V10.0391C7.07031 9.71547 6.80797 9.45312 6.48438 9.45312ZM5.89844 11.7969H4.72656V10.625H5.89844V11.7969Z"
                    fill="#1D2E4A"
                  />
                  <path
                    d="M6.48438 14.1406H4.14062C3.81703 14.1406 3.55469 14.403 3.55469 14.7266V17.0703C3.55469 17.3939 3.81703 17.6562 4.14062 17.6562H6.48438C6.80797 17.6562 7.07031 17.3939 7.07031 17.0703V14.7266C7.07031 14.403 6.80797 14.1406 6.48438 14.1406ZM5.89844 16.4844H4.72656V15.3125H5.89844V16.4844Z"
                    fill="#1D2E4A"
                  />
                  <path
                    d="M11.1719 9.45312H8.82812C8.50453 9.45312 8.24219 9.71547 8.24219 10.0391V12.3828C8.24219 12.7064 8.50453 12.9688 8.82812 12.9688H11.1719C11.4955 12.9688 11.7578 12.7064 11.7578 12.3828V10.0391C11.7578 9.71547 11.4955 9.45312 11.1719 9.45312ZM10.5859 11.7969H9.41406V10.625H10.5859V11.7969Z"
                    fill="#1D2E4A"
                  />
                  <path
                    d="M11.1719 14.1406H8.82812C8.50453 14.1406 8.24219 14.403 8.24219 14.7266V17.0703C8.24219 17.3939 8.50453 17.6562 8.82812 17.6562H11.1719C11.4955 17.6562 11.7578 17.3939 11.7578 17.0703V14.7266C11.7578 14.403 11.4955 14.1406 11.1719 14.1406ZM10.5859 16.4844H9.41406V15.3125H10.5859V16.4844Z"
                    fill="#1D2E4A"
                  />
                  <path
                    d="M15.8594 9.45312H13.5156C13.192 9.45312 12.9297 9.71547 12.9297 10.0391V17.0703C12.9297 17.3939 13.192 17.6562 13.5156 17.6562H15.8594C16.183 17.6562 16.4453 17.3939 16.4453 17.0703V10.0391C16.4453 9.71547 16.183 9.45312 15.8594 9.45312ZM15.2734 16.4844H14.1016V10.625H15.2734V16.4844Z"
                    fill="#1D2E4A"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="btn-operators-container">
            <button className="btn-orange _enter-btn" onClick={handleAddEntry}>
              Ввести
            </button>
            <button className="btn-grey _clear-btn" onClick={handleClearFields}>
              Очистити
            </button>
          </div>
        </div>
      )}
      <div className="cost-container">
        <div className="filter-container" ref={inputSectionRef}>
          <div className="filter-container-adaptive">
            <div className="date-wrapper">
              <input
                type="date"
                className="choose-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="bill-container _hidden">
              <input
                className="product-description"
                type="text"
                placeholder="Опис товару"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={25}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddEntry();
                  if (e.key === "Delete") handleClearFields();
                }}
              />

              <CategorySelect
                type={type}
                selectedCategory={
                  type === "Витрати" ? expenseCategory : incomeCategory
                }
                setSelectedCategory={
                  type === "Витрати" ? setExpenseCategory : setIncomeCategory
                }
                customCategory={customCategory}
                setCustomCategory={setCustomCategory}
              />

              <input
                className="amount-input"
                type="number"
                step="0.10"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddEntry();
                  if (e.key === "Delete") handleClearFields();
                }}
              />
            </div>
          </div>

          <div className="btn-operators-container _hidden">
            <button className="btn-orange _enter-btn" onClick={handleAddEntry}>
              Ввести
            </button>
            <button className="btn-grey _clear-btn" onClick={handleClearFields}>
              Очистити
            </button>
          </div>
        </div>

        <div className="reoprt-list-container ">
          <div className="bill-table">
            <div className="thead-div">
              <ul className="tr-title _to-upper-case">
                <li className="_data-li">Дата</li>
                <li className="_description-li">Опис</li>
                <li className="_category-li">Категорія</li>
                <li className="_amount-li">Сума</li>
                <li className="_delete-li"></li>
              </ul>
            </div>
            <div className="tbody-div">
              {entries
                .filter((entry) => entry.type === type)
                .map((entry) => (
                  <ul className="day-report" key={entry.id}>
                    <div className="tr-container">
                      <li className="date _data-li">{entry.date}</li>
                      <li className="description _description-li">
                        {entry.description}
                      </li>
                    </div>
                    <li className="category _category-li">{entry.category}</li>
                    {/* {isMobile && (
                        <li className="type _type-li">
                          {entry.type === "Дохід" ? "+ Дохід" : "- Витрати"}
                        </li>
                      )} */}

                    <li
                      className={`amount _amount-li ${
                        entry.type === "Дохід" ? "income" : "expense"
                      }`}
                    >
                      {entry.type === "Витрати" ? "- " : "+ "}
                      {entry.amount} грн.
                    </li>
                    <li className="delete-btn _delete-li">
                      <button
                        className="delete-btn-icon"
                        onClick={() => handleAskDelete(entry.id)}
                        aria-label="Delete"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.3081 4.02333L15.9106 2.832C15.7593 2.37827 15.3362 2.07339 14.858 2.07339H11.5177V0.985886C11.5177 0.442337 11.0758 0 10.5324 0H7.47355C6.93027 0 6.48821 0.442337 6.48821 0.985886V2.07339H3.14809C2.66977 2.07339 2.24666 2.37827 2.09533 2.832L1.6979 4.02333C1.6074 4.29456 1.65326 4.59489 1.82039 4.82684C1.98752 5.05879 2.25792 5.19736 2.54384 5.19736H2.95926L3.8736 16.5038C3.94158 17.3427 4.65349 18 5.49463 18H12.6969C13.5379 18 14.2499 17.3427 14.3178 16.5037L15.2321 5.19736H15.4621C15.748 5.19736 16.0184 5.05879 16.1856 4.82698C16.3527 4.59503 16.3986 4.29456 16.3081 4.02333ZM7.5429 1.05469H10.4631V2.07339H7.5429V1.05469ZM13.2665 16.4187C13.2426 16.7141 12.9924 16.9453 12.6969 16.9453H5.49463C5.1991 16.9453 4.94889 16.7141 4.92499 16.4187L4.01738 5.19736H14.174L13.2665 16.4187ZM2.77002 4.14267L3.09591 3.16571C3.10332 3.14319 3.12433 3.12808 3.14809 3.12808H14.858C14.8818 3.12808 14.9026 3.14319 14.9102 3.16571L15.2361 4.14267H2.77002Z"
                            fill="#52555F"
                          />
                          <path
                            d="M11.5846 16.3813C11.5939 16.3818 11.6031 16.382 11.6125 16.382C11.8911 16.382 12.124 16.1636 12.1386 15.8821L12.6338 6.3759C12.6489 6.08503 12.4253 5.83688 12.1346 5.82177C11.843 5.80626 11.5957 6.0301 11.5805 6.32097L11.0854 15.8272C11.0703 16.118 11.2937 16.3662 11.5846 16.3813Z"
                            fill="#52555F"
                          />
                          <path
                            d="M5.89099 15.8833C5.90637 16.1644 6.139 16.382 6.41709 16.382C6.4267 16.382 6.43659 16.3817 6.44634 16.3811C6.73707 16.3653 6.95995 16.1168 6.94416 15.8259L6.42547 6.31973C6.40968 6.02886 6.16111 5.80598 5.87025 5.82191C5.57952 5.8377 5.35664 6.08627 5.37243 6.37713L5.89099 15.8833Z"
                            fill="#52555F"
                          />
                          <path
                            d="M9.00891 16.382C9.30019 16.382 9.53625 16.1459 9.53625 15.8546V6.34845C9.53625 6.05717 9.30019 5.82111 9.00891 5.82111C8.71764 5.82111 8.48157 6.05717 8.48157 6.34845V15.8546C8.48157 16.1459 8.71764 16.382 9.00891 16.382Z"
                            fill="#52555F"
                          />
                        </svg>
                      </button>
                    </li>
                  </ul>
                ))}
            </div>
          </div>

          <div className="reduction _to-upper-case">
            <h3 className="reduction-title">Зведення</h3>
            <div style={{ maxHeight: "238px", overflowY: "auto" }}>
              {(() => {
                const getMonthName = (dateString) => {
                  const [day, month, year] = dateString.split(".");
                  return new Date(`${year}-${month}-${day}`).toLocaleString(
                    "uk-UA",
                    { month: "long" }
                  );
                };

                const summary = {};
                entries
                  .filter((e) => e.type === type)
                  .forEach((e) => {
                    const month = getMonthName(e.date);
                    summary[month] =
                      (summary[month] || 0) + parseFloat(e.amount);
                  });

                return Object.entries(summary).map(([month, amount]) => (
                  <ul key={month} className="reduction-list">
                    <li>
                      <span className="_mounth-li">{month}</span>
                      <span className="_mounth-amount-li">
                        {amount.toFixed(2)}
                      </span>
                    </li>
                  </ul>
                ));
              })()}
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={generateChartData()}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {generateChartData().map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {isModalOpen && (
          <Modal
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Report;
