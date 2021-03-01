import { Estado } from './../professores/prof-cadastro/estado';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private readonly APi = ' http://localhost:3000/estados';
  estado!:Estado ;
constructor(private http: HttpClient) { }

getEstados() {

   return this.http.get<Estado>(this.APi);

}



}
