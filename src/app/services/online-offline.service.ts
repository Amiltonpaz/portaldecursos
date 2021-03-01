import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {

  // criar evento para nos inscrevermos e receber as emissões de online ou offline
  private statusConexao$ = new Subject();

  constructor() {

    window.addEventListener('online', () => this.atualizaStatusConexao() );
    window.addEventListener('offline', () => this.atualizaStatusConexao() );
  }

  // retorna status booleano
  get isOnline(): boolean {
    return window.navigator.onLine;
  }
  // retorna observable para se inscrever no evento
  get satusConexao() {
  return  this.statusConexao$.asObservable();
  }


  atualizaStatusConexao() {
    this.statusConexao$.next(this.isOnline);
  }
}
