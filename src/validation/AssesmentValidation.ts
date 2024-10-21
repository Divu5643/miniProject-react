import * as yup from "yup";

const AssesmentSchema = yup.object().shape({
    technicalSkill: yup.number().typeError('Technical skill is a required field').min(1).max(30),
    softSkill: yup.number().typeError('Soft skill is a required field').min(1).max(30),
    teamworkSkill: yup.number().typeError('Teamkwork skill is a required field').min(1).max(30),
    deliveryTime: yup.string().required("Delivery Time is a required field").min(1).max(30),
    remark: yup.string().required("Remark is a required field")
    .matches(/^[a-zA-Z0-9_ ]*$/,"Only Alphanumeric Characters and underscore.")
})

export default AssesmentSchema ;