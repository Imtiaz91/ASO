import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//import { ApiService } from './../services/api.service';
//import { TemplateService } from './../services/template.service';
//import { IErrorLog } from './../interfaces';
import { environment } from '../../environments/environment';

@Component({
    templateUrl: './error.html',
})
export class ErrorComponent implements OnInit {
    constructor(
        public router: Router,
     //   public state: TemplateService,
     //   public apiService: ApiService
    ) {
        //this.state.document = "An Error Occured.";
    }

    onSave(eLog: any) {
       // eLog = <IErrorLog>JSON.parse(eLog);
        eLog['isMail'] = environment.production;
        let scope = this;
        let afterSave = (res, isSuccess) => {
            if (isSuccess) {
                localStorage.removeItem('errorLog');
            }
        }
        // Save data through service
       // scope.apiService.create('errorLog').save(eLog, afterSave,false);
    }

    ngOnInit() {
        if (typeof localStorage.getItem('errorLog') != 'undefined' && localStorage.getItem('errorLog') != null) {
            this.onSave(localStorage.getItem('errorLog'));
        }
    }
}   