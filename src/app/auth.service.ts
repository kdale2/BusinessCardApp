import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) { 

      console.log("In auth service");

      this.user = afAuth.authState;

      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            console.log(this.userDetails);
          }
          else {
            this.userDetails = null;
          }
        }
      );
}

SignIn(email: string, password: string) {

  this.afAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Successfully signed in!');
      this.router.navigate(['/home']);
    })
    .catch(err => {
      console.log('Something is wrong:',err.message);
      alert("Error. Please try again");
      this.router.navigate(['/login']);
    });
}

isLoggedIn() {
  if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    console.log("signing out");
    (<HTMLInputElement>document.getElementById('description')).value ='';
    
    this.afAuth.auth.signOut() 
    .then(res => {
      this.router.navigate(['login']);
  });
}
}