
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
@Component({
    selector: 'login',
    templateUrl: './login.html',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  returnUrl: string;
  loading :false;


  constructor(
      private formBuilder: FormBuilder,
      private accountService: AuthService,
      private route: ActivatedRoute,
      private router: Router,
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
      // get return url from route parameters or default to '/'
      //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      //this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      //this.loading = true;
     this.accountService.login(this.form.value);
     if(this.accountService.isLoggedIn)
     {
      this.router.navigate(['home']);
     }

  }
}