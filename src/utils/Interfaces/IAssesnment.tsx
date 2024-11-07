interface IAssesmentFormData{
    technicalSkill: string | Number ,
    softSkill:  string | Number ,
    teamworkSkill: string | Number ,
    deliveryTime: string | Number ,
    remark: string 
}

interface IPerfomanceData{
    performanceId: Number,
    reviewDate:string|Date,
    technicalSkill:  Number,
    softSkill:   Number,
    teamworkSkill:  Number,
    deliveryTime:  Number,
    remark: string ,
    userId: Number,
    createdBy:Number
}
export type{IPerfomanceData,IAssesmentFormData}
export default IAssesmentFormData;