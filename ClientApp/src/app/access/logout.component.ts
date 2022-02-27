import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from "../service/auth.service";

//import {ApiService} from "./../services/api.service";
//import {AuthService} from "./../services/auth.service";

@Component({
    template: "<div class='app-loader'>Please wait.. You are logging out.</div>"
})

export class LogoutComponent implements OnInit {

    constructor(public router: Router, private accountService: AuthService) {
    }

   // model = this._api.create('logout');
    logout() {
        let scope = this;
       this.accountService.logout();
      console.log(this.accountService.isLoggedIn());
       scope.router.navigateByUrl('/login');
       
    }
    ngOnInit() {
        this.logout()
    }
}