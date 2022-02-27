import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, ROUTES } from '@angular/router';
import {DataTablesModule} from 'angular-datatables';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { TopnavComponent } from './mastertheme/topnav/topnav.component';
import { AsidenavComponent } from './mastertheme/asidenav/asidenav.component';
import { FooterComponent } from './mastertheme/footer/footer.component';
import { LoginComponent } from './access/login.component';
import { LogoutComponent } from './access/logout.component';
import { ErrorComponent } from './access/error.component';
import {NotFoundComponent} from './access/notFound.component';
import { routing } from './app.routes';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth-guard.service';
import { OpenRfqComponent } from './biding/open-rfq/open-rfq.component';
import { ChartsModule } from 'ng2-charts';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RegistrationComponent } from './biding/registration/registration.component';
import { MembersComponent } from './biding/members/members.component';
import { ValidationService } from './service/validation.service';
import { TemplateService } from './service/template.service';
import { PrintMemeberformComponent } from './print/print-memeberform/print-memeberform.component';
import { RegisrationFormComponent } from './regisration-form/regisration-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TopnavComponent,
    AsidenavComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    ErrorComponent,
    NotFoundComponent,
    OpenRfqComponent,
    RegistrationComponent,
    MembersComponent,
    PrintMemeberformComponent,
    RegisrationFormComponent,
   
   
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    routing,
    DataTablesModule,
    ChartsModule,
    
  ],
  providers: [
		AuthService,
		AuthGuard,
    TemplateService,
    ValidationService,
    // {provide: LocationStrategy, useClass: HashLocationStrategy}
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
