interface Iuser{
    userid:number;
    name:string;
    email?:string;
    password?:string;
    roleId?:number;
    deptId?:number;
    designationId? :number;
    isDeleted?:boolean;
}

enum userRole{
    "admin" = 1,
    "manager" = 2,
    "employee" = 3
}
export type {Iuser};
export {userRole};