import "./Report.scss";
const Report = () => {
  <div class="report-container">
    <div class="repirt-nav-container">
      <button class="finance _costs">Витрати</button>
      <button class="finance _income">Дохід</button>
    </div>
    <div class="cost-container">
      <div class="filter-container">
        <div class="date-container">
          <input type="date" id="today-date" />
        </div>
        <div class="search-container">
          <input
            class="product-description"
            type="text"
            value="Опис товару"
            disabled
          />
          <select class="product-category" name="" id="">
            <option value="" disabled selected>
              Категорія товару
            </option>
            <option value="transportation">Транспорт</option>
            <option value="food">Продукти</option>
            <option value="health">Здоров'я</option>
            <option value="alcochol">Алкоголь</option>
            <option value="entertainment.">Розваги</option>
            <option value="garden">Все для дому</option>
            <option value="technique">Техніка</option>
            <option value="utility communications">Комунальний зв'язок</option>
            <option value="sport-hobby">Спорт, хобі</option>
            <option value="study">Навчання</option>
            <option value="other">Інше</option>
          </select>
          <input class="sum-input" type="text" value="0,00" disabled />
        </div>
        <div class="btn-operators-container">
          <button class="btn-orange _enter-btn">ввести</button>
          <button class="btn-grey _clear-btn">Очистити</button>
        </div>
      </div>
      <div class="reoprt-list-container">
        <table class="bill-table">
          <tr>
            <th>Дата</th>
            <th>Опис</th>
            <th>Категорія</th>
            <th>Сума</th>
          </tr>
        </table>

        <table class="bill-calendar-table">
          <tr>
            <th>зведення</th>
          </tr>
          <tr>
            <th>листопад</th>
            <th>10 000.00</th>
          </tr>
        </table>
      </div>
    </div>
  </div>;
};

export default Report;
