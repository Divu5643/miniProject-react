interface IReviewer{
    EmployeeId :number,
    ManagerId:Number,
    ReviewType:string
}
interface IReviewShow{
 reviewId :number
     employeeId :Number
     employeeName :string
     managerId :Number
     managerName :string
     reviewType :string
}

interface IuserByManager{
        managerId :Number;
         employeeId :Number;
         employeeName :string;
         email :string;
         department :string;
}

export default IReviewer;
export type { IReviewShow,IuserByManager};