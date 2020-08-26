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
  display = 'none';
  result: String;
  loggedOut: boolean = false;

  constructor(authService: AuthService, router: Router) {
    console.log("In the login component");
    this.authService = authService;
  }

  ngOnInit() {
  }

  signIn(email: string, password: string) {

    this.authService.SignIn(email, password);
    console.log("signing you in...");

  }

  signOut() {
    this.authService.logout();

    this.loggedOut = true;

    setTimeout(() => {
      this.loggedOut = false;
    }, 4000);

    //when logged out, display a message for only 3 second stating successful log out
/*     let p = document.getElementById("loggedOut");
    p.style.visibility = "visible";
    setTimeout(function () {
      document.getElementById("loggedOut").style.display = 'none';
    }, 3000) */
  }
}
