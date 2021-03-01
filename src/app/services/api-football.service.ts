import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: '06fa8c956ae6489cbfab050751482100'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiFootballService {

  key = '06fa8c956ae6489cbfab050751482100';
  url = 'https://api.football-data.org/v2/competitions/';

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  buscarFtb() {
    this.http.get(this.url,httpOptions).subscribe(dados =>
      {console.log(dados)},
      (error:any) => alert('erro'));
  }

}
