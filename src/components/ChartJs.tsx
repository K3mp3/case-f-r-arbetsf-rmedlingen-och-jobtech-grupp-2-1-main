import { useState, useEffect } from "react";
import { IChartJs } from "./models/IChartJs";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Tooltip, Legend, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Colors } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, CategoryScale, LinearScale, Tooltip, Legend, BarElement, Colors, ChartDataLabels);

interface DisplayChartProps {
    jobId: string;
  }

const DisplayChart = ({jobId}: DisplayChartProps) => {
    const [chartData, setChartData] = useState<IChartJs | undefined>(undefined);

    const fetchData = async () => {
        const response = await fetch(`https://jobed-connect-api.jobtechdev.se/v1/enriched_occupations?occupation_id=${jobId}&include_metadata=true`);
        const data: IChartJs = await response.json();
        
        setChartData(data);
    };

    useEffect(() => {
        fetchData();
    }, [jobId]);

    const data = {
        labels: chartData?.metadata.enriched_candidates_term_frequency.competencies.map((competency) => competency.term).slice(0, 10),
        datasets: [{
            label: chartData?.occupation_label,
            data: chartData?.metadata.enriched_candidates_term_frequency.competencies.map((competency) => competency.percent_for_occupation).slice(0, 10),
            backgroundColor: [
            "rgba(254,192,0, 0.7)", 
            "rgba(255,230,153, 0.7)",],
            borderColor: [
                "rgba(254,192,0, 1)", 
                "rgba(255,230,153, 1)",],
            borderWidth: 3,
            hoverBorderWidth: 4,
            borderRadius: 8,
        }]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                display: false,
                ticks: {
                    color: "black",
                    font: {size: 10},
                },
            },
            x: {
                ticks: {
                    color: "black",
                    font: {size: 12},
                },
            },
        },
        plugins: {
            datalabels: {
                display: true,
                color: "black",
                font: {size: 10},
                align: "top" as const,
                //anchor: "end" as const,
                formatter: (value: number) => {
                    return value.toFixed(2) + "%";
                },
            },
            legend: {
                display: false,
                position: "top" as const,
                labels: {
                    color: "white",
                    font: {size: 20},
                },
            },
        },
    };    

    return (
        <div>
        {window.innerWidth >= 1200 && (
          <h1 style={{ color: "black", fontSize: "20px", textAlign: "center" }}>
            {chartData?.occupation_label}
          </h1>
        )}
        <Bar data={data} width={900} height={600} options={options} />
      </div>
    );
}

export default DisplayChart;




