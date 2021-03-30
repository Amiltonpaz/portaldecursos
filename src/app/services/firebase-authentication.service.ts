
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  constructor(private firebaseAuth: AngularFireAuth) { }

  // tslint:disable-next-line: typedef
  firebaseLogin(email: string, senha: string) {

    return this.firebaseAuth.signInWithEmailAndPassword(email, senha);
  }

  // tslint:disable-next-line: typedef
  firebaseCriateUser(email: string, senha: string) {

    return this.firebaseAuth.createUserWithEmailAndPassword(email, senha);
  }

  // tslint:disable-next-line: typedef
  firebaseUserStatus() {

    // tslint:disable-next-line: deprecation
    return this.firebaseAuth.user;
  }

  // tslint:disable-next-line: typedef
  firebaseResetPasswordEmail(email: string) {

    return this.firebaseAuth.sendPasswordResetEmail(email);
  }

  // tslint:disable-next-line: typedef
  firebaseGetCurrentUser() {

    return this.firebaseAuth.currentUser;

  }

  // tslint:disable-next-line: typedef
  firebaseOnAuthStatusChanged() {
    return this.firebaseAuth.onAuthStateChanged;
  }

  // tslint:disable-next-line: typedef
  firebaseLogout() {
    return this.firebaseAuth.signOut;
  }
}
