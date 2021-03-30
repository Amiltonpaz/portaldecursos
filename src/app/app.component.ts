import { FirebaseAuthenticationService } from './services/firebase-authentication.service';
import { slideInAnimation, slideInAnimation2} from './animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation, slideInAnimation2]
})
export class AppComponent {

  userStatus$: any;

  constructor(
    private fireAuth: FirebaseAuthenticationService,
    private modalConfig: NgbModalConfig
  ) {

  }

  ngOnInit() {
    this.modalConfig.centered = true;
    this.modalConfig.backdrop = true;
    this.modalConfig.keyboard = false;
    this.modalConfig.size = 'lg';
    this.modalConfig.scrollable = true;
  }
  // tslint:disable-next-line: typedef
  userStatus() {
    this.fireAuth.firebaseGetCurrentUser().then(user => this.userStatus$ = user?.uid);

    if (this.userStatus$) {
      return true;
    }else {
      return false;
    }
  }

  // tslint:disable-next-line: typedef
  userLogoff() {
    this.fireAuth.firebaseLogout();
    console.log(this.userStatus$);
  }

// tslint:disable-next-line: typedef
  openNav() {
    const el = document.getElementById('mySidepanel');
    if (el) {
      el.style.width = '90vw';
      el.style.height = '60vh';
    }
  }

  // tslint:disable-next-line: typedef
  closeNav() {
    const el2 = document.getElementById('mySidepanel');
    if (el2) {
      el2.style.width = '0';
    }
  }
  // tslint:disable-next-line: typedef
  prepareRoute(outlet: RouterOutlet) {

    return outlet &&
     outlet.activatedRouteData
      && outlet.activatedRouteData.animation;
  }

}
