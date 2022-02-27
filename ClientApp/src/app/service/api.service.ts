import { Injectable } from '@angular/core';
import "rxjs/Rx"
//import { Headers, Response, URLSearchParams } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable, of } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
/*import { AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';*/
//import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';
import { TemplateService } from './template.service';

@Injectable()
export class ApiService {
    //public baseUrl = environment.baseUrl;// "http://192.168.10.23:8088";
    public baseUrl = "https://localhost:44371/";
    public url: string;
    public aRequest: any[] = [];
    defaultParam: any[] = [];
    public val: any ;
    public ErrorStatus : number;
    bLoadType: boolean = false;
    public applyParam: boolean = false;
    bNotify: boolean = true;

    constructor(
        public http: HttpClient,
       /* public authHttp: AuthHttp,*/
        public router: Router,
        public authService: AuthService,
        public templateService: TemplateService
       // public notify: NotificationsService
    ) {
        if (environment.production) {
            this.baseUrl = "";
            // this.baseUrl = "";
        }
    }
    create(apiUrl: string, bNotify: boolean = true): ApiService {
        this.defaultParam = [];
        console.log(this.baseUrl);
        if (apiUrl.search(':') != -1) {
            var aUrl = apiUrl.split(':');
            if (aUrl.length >= 2) {
                aUrl.shift();
                for (var sPart of aUrl) {
                    sPart = sPart.replace('/', '');
                    this.defaultParam.push(sPart);
                }
            }
        } else if (this.defaultParam.includes('id') == false) {
            this.defaultParam.push('id');
        }
        if (environment.production) 
            this.url = this.baseUrl + 'api/' + apiUrl;
        else
        this.url = this.baseUrl + 'api/' + apiUrl;
        
        
        console.log(this.url);
        this.bNotify = bNotify;
        return this;
    }


    public makeUrl(param: Object): string {
        let url = this.url;
        this.applyParam = false;
        for (let sPart of this.defaultParam) {
            if (typeof param[sPart] != 'undefined') {
                if (url.search('/:') == -1) {
                    url += '/' + param[sPart];
                } else {
                    url = url.replace(':' + sPart, param[sPart]);
                }
                delete param[sPart];
                this.applyParam = true;
            }
        }
        return url;
    }

    query(param: Object, onNext: (json: any, isSuccess: boolean, status: number) => void, isSecure: boolean = true, isAccessible: boolean = false): void {
        let url = this.makeUrl(param);
        this._callApi('query', url, param, isAccessible, isSecure, onNext);
    }

    get(param: Object, onNext: (json: any, isSuccess: boolean, status: number) => void, isSecure: boolean = true, isAccessible: boolean = false): void {
        let url = this.makeUrl(param);
        this._callApi('get', url, param, isAccessible, isSecure, onNext);
    }

    save(param: Object, onNext: (json: any, isSuccess: boolean, status: number) => void, isSecure: boolean = true, isAccessible: boolean = false): void {
        this.applyParam = false;
        this._callApi('post', this.url, param, isAccessible, isSecure, onNext);
    }

    update(id, param: Object, onNext: (json: any, isSuccess: boolean, status: number) => void, isSecure: boolean = true, isAccessible: boolean = false): void {
        this.applyParam = false;
        if (id) {
            var url = this.url + '/' + id;
            this._callApi('put', url, param, isAccessible, isSecure, onNext);
        }
    }

    delete(id, param: Object, onNext: (json: any, isSuccess: boolean, status: number) => void, isSecure: boolean = true, isAccessible: boolean = false): void {
        this.applyParam = false;
        if (id) {
            var url = this.url + '/' + id;
            this._callApi('delete', url, param, isAccessible, isSecure, onNext);
        }
    }

    cancelRequest() {
        for (let i in this.aRequest) {
            this.aRequest[i].unsubscribe();
        }
        this.toggleLoader(false, true);
    }

    toggleLoader(toggle: boolean, bAllow: boolean = false) {
        if (this.bLoadType || bAllow) {
            this.templateService.bLoader = toggle;
        }
    }

