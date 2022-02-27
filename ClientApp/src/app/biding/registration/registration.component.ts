import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { IMember } from '../../interfaces';
import { MemberService } from '../../service/member.service';
import { debug } from 'console';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  dataSaved = false;  
  public memmberid : number;
  memberIdUpdate = null;  
  massage = null;  
 isButtonVisible =false;
 listrequirmentshow=true;
 fileToUpload: any;
 imageUrl:any;
 memeberForm: FormGroup;
 genders: any=[];
 mohallah:any=[];
 categories:any=[];
 public statusKeys;

 public member : IMember = <IMember>{};
  constructor(  private route : ActivatedRoute,public builder: FormBuilder,private memeberService:MemberService,
    private router: Router,public http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private cd: ChangeDetectorRef,private _sanitizer: DomSanitizer) {
      this.createForm();
  
    this.imageUrl = "/assets/img/avatar4.png";
   }
   @ViewChild('chat',{static:true}) chat;
   createForm(){
     this.memeberForm = this.builder.group({
       'id': [0, []],
       'membership_no': ['', []],
       'name':['', Validators.required],
       'father_name':['', Validators.required],
       'acadmic_qualification': ['',[]],
       'mobile_number': ['', Validators.required],
       'email_address': ['', Validators.required],
       'status': [''],
       'cnic_number': ["", []],
       'dbo':[Date,[]],
       'reg_date': [Date,[]],
       'membership_category_id': ["1"],
       'residential_address': ['', []],
       'permanent_address': ['', []],
       'gender': [1, []],             
       'profession': ['1',[]],
       'qualification': ['',[]],
       'employed_name': ['',[]],
       'designation': ['',[]],
       'yearof_passing': [200,[]],
       'province': ['',[]],
       'city': ['',[]],  
       'photo': ['',[]],  
     });
     //this.rowValidateBidDetailsForm(0, 'add');
   }
  ngOnInit() {
    debugger;
    this.memmberid = +this.route.snapshot.paramMap.get('id');
  this.getMohallah();
  this.getmembercategories();
  if(this.memmberid !=null && this.memmberid >0)
  this.rowValidateBidDetailsForm(this.memmberid);
  }
  rowValidateBidDetailsForm(i: number, scenario?:string){
    let scope = this;  
    this.memeberService.getMemberById(i).subscribe(result => {
    //this.http.get<IMember>(this.baseUrl + 'membership/').subscribe(result => {
     console.log('rfq ',result);  
     scope.member = result;
     this.memberIdUpdate = scope.member.id;
      scope.memeberForm.patchValue({
        memebership_no: scope.member.membership_no,
        name : scope.member.name,
        father_name : scope.member.father_name,
        cnic_number:scope.member.cnic_number,
        dbo : scope.member.dbo,
        employed_name: scope.member.employed,
        mobile_number:scope.member.mobile_number,
        email_address :scope.member.email_address,
       membership_category_id :scope.member.memebership_type_code,
       reg_date  :scope.member.reg_date,
        gender :scope.member.gender,
        qualification:scope.member.qualification,
        profession:scope.member.profession,
        yearof_passing:scope.member.yearof_passing,
        designation :scope.member.designation,
       residential_address:scope.member.residential_address,
       permanent_address:scope.member.permanent_address,
       province:scope.member.province,
       city:scope.member.city,
       photo:scope.member.photo,
       display_photo: this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + scope.member.photo),
       
     });
     this.imageUrl = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + scope.member.photo); 
  });
}
uploadFile(event) {
  debugger;
  let reader = new FileReader(); // HTML5 FileReader API
  let file = event.target.files[0];
  // reader.readAsDataURL(file);  
  // const fileSize = file.size / 1024 / 1024; // in MiB
  // if (fileSize > 4) {
  //   this.massage = 'Record Updated Successfully';  
  //   return false;
  // }
  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(file);

    // When file uploads set it to file formcontrol
    reader.onload = () => {
      this.imageUrl = reader.result;
      this.memeberForm.patchValue({
        photo: reader.result
      });
      // this.editFile = false;
      // this.removeUpload = true;
    }
    // ChangeDetectorRef since file is loading outside the zone
    this.cd.markForCheck();        
  }
}
ontestlistclick()
{ 
  this.listrequirmentshow= this.listrequirmentshow ? false : true;
  console.log(this.listrequirmentshow);
}
printPage() {
  window.print();
}
onSubmit() {
  this.dataSaved = false;  
  const member = this.memeberForm.value; 
  // if(!ValidationService.validateForm(this.memeberForm)){
  //   return false;
  // }
  console.log(this.memeberForm.value);
  this.CreateEmployee(member);  
  //this.memeberForm.reset();  

}
CreateEmployee(member: IMember) {  
  if (this.memberIdUpdate == null) {  
    this.memeberService.createEmployee(member).subscribe(  
      () => {  
        this.dataSaved = true;  
        this.massage = 'Record saved Successfully';  
       // this.loadAllEmployees();  
        this.memberIdUpdate = null;  
        this.memeberForm.reset();  
      }  
    );  
  } else {  
    member.id = this.memberIdUpdate;  
    this.memeberService.updateEmployee(member).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Updated Successfully';  
    
      this.memberIdUpdate = null;  
      this.memeberForm.reset();  
    });  
  }  
}   
 
resetForm() {  
  this.memeberForm.reset();  
  this.massage = null;  
  this.dataSaved = false;  
} 
getMohallah() {
  this.memeberService.getAllMohallah().subscribe(result => {
    console.log("mohallah",result);
    this.mohallah = result;
  }, error => console.error(error));
}
getmembercategories() {
  this.memeberService.getAllMemberCategory().subscribe(result => {
    console.log("categories",result);
    this.categories = result;
  }, error => console.error(error));
}
}
