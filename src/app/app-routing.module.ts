import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BusinessCardsComponent } from './business-cards/business-cards.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AuthGuard } from './auth.guard';



const routes: Routes = [

  { path: 'login', component: LoginComponent },
  //should be my AuthGuardService below but doesnt render when doing that
  { path: 'dashboard', component: BusinessCardsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
