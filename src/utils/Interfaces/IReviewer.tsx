interface IReviewer{
    EmployeeId :number,
    ManagerId:Number,
    ReviewType:string
}
interface IReviewShow{
 reviewId :Number
     employeeId :Number
     employeeName :string
     managerId :Number
     managerName :string
     reviewType :string
}


export default IReviewer;
export type { IReviewShow};