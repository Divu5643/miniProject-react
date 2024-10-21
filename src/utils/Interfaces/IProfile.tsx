import { Dayjs } from "dayjs";

interface IProfile{
    userId?:Number,
    name?:string,
    designation?:string,
    department?:string,
    reportingManager?:string,
    dateOfBirth?: Dayjs |null,
    gender?:string,
    email?:string,
    phone?:string,
    personalEmail?:string
}
export default IProfile;