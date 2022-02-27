import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ISession } from '../interfaces';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public session: ISession;
	currentRoute: string;

	// Define Status code contants
    public access = {
		OK: 200,
		// "we don't know who you are, so we can't say if you're authorized to access
		// this resource or not yet, please sign in first"
		UNAUTHORIZED: 401,
		// "we know who you are, and your profile does not allow you to access this resource"
		FORBIDDEN: 403
	}
    
  public user: Observable<User>;
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}


  constructor(
    private router: Router
  ) {}

  
  login(user: User){debugger;
	var str = "Apples are round, and Apples are Juicy."; 
console.log(str.toLowerCase( ))
    if (user.username !== '' && user.password !== '' ) { // {3}
     if(user.username.toLowerCase() =="admin" && user.password=='Admin123')
    {  localStorage.setItem('user', JSON.stringify(user));
      this.loggedIn.next(true);
	  return user
	}else
	{
		return this.access.FORBIDDEN;
	}
    }
  }

  getSession(val: any): any {
		this.checkSession();
		return (this.session && this.session[val]) ? this.session[val] : null;
	}

	checkSession():void{
		this.session = JSON.parse(localStorage.getItem('user'));
	}

	isLoggedIn(): boolean {
		this.checkSession();
		//console.log(this.session)
		return (this.session) ? true : false;
	}

	// logout clear session and object
    logout(): void {
        window.localStorage.removeItem('user');
        this.session = <ISession>{};
    }

	// check user has permission for route
	isAuthenticated(route: string): any {
		if (this.isLoggedIn()) {
			this.currentRoute = route;
			return this.access.OK;
		} else {
			return this.access.UNAUTHORIZED;
		}
	}
}