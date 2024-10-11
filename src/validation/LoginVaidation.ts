import * as yup from "yup";

const LoginSchema = yup.object().shape({
    email:yup.string().required("Required field for Login").email("Need a valid Email Address"),
    password:yup.string().required("Required field for Login")
}) 
export default LoginSchema;