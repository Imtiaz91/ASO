import * as internal from "assert";

export interface ISession {
    username: string;
    password:string;
}
export interface Notification {
    id: number;
    message: string;
    group_name: string;
    records: number;
    notify_date: Date;
    isRead: string;
    createdOn: Date;
    createdBy: number;
    isDeleted: number;
    userId: number;
    unreadNoti: number;
}

export interface IMember {
    id : number;
    membership_no:string;
    name: string;
    father_name: string;
    dbo : Date;    
    cnic_number :string;
    mobile_number : string;
    email_address : string;
    membership_category_id:number;
    qualification: string;
    employed: string;
    name_of_org: string;
    permanent_address: string;
    residential_address:string;
    gender:number,
    mohallah: string;
    province: string;
    city: string;
    reg_date:Date;
    yearof_passing:string;
    profession:string;
    created_on : Date;
    created_by : number;
    modified_at : Date;
    modified_by : number;
    is_deleted : number;
    memebership_type_code : number;
    photo : string;  
    display_photo:string;
    designation:string; 
  

}
export interface IMembership_category
{
    id : number;
    code:string;
    Description: string;
    fee:number;

}

export interface IMohallah
{
    id : number;
    code:string;
    Name: string;
}

//    const gender = [{
//         'checked': true,
//         'name': 'Male',
//         'value': '1',
//       },
//       {
//         'checked': false,
//         'name': 'Female',
//         'value': '0',
//       }]
