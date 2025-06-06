import React, { useEffect, useRef, useState } from "react";
import "./CategorySelect.scss";

const CategorySelect = ({
  type,
  selectedCategory,
  setSelectedCategory,
  customCategory,
  setCustomCategory,
}) => {
  const expenseCategories = [
    "Транспорт",
    "Продукти",
    "Здоров'я",
    "Алкоголь",
    "Розваги",
    "Все для дому",
    "Техніка",
    "Комуналка, зв'язок",
    "Спорт, хобі",
    "Навчання",
    "Інше",
  ];

  const incomeCategories = ["ЗП", "Дод. прибуток", "Інше"];
  const categories = type === "Витрати" ? expenseCategories : incomeCategories;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (cat) => {
    setSelectedCategory(cat);
    if (cat !== "Інше") setCustomCategory("");
    setDropdownOpen(false);
  };

  return selectedCategory !== "Інше" ? (
    <div className="custom-select" ref={wrapperRef}>
      <div
        className={`select-selected ${
          dropdownOpen ? "select-arrow-active" : ""
        }`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {selectedCategory || "Категорія товару"}
        <svg
          className="select-arrow"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
        >
          <path d="M1 6L6 2L11 6" stroke="#C7CCDC" strokeWidth="2" />
        </svg>
      </div>
      {dropdownOpen && (
        <div className={`select-items ${dropdownOpen ? "open" : ""}`}>
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => handleSelect(cat)}
              className={cat === selectedCategory ? "same-as-selected" : ""}
            >
              {cat}
            </div>
          ))}
        </div>
      )}
    </div>
  ) : (
    <input
      className="product-category"
      type="text"
      placeholder="Інше..."
      value={customCategory}
      onChange={(e) => setCustomCategory(e.target.value)}
    />
  );
};

export default CategorySelect;
