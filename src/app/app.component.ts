import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { slideInAnimation, slideInAnimation2} from './animations';
import { ApplicationRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { interval } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation, slideInAnimation2]
})
export class AppComponent {

  private readonly publicKey =
  'BJRDF8_ppLBQnJoBDn8QRgv4tEysfjYAKRHlDHpNr0SOGsDi7XYbzNMVZJ26EWyukF_5cuBMG50P5Zsjw4pk0W8';

  constructor(
    private swPush: SwPush,
    private http: HttpClient,
    private update: SwUpdate,
    private appRef: ApplicationRef,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    this.pushSubscription();
    // tslint:disable-next-line: deprecation
    this.swPush.messages.subscribe((message) => this.snackBar.open('Gravado com sucesso!', 'Undo', {duration: 5000}));

    this.swPush.notificationClicks.subscribe(
      ({action, notification}) => {
          window.open(notification.data.url);
      });

      this.updateClient();
  }

  updateClient() {
    if (this.update.isEnabled) {
      console.log('Update habilitado.');
      return;
    }
    this.update.available.subscribe((event) => {
      console.log(`current`, event.current, `availabe`, event.available);
      if (confirm('update available for the app please confirm')) {
        this.update.activateUpdate().then(() => location.reload());
      }
    });

    this.update.activated.subscribe((event) => {
      console.log(`current`, event.previous, `available`, event.current);
    });
  }

  checkUpdate( ) {
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        const timeInterval = interval(2000);

        timeInterval.subscribe(() => {
          this.update.checkForUpdate().then(() => console.log('checked'));
          console.log('update checked');
        });
      }
    })
  }

  pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log('Notificações não habilitadas');
      return;
    }
    this.swPush.requestSubscription({
      serverPublicKey: this.publicKey,
    }).then(sub => console.log(JSON.stringify(sub)))
    .catch(err => console.log(err));
  }
// tslint:disable-next-line: typedef
  openNav() {
    const el = document.getElementById('mySidepanel');
    if (el) {
      el.style.width = '30vw';
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
