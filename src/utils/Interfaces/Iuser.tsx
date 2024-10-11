interface Iuser{
    userid:number;
    name:string;
    email?:string;
    password?:string;
    role?:string;
    department?:string;
    designation? :string;
    isDeleted?:boolean;
}

export type {Iuser};