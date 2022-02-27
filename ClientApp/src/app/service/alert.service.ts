import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { ApiService } from "./api.service";
import { Router } from '@angular/router';
import { TemplateService } from "./template.service";
//import { NotificationsService } from 'angular2-notifications';
import { Notification } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { map, tap } from "rxjs/operators";


@Injectable()
export class AlertService {
    public headers: any = {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Is-Accessible': 'true'
    };
    constructor(public auth: AuthService,
        public api: ApiService,
        public state: TemplateService,
        public router: Router,
       // public notify: NotificationsService,
        private http: HttpClient) {
    }

    getNotifications() {
        this.api.create('notification/get').query({}, (res, isSuccess) => {
            if (isSuccess) {
                if (res.error === undefined) {
                    this.state.notification = res.data;
                    this.state.notifyCount = res.count;
                }
                //else
                    //this.notify.error("Error", res.error);
                this.state.bLoader = false;
            }
        });
    }

    checkHeartBeat() {
        var refreshId = setInterval(() => {
            console.log('logged in ', this.auth.isLoggedIn());
            if (!this.auth.isLoggedIn()) {
                console.log('Logged off');
                clearInterval(refreshId);
                return;
            }
            const req = this.http.get<any>(this.api.baseUrl + '/API/api/heart_beat', { headers: this.headers })
                .pipe(
                    tap(data => {
                        console.log(data);
                    }),
                    map((res: Response) => <Response>res));

            req.subscribe((res: any) => {

                if (res.error !== undefined) {
                    this.state.toggleOffline(true);
                    return;
                }
                this.state.toggleOffline(false);
            },
                (error: any) => {
                    if (error.status == 401) {
                      //  this.notify.error('Error!', error.error.exceptionMessage);
                        this.auth.logout();
                        this.router.navigateByUrl('/login');
                        return;
                    }
                    if (error.status == 500) {
                       // this.notify.error('Error!', error.error.exceptionMessage);
                        this.state.toggleOffline(true);
                        return;
                    }
                });
        }, 30000);
    }

    readNotification(data: Notification) {
        this.state.bLoader = true;
        this.api.create('notification/read').save(data, (res, isSuccess) => {
            if (isSuccess) {
                if (res.error === undefined) {
                    if (this.state.notifyCount > 0)
                        this.state.notifyCount--;
                    data.unreadNoti = 0;
                    this.state.bNotify = false;
                    this.redirect(data);
                }
             //   else
                 //   this.notify.error("Error", res.error);
            }
            this.state.bLoader = false;
        });
    }

    redirect(data) {
        this.state.bNotify = false;
        switch (data.group_name) {
            case "Service":
                this.router.navigateByUrl('service_contract/list');
                break;
        }
    }

}