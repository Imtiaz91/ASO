import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';
import { User } from './service/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {
   
  }

  ngOnInit() {
    
 
  }
  authLogin(): boolean {
   // let errorCode = this.apiService.ErrorStatus;
    let bLogin: boolean = this.authService.isLoggedIn();
 
    return bLogin;
}
}