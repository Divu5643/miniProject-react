import * as yup from "yup";

const employeeSchema = yup.object().shape({
  name: yup
    .string()
    .required("The Name is a required field")
    .max(70, "The Name should be at most 70 characters long").matches(/^[a-zA-Z]*$/,"No numbers or special Characters in the Name. "),
  email: yup.string()
    .email("The Email must be a valid email.")
    .required("The Email is a required field")
    .max(100, "The Email should be at most 100 characters long"),
  // password: yup
  //   .string()
  //   .required("The Email is a required field").min(5,"The Password should be at least 5 characters long")
  //   .max(30, "The Password should be at most 30 characters long"),
  roleId: yup.number().required("The Role is a required field"),
  deptId: yup.number().required("The Department is a required field"),
  designationId: yup.number().required("The Department is a required field"),
});
export default employeeSchema;
