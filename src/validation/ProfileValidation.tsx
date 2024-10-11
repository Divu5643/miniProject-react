import * as yup from "yup";

const employeeProfileSchema = yup.object().shape({
    personalEmail: yup.string().required().email(),
    name: yup.string().required(),
    dateOfBirth:yup.date().required(),
    gender:yup.string().required().max(7),
    phone:yup.string().required().max(10).min(10).matches(/[0-9]/)
})
export default employeeProfileSchema
