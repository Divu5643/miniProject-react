import * as yup from "yup";

const AssesmentSchema = yup.object().shape({
    technicalSkill: yup.number().typeError('The Technical skill is a required field').min(1).max(30),
    softSkill: yup.number().typeError('The Soft skill is a required field').min(1).max(30),
    teamworkSkill: yup.number().typeError('The Teamkwork skill is a required field').min(1).max(30),
    deliveryTime: yup.string().required("The Delivery Time is a required field").min(1,"The Delivery Time is a required field").max(30),
    remark: yup.string().required("The Remark is a required field")
    .matches(/^[a-zA-Z0-9_ ]*$/,"Only Alphanumeric Characters and underscore.")
})

export default AssesmentSchema ;