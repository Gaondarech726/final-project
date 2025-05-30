import { useEffect, useRef, useState } from "react";
import { Modal } from "../Modal/Modal";
import "./Report.scss";

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

const Report = () => {
  const [type, setType] = useState("Витрати");
  const [customCategory, setCustomCategory] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("entries");
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
    setDate(() => {
      const today = new Date();
      return today.toISOString().split("T")[0];
    });
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

    const currentBalance = parseFloat(localStorage.getItem("balance")) || 0;
    const entryAmount = parseFloat(amount);

    if (type === "Витрати" && entryAmount > currentBalance) {
      alert("Недостатньо коштів на рахунку!");
      return;
    }

    const newBalance =
      type === "Витрати"
        ? currentBalance - entryAmount
        : currentBalance + entryAmount;

    localStorage.setItem("balance", newBalance.toFixed(2));

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
    setEntries(entries.filter((entry) => entry.id !== entryToDelete));
    setIsModalOpen(false);
    setEntryToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setEntryToDelete(null);
  };

  return (
    <div className="report-container">
      <div className="report-nav-container">
        <button
          className={`finance ${type === "Витрати" ? "_active" : ""}`}
          onClick={() => setType("Витрати")}
        >
          Витрати
        </button>
        <button
          className={`finance ${type === "Дохід" ? "_active" : ""}`}
          onClick={() => setType("Дохід")}
        >
          Дохід
        </button>
      </div>

      <div className="cost-container">
        <div className="filter-container" ref={inputSectionRef}>
          <div className="date-wrapper">
            <input
              type="date"
              className="choose-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="bill-container">
            <input
              className="product-description"
              type="text"
              placeholder="Опис товару"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={25}
              spellCheck={true}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddEntry();
                if (e.key === "Delete") handleClearFields();
              }}
            />

            {type === "Витрати" ? (
              expenseCategory !== "Інше" ? (
                <select
                  className="product-category"
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                >
                  <option value="" disabled>
                    Категорія витрат
                  </option>
                  {[
                    "Транспорт",
                    "Продукти",
                    "Здоров'я",
                    "Алкоголь",
                    "Розваги",
                    "Все для дому",
                    "Техніка",
                    "Комунальний зв'язок",
                    "Спорт, хобі",
                    "Навчання",
                    "Інше",
                  ].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="product-category"
                  type="text"
                  placeholder="Інше..."
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                />
              )
            ) : incomeCategory !== "Інше" ? (
              <select
                className="product-category"
                value={incomeCategory}
                onChange={(e) => setIncomeCategory(e.target.value)}
              >
                <option value="" disabled>
                  Категорія доходу
                </option>
                {["ЗП", "Дод. прибуток", "Інше"].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="product-category"
                type="text"
                placeholder="Інше..."
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            )}

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

          <div className="btn-operators-container">
            <button className="btn-orange _enter-btn" onClick={handleAddEntry}>
              Ввести
            </button>
            <button className="btn-grey _clear-btn" onClick={handleClearFields}>
              Очистити
            </button>
          </div>
        </div>

        <div className="reoprt-list-container">
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
                    <li className="date _data-li">{entry.date}</li>
                    <li className="description _description-li">
                      {entry.description}
                    </li>
                    <li className="category _category-li">{entry.category}</li>
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

          {(() => {
            const getMonthName = (dateString) => {
              const [day, month, year] = dateString.split(".");
              const date = new Date(`${year}-${month}-${day}`);
              return date.toLocaleString("uk-UA", { month: "long" });
            };

            const monthlySummary = {};

            entries
              .filter((entry) => entry.type === type)
              .forEach((entry) => {
                const month = getMonthName(entry.date);
                if (!monthlySummary[month]) {
                  monthlySummary[month] = 0;
                }
                monthlySummary[month] += parseFloat(entry.amount);
              });

            return (
              <div className="reduction _to-upper-case">
                <h3 className="reduction-title">Зведення</h3>
                <div style={{ maxHeight: "238px", overflowY: "auto" }}>
                  {Object.entries(monthlySummary).map(([month, amount]) => (
                    <ul key={month} className="reduction-list">
                      <li>
                        <span className="_mounth-li">{month}</span>
                        <span className="_mounth-amount-li">
                          {amount.toFixed(2)}
                        </span>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {isModalOpen && (
          <Modal
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Report;
