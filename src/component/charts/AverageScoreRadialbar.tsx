
import Chart from "react-apexcharts";

const AverageScoreRadialBar = ({data}:{data:Number}) => {
  
  var options = {
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 225,
       hollow: {
        margin: 0,
        size: '70%',
        background: '#fff',
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: 'front',
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24
        }
      },
      track: {
        background: '#fff',
        strokeWidth: '67%',
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35
        }
      },
  
      dataLabels: {
        show: true,
        name: {
          offsetY: -10,
          show: true,
          color: '#888',
          fontSize: '17px'
        },
        value: {
          formatter: function(val:string) {
            return `${val}`;
          },
          color: '#111',
          fontSize: '36px',
          show: true,
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#ABE5A1'],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
  stroke: {
    lineCap: 'round'
  },
  labels: ['Average score'],
  };


  return (
    <>
    <div className="hello">

    <Chart options={options} series={[data]} type='radialBar'  width={"350px"} />
    </div>
    </>
  )
}

export default AverageScoreRadialBar