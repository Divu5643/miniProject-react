import * as yup from "yup";

const ReviewerSchema = yup.object().shape({
    EmployeeId : yup.string().matches(/[0-9]/,"This is a requried Field").min(1,"This is a Required Field"),
    ManagerId:yup.string().matches(/[0-9]/,"This is a requried Field").min(1,"This is a Required Field"),
    ReviewType:yup.string().required("This is a required Field"),
}) 
export default ReviewerSchema;