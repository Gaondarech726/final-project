import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DynamicCategoryChart = ({
  activeCategory,
  categoryDisplayName,
  viewMode,
  currentDate,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [financeEntries, setFinanceEntries] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    window.addEventListener("resize", handleResize);

    const storedData = localStorage.getItem("financeEntries");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setFinanceEntries(parsed);
      } catch (e) {
        console.error("Ошибка парсинга financeEntries:", e);
        setFinanceEntries([]);
      }
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!activeCategory || !categoryDisplayName) {
    return (
      <div className="chart__div">
        Оберіть категорію для перегляду деталізації
      </div>
    );
  }

  const typeMap = {
    costs: "Витрати",
    revenues: "Дохід",
  };

  // Фильтруем по категории, типу и по текущей дате
  const filteredEntries = financeEntries.filter(
    (entry) =>
      entry.type === typeMap[viewMode] &&
      entry.category === categoryDisplayName &&
      entry.date === currentDate
  );

  if (filteredEntries.length === 0) {
    return <div className="chart__div">Немає даних для обраної категорії</div>;
  }

  // Группируем суммы по описанию
  const groupedData = {};
  filteredEntries.forEach((entry) => {
    const key = entry.description || "Інше";
    const amount = parseFloat(entry.amount) || 0;
    if (!groupedData[key]) groupedData[key] = 0;
    groupedData[key] += amount;
  });

  const chartDataArray = Object.entries(groupedData).map(([name, value]) => ({
    name,
    value,
  }));

  const data = {
    labels: chartDataArray.map((item) => item.name),
    datasets: [
      {
        label: "Сума (грн)",
        data: chartDataArray.map((item) => item.value),
        backgroundColor: "#FF751D",
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const options = {
    indexAxis: isMobile ? "y" : "x",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = isMobile ? context.parsed.x : context.parsed.y;
            return `${value} грн`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#000", font: { size: 14 } },
      },
      y: {
        grid: { display: false },
        ticks: { color: "#000", font: { size: 14 } },
      },
    },
  };

  return (
    <div className="chart__show">
      <div style={{ minWidth: "100vw", height: "422px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DynamicCategoryChart;
