import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IMember } from 'src/app/interfaces';

@Component({
  selector: 'app-print-memeberform',
  templateUrl: './print-memeberform.component.html',
  styleUrls: ['./print-memeberform.component.css']
})
export class PrintMemeberformComponent implements OnInit {
  @Input() member?: IMember;
  userImage: any = '';
  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
   if(this.member != undefined && this.member.photo !="" )
   {
    this.userImage =  this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.member.photo);
     window.print();
    console.log(this.member);
   }
  }

}
