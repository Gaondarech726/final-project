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

const demoData = {
  costs: {
    products: [
      { name: "Свинина", value: 1200 },
      { name: "Яловичина", value: 900 },
      { name: "Курятина", value: 600 },
    ],
    alcohol: [
      { name: "Пиво", value: 300 },
      { name: "Вино", value: 450 },
    ],
  },
  revenues: {
    salary: [
      { name: "Основна ЗП", value: 10000 },
      { name: "Бонус", value: 2000 },
    ],
    additionalRevenue: [
      { name: "Фріланс", value: 2500 },
      { name: "Інвестиції", value: 1000 },
    ],
  },
};

const DynamicCategoryChart = ({ activeCategory, viewMode }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartData =
    (demoData[viewMode] && demoData[viewMode][activeCategory]) || [];

  if (!activeCategory || chartData.length === 0) {
    return (
      <div className="chart__div">
        Оберіть категорію для перегляду деталізації
      </div>
    );
  }

  const data = {
    labels: chartData.map((item) => item.name),
    datasets: [
      {
        label: "Сума (грн)",
        data: chartData.map((item) => item.value),
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
          label: (context) => `${context.parsed.x || context.parsed.y} грн`,
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
      <div
        style={{
          minWidth: "100vw",
          height: "422px",
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DynamicCategoryChart;