    _callApi(type: string, url: string, params: Object, isAccessible: boolean, isSecure: boolean, customCallback: (json: any, isSuccess: boolean, status: number) => void): void {
        var oService;
        if (url.search(':') != -1 && !this.applyParam) {
            var aUrl: string[] = url.split('/:');
            url = aUrl[0];

        }
        let sParams: string = "";
        if (Object.keys(params).length != 0 && params.constructor === Object) {
            sParams = JSON.stringify(params);
            if (type == 'query' || type == 'get') {
                sParams = "";
                for (var i in params) {
                    sParams += i + "=" + params[i] + "&";
                }
                sParams = sParams.slice(0, -1);
            }
        }

        let headers: any = {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Is-Accessible': (isAccessible?'true':'false')
        };
        /*headers.set('Access-Control-Allow-Origin', '*');*/
      /*  if (isAccessible) {
            headers.set('Is-Accessible', 'true');
        } else {
            headers.set('Is-Accessible', 'false');
        }*/
/*
        if (!isSecure) {*/
            // For non-protected routes, just use Http
            oService = this.http;
        /*} else {
            oService = this.authHttp;
        }*/

        let oRequest;
        let oObservable: Observable<Response>;
        this.bLoadType = false;
        switch (type) {
            case 'get':
            case 'delete':
            case 'head':
                oRequest = oService[type](url, { search: sParams, headers: headers });
                break;
            case 'post':
            case 'put':
            case 'patch':
                oRequest = oService[type](url, params, { headers: headers });
                break;
            case 'query':
                if (sParams != "") {
                    url += '?' + sParams;
                }
                oRequest = oService.get(url, { headers: headers });
                break;
        }

        ['post', 'put', 'delete'].filter((val) => {
            if (type == val) {
                this.bLoadType = true;
                return true;
            }
            return false;
        });
        this.toggleLoader(true);
        console.log('fetching data: ' + JSON.stringify({ url: url, params: sParams }))
         oObservable = oRequest.pipe(
            tap(data => {
                    console.log('fetch data successfully data: ' + JSON.stringify({ url: url, params: sParams }))
                }
            ),
            map((res: Response) => 
                <Response>res//.json()
            ));

        let oResponse = oObservable
            .subscribe(
            response => {
                customCallback(response, true, response.status);
                this.toggleLoader(false);
            },
            (error: any) => {
                this.toggleLoader(false, true);
                if (error == null && typeof error == 'undefined') {
                    return customCallback('Something went wrong', false, 500);
                }
                if (error.status == 400) {
                    this.cancelRequest();
                  //  this.notify.error('Error!', error.message,{timeOut: 3000});
                    this.authService.logout();
                    this.router.navigateByUrl('/login');
                }
                if (error.status == 401) {
                    this.cancelRequest();
                  //  this.notify.error('Error!', error.error.exceptionMessage,{timeOut: 3000});
                    this.authService.logout();
                    this.router.navigateByUrl('/login');
                }
                if (error.status == 403) {
                    this.cancelRequest();
                    //this.notify.error('Error!', error.error.exceptionMessage,{timeOut: 3000});
                    this.router.navigateByUrl('/home');
                }
                if (error.status == 307) {
                    this.val = error.error.exceptionMessage;
                    this.ErrorStatus = error.status;
                    localStorage.setItem('message', this.val);
                    this.cancelRequest();
                    this.router.navigate(['/maintenance']);
                }
                if (error.status != 307) {
              //  if (typeof error.error.exceptionMessage != 'undefined') {
                  //  this.notify.error('Error!', error.error.exceptionMessage,{timeOut: 3000});
               // }
                // else if (typeof error.message != 'undefined') {
                   // this.notify.error('Error!', 'There was an error on the server and the request could not be completed',{timeOut: 3000});
               // }
            }
                return customCallback(error, false, error.status);
            }
            );
        this.aRequest.push(oResponse);
    }



//   /* GET heroes whose name contains search term */
//   searchHeroes(term: string): Observable<Hero[]> {
//     if (!term.trim()) {
//       // if not search term, return empty hero array.
//       return of([]);
//     }
//     return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
//       tap(_ => this.log(`found heroes matching "${term}"`)),
//       catchError(this.handleError<Hero[]>('searchHeroes', []))
//     );
//   }

    /* GET heroes whose name contains search term */
    search<T>(term: string ): Observable<T> {
        let Empty:T;
        let headers: any = {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Is-Accessible': 'true'
        };

        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of<T>();
        }

        this.toggleLoader(true, true);
        return this.http.post<T>(this.url ,{value:term},{headers:headers})
        .pipe(tap(_=>{
            this.toggleLoader(false, true);
        }),
            catchError(this.handleError<T>('Search', Empty))
        );
        // return this.http.get<any[]>(`${this.heroesUrl}/?name=${term}`).pipe(
        //     catchError(this.handleError<T>('searchHeroes', []))
        // );
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            // if (error == null && typeof error == 'undefined') {
            //     this.notify.error('Something went wrong', false, 500);
            // }
            if (error.status == 500) {
               // this.notify.error('Error!', 'There was an error on the server and the request could not be completed',{timeOut: 3000});
                this.authService.logout();
                this.router.navigateByUrl('/login');
            }
            if (error.status == 400) {
              //  this.notify.error('Error!', 'Bad Request',{timeOut: 3000});
                this.authService.logout();
                this.router.navigateByUrl('/login');
            }
            if (error.status == 401) {
              //  this.notify.error('Error!', 'Authorization required',{timeOut: 3000});
                this.authService.logout();
                this.router.navigateByUrl('/login');
            }
            if (error.status == 403) {
                this.cancelRequest();
            //    this.notify.error('Error!','Access to that resource is forbidden',{timeOut: 3000});
                this.router.navigateByUrl('/home');
            }
            if (error.status == 307) {
                this.val = 'There was an error on the server and the request could not be completed';
                this.ErrorStatus = error.status;
                localStorage.setItem('message', this.val);
                this.cancelRequest();
                this.router.navigate(['/maintenance']);
            }
            else{
             //   this.notify.error('Error!', 'There was an error on the server and the request could not be completed',{timeOut: 3000});
            }

            this.toggleLoader(false, true);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
