import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  authService: AuthService;

  constructor(authService: AuthService, router: Router) {
      this.authService = authService;
   }

  ngOnInit() {
  }

  signOut() {
    this.authService.logout();
    alert("Successfully logged out.");
  }

}
