import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SalesChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Simular datos de una API
    const fetchData = async () => {
      const simulatedData = {
        labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        datasets: [
          {
            label: "Ventas en el año",
            data: [12, 19, 3, 5, 2, 3, 10, 15, 7, 12, 20, 25],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      };
      setChartData(simulatedData);
    };

    fetchData();
  }, []);

  if (!chartData) return <p>Cargando gráfico...</p>;

  return <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />;
};

export default SalesChart;
