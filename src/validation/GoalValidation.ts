import * as yup from "yup";

const GoalSchema = yup.object().shape({
    userId: yup.string().matches(/[0-9]/).required("The Employee Name is a required Field."),
    goalOutcome: yup.string().required("The Goal Outcome is a required Field.").max(300,"Goal cannot be more than 300 characters."),
    completionDate: yup.date().required("The Completion Date is a required Field.").min(new Date(),"The Completion date should be greater than today."),
})

export default GoalSchema ;