import * as yup from "yup";

const employeeSchema = yup.object().shape({
    name: yup.string().required("The name is a required field").max(70,"The Name should be at most 70 characters long"),
    email:yup.string().required("The email is a required field").email("The email is invalid").max(100,"The Email should be at most 100 characters long") ,
    password:yup.string().required("The email is a required field").max(30,"The Email should be at most 30 characters long") ,
    role: yup.string().required("The role is a required field"),
    department: yup.string().required("The department is a required field"),
    designation:yup.string().required("The designation is a required field").max(200,"character Limit Exceeeded")

})
export default employeeSchema;