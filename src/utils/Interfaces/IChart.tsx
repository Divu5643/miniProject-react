interface IchartData{
    name:string,
    data:Number[]
  }
  interface IgoalChartResponse{
    
      year: Number,
      month: Number,
      completedGoal: Number,
      pendingGoal: Number,
    progressGoal: Number
    
   
  }
  interface IpieChartData{
    labels:string[],
    series:number[]
}

interface IperfomanceBarChartData{
year: number,
month:number,
averageScore:number

}

enum numberToMonth{
  "Jan" =1,
        "Feb"=2,
        "Mar"=3,
        "Apr"=4,
        "May"=5,
        "Jun"=6,
        "Jul"=7,
        "Aug"=8,
        "Sep"=9,
        "Oct"=10,
        "Nov"=11,
        "Dec"=12,
}

  export type {IchartData,IgoalChartResponse,IpieChartData,IperfomanceBarChartData}
  export{numberToMonth};