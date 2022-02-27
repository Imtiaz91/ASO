import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asidenav',
  templateUrl: './asidenav.component.html',
  styles: [
  ]
})
export class AsidenavComponent implements OnInit {
  username:any;
  constructor() { }

  ngOnInit(): void {
    this.username=JSON.parse(localStorage.getItem('user'))["username"];
  }

}
