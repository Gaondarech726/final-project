import "./Report.scss";

const Report = () => {
  return (
    <div class="report-container">
      <div class="report-nav-container">
        <button class="finance _costs">Витрати</button>
        <button class="finance _income">Дохід</button>
      </div>
      <div class="cost-container">
        <div class="filter-container">
          <div class="date-wrapper">
            <input type="date" class="choose-date" />
          </div>

          <div class="bill-container">
            <input
              class="product-description"
              type="text"
              placeholder="Опис товару"
            />
            <select class="product-category" name="" id="">
              <option value="#" disabled selected>
                Категорія товару
              </option>
              <option value="#">Транспорт</option>
              <option value="#">Продукти</option>
              <option value="#">Здоров'я</option>
              <option value="#">Алкоголь</option>
              <option value="#">Розваги</option>
              <option value="#">Все для дому</option>
              <option value="#">Техніка</option>
              <option value="#">Комунальний зв'язок</option>
              <option value="#">Спорт, хобі</option>
              <option value="#">Навчання</option>
              <option value="#">Інше</option>
            </select>
            <input
              class="amount-input"
              type="number"
              min="0"
              step="0.10"
              placeholder="0,00"
            />
          </div>
          <div class="btn-operators-container">
            <button class="btn-orange _enter-btn">ввести</button>
            <button class="btn-grey _clear-btn">Очистити</button>
          </div>
        </div>

        <div class="reoprt-list-container">
          <div class="bill-table">
            <div class="thead-div">
              <ul class="tr-title _to-upper-case">
                <li class="_data-li">Дата</li>
                <li class="_description-li">Опис</li>
                <li class="_category-li">Категорія</li>
                <li class="_amount-li">Сума</li>
                <li class="_delete-li"></li>
              </ul>
            </div>
            <div class="tbody-div">
              <ul class="day-report">
                <li class="date _data-li">05.09.2019</li>
                <li class="description _description-li">Метро</li>
                <li class="category _category-li">Транспорт</li>
                <li class="amount _amount-li">- 30.00 грн.</li>
                <li class="delete-btn _delete-li">
                  <button class="delete-btn-icon ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M16.3081 4.02333L15.9106 2.832C15.7593 2.37827 15.3362 2.07339 14.858 2.07339H11.5177V0.985886C11.5177 0.442337 11.0758 0 10.5324 0H7.47355C6.93027 0 6.48821 0.442337 6.48821 0.985886V2.07339H3.14809C2.66977 2.07339 2.24666 2.37827 2.09533 2.832L1.6979 4.02333C1.6074 4.29456 1.65326 4.59489 1.82039 4.82684C1.98752 5.05879 2.25792 5.19736 2.54384 5.19736H2.95926L3.8736 16.5038C3.94158 17.3427 4.65349 18 5.49463 18H12.6969C13.5379 18 14.2499 17.3427 14.3178 16.5037L15.2321 5.19736H15.4621C15.748 5.19736 16.0184 5.05879 16.1856 4.82698C16.3527 4.59503 16.3986 4.29456 16.3081 4.02333ZM7.5429 1.05469H10.4631V2.07339H7.5429V1.05469ZM13.2665 16.4187C13.2426 16.7141 12.9924 16.9453 12.6969 16.9453H5.49463C5.1991 16.9453 4.94889 16.7141 4.92499 16.4187L4.01738 5.19736H14.174L13.2665 16.4187ZM2.77002 4.14267L3.09591 3.16571C3.10332 3.14319 3.12433 3.12808 3.14809 3.12808H14.858C14.8818 3.12808 14.9026 3.14319 14.9102 3.16571L15.2361 4.14267H2.77002Z"
                        fill="#52555F"
                      />
                      <path
                        d="M11.5846 16.3813C11.5939 16.3818 11.6031 16.3819 11.6125 16.3819C11.8911 16.3819 12.124 16.1636 12.1386 15.8821L12.6338 6.37587C12.6489 6.085 12.4253 5.83685 12.1346 5.82174C11.843 5.80623 11.5957 6.03007 11.5805 6.32094L11.0854 15.8271C11.0703 16.118 11.2937 16.3661 11.5846 16.3813Z"
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
              <ul></ul>
              <ul></ul>
              <ul></ul>
            </div>
          </div>

          {/* <div class="summary">
            <h3 class="summary-title">Зведення</h3>
            <ul class="summary-list _to-upper-case">
              <li>
                <span>листопад</span>
                <span>10 000.00</span>
              </li>
              <li>
                <span>жовтень</span>
                <span>30 000.00</span>
              </li>
              <li>
                <span>вересень</span>
                <span>30 000.00</span>
              </li>
              <li>
                <span>серпень</span>
                <span>20 000.00</span>
              </li>
              <li>
                <span>липень</span>
                <span>15 000.00</span>
              </li>
              <li>
                <span>червень</span>
                <span>18 000.00</span>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Report;
