import * as yup from "yup";

const GoalSchema = yup.object().shape({
    userId: yup.string().matches(/[0-9]/).required("This is a required Field").min(1),
    goalOutcome: yup.string().required("This is a required Field").max(300,"Goal cannot be more than 300 characters"),
    completionDate: yup.date().required("This is a required Field").min(new Date()),
})

export default GoalSchema ;