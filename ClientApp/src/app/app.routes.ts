import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./access/login.component";
import { LogoutComponent } from "./access/logout.component";
import { MembersComponent } from "./biding/members/members.component";
import { OpenRfqComponent } from "./biding/open-rfq/open-rfq.component";
import { RegistrationComponent } from "./biding/registration/registration.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./service/auth-guard.service";
//import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { RegisrationFormComponent } from "./regisration-form/regisration-form.component";
import { PrintMemeberformComponent } from "./print/print-memeberform/print-memeberform.component";

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'registration', component: RegisrationFormComponent,canActivate: [AuthGuard]  },
    { path: 'members', component: MembersComponent,canActivate: [AuthGuard]  },
    { path: 'reg-print', component: PrintMemeberformComponent,canActivate: [AuthGuard]  },

  ];
  

  export const routing = RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload'});