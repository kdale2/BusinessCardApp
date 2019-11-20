import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BusinessCardsComponent } from './business-cards/business-cards.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AuthGuard } from './auth.guard';
import {WebcamComponent} from './webcam/webcam.component';



const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: BusinessCardsComponent, canActivate: [AuthGuard] },
  { path: 'webcam', component: WebcamComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
