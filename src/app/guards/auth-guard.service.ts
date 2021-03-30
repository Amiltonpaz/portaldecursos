import { FirebaseAuthenticationService } from './../services/firebase-authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  userStatus$: any = null;
  usuario: any;

  constructor(
    private fireAuth: FirebaseAuthenticationService,
    private router: Router
    ) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
      this.fireAuth.firebaseGetCurrentUser().then(user => this.usuario = user);
      if (!this.usuario === null) {
        this.router.navigate(['#home']);
        return true;
      }
      this.router.navigate(['#login']);
      return true; // TEMPORÁRIO
    }
}
