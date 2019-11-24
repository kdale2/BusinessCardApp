import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { BusinessCardsComponent } from './business-cards/business-cards.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { BusinessCardService } from './business-card.service';

import {WebcamModule} from 'ngx-webcam';
import { WebcamComponent } from './webcam/webcam.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'; 


@NgModule({
  declarations: [
    AppComponent,
    BusinessCardComponent,
    BusinessCardsComponent,
    LoginComponent,
    NotFoundComponent,
    WebcamComponent,
    NavbarComponent
  ],
  imports: [
    WebcamModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule,
  ],
  providers: [AuthService, AuthGuard, BusinessCardService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
