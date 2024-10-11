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
  export type {IchartData,IgoalChartResponse,IpieChartData}