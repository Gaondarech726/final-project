import { useState, useRef, useEffect } from "react";
import "./Report.scss";
import { Modal } from "../Modal/Modal";

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
  const [category, setCategory] = useState("");
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

    const newEntry = {
      id: Date.now(),
      type,
      date: new Date(date).toLocaleDateString("uk-UA"),
      description,
      amount: parseFloat(amount).toFixed(2),
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
                        🗑
                      </button>
                    </li>
                  </ul>
                ))}
            </div>
          </div>

          {/* Місячне зведення */}
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
