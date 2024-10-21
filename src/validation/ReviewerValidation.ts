import * as yup from "yup";

const ReviewerSchema = yup.object().shape({
    employeeId : yup.string().matches(/[0-9]/,"This is a requried Field").min(1,"This is a Required Field"),
    managerId:yup.string().matches(/[0-9]/,"This is a requried Field").min(1,"This is a Required Field"),
    reviewType:yup.string().required("This is a required Field"),
}) 
export default ReviewerSchema;