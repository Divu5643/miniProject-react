import * as yup from "yup";

const employeeProfileSchema = yup.object().shape({
    personalEmail: yup.string().required("The Personal Email is a Required field.").email("The Email entered is invalid"),
    name: yup.string().required("The Name is a Required field."),
    dateOfBirth:yup.date().required("The Birth Date is a Required field."),
    gender:yup.string().required().max(7),
    phone:yup.string().required("The Phone is a Required field.")
    .max(10,"The Phone must contain atmost 10 character.").min(10,"The Phone must contain atleast 10 character.").matches(/[0-9]/,"The Phone is Invalid")
})
export default employeeProfileSchema
