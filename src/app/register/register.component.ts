import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  authService: AuthService;
  errorMessage: string;
  successMessage: string;

  constructor(authService: AuthService) { 
    this.authService = authService;
  }

  ngOnInit() {
  }

  tryRegister(email, password){
    this.authService.SignUp(email, password)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

}
