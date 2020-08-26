import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BusinessCardsComponent } from './business-cards/business-cards.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AuthGuard } from './auth.guard';
import {WebcamComponent} from './webcam/webcam.component';
import { AddcardComponent } from './addcard/addcard.component';
import { ReadmeComponent } from './readme/readme.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'home', component: ReadmeComponent, canActivate: [AuthGuard] },

  { path: 'dashboard', component: BusinessCardsComponent, canActivate: [AuthGuard] },
  { path: 'webcam', component: WebcamComponent, canActivate: [AuthGuard] },
  { path: 'addcard', component: AddcardComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent},
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
