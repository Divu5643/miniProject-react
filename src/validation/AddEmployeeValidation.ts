import * as yup from "yup";

const employeeSchema = yup.object().shape({
  name: yup
    .string()
    .required("The name is a required field")
    .max(70, "The Name should be at most 70 characters long").matches(/^[a-zA-Z]*$/,"No numbers or special Characters in the Name. "),
  email: yup
    .string()
    .required("The email is a required field")
    .email("The email is invalid")
    .max(100, "The Email should be at most 100 characters long"),
  password: yup
    .string()
    .required("The email is a required field").min(5,"The password should be at least 5 characters long")
    .max(30, "The password should be at most 30 characters long"),
  role: yup.string().required("The role is a required field"),
  department: yup.string().required("The department is a required field"),
  designation: yup
    .string()
    
    .max(200, "character Limit Exceeeded"),
});
export default employeeSchema;
