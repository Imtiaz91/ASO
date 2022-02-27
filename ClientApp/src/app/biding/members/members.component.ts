import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IMember } from '../../interfaces';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  bntStyle: string;
  filterdivshow=true;
  selectedHero!: IMember;
  public memberlst: IMember[];
  filter() {
    this.bntStyle = 'btn-default-click';

  }
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string,private router :Router) {
    http.get<IMember[]>(baseUrl + 'membership').subscribe(result => {
      console.log("324234",result);
      this.memberlst = result;
    }, error => console.error(error));
  }

  ngOnInit() {
  
  }
  showfilterclick()
{ 
  this.filterdivshow= this.filterdivshow ? false : true;
  console.log(this.filterdivshow);
}
ViewOrEdit(memeberid : number)
  {    
    this.router.navigate(['/registration/' , {id:memeberid}]);    
  }

  printdata(member: IMember): void {
    this.selectedHero = member;
    window.print();
  } 

}
