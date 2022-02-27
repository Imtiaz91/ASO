import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-rfq',
  templateUrl: './open-rfq.component.html',
  styleUrls: ['./open-rfq.component.css']
})
export class OpenRfqComponent implements OnInit {
  filterdivshow=true;
  constructor() { }

  ngOnInit() {
  }

  showfilterclick()
  { 
    this.filterdivshow= this.filterdivshow ? false : true;
    console.log(this.filterdivshow);
  }
}
