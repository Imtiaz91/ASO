import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { IMember, IMembership_category, IMohallah } from '../interfaces';

 @Injectable({  
  providedIn: 'root'  
})  
  
export class MemberService {  
  //url = environment.serverUrl;
  url = 'https://localhost:44373/';  
  constructor(private http: HttpClient) { }  
  getAllMohallah(): Observable<IMohallah[]> {  
    return this.http.get<IMohallah[]>(this.url  + 'membership/GetAllMohallah');  
  }  
  getMemberById(memeberid: number): Observable<IMember> {  
    return this.http.get<IMember>(this.url + 'membership/GetMemberbyid?id=' + memeberid);  
  }  
  createEmployee(member: IMember): Observable<IMember> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<IMember>(this.url + 'membership/InsertMember/',  
    member, httpOptions);  
  }  
  updateEmployee(member: IMember): Observable<IMember> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<IMember>(this.url + 'membership/UpdateMember/',  
    member, httpOptions);  
  }  
  deleteEmployeeById(employeeid: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + 'membership/DeleteEmployeeDetails?id=' +employeeid,  
 httpOptions);  
  }  
  getAllMemberCategory(): Observable<IMembership_category[]> {  
    return this.http.get<IMembership_category[]>(this.url + 'membership/GetAllMemberCategory');  
  }  
}