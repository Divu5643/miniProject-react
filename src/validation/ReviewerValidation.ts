import * as yup from "yup";

const ReviewerSchema = yup.object().shape({
    EmployeeId : yup.number().min(1,"This is a Required Field"),
    ManagerId:yup.number().min(1,"This is a Required Field"),
    ReviewType:yup.string().required("This is a required Field"),
}) 
export default ReviewerSchema;