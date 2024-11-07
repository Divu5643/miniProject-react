import Chart from "react-apexcharts";

import { IchartData } from "../../utils/Interfaces/IChart";


const GoalsChart:React.FC< { chartData: IchartData[] }> = ({ chartData }) => {
  let options = {
    chart: {
      type: "bar",
      width: "100%",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Goals Information",
      align: "center",
      style: {
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    stroke: {
      show: false,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      title: {
        text: "goals",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: string) {
          return "" + val + "Goals";
        },
      },
    },
  };

  return (
    <>
      <Chart options={options} series={chartData} type="bar" width="90%" />
    </>
  );
};

export default GoalsChart;
