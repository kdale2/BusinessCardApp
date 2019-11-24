import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authService: AuthService;
  router: Router;

  constructor(authService: AuthService, router: Router) {
    console.log("In the login component");
    this.authService = authService;
   }

  ngOnInit() {
  }


  signIn(email: string, password: string) {
    console.log("signing you in");
    this.authService.SignIn(email, password);
  }

  signOut() {
    this.authService.logout();
    alert("Successfully logged out");
  }
}
