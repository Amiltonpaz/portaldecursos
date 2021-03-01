import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Professor } from '../professor-model';
import * as $ from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class DbProfessoresService {

  private readonly API = 'http://localhost:3000/professor';


  constructor(private http: HttpClient) { }


  ngOnInit() {

  }

  postProfessor(prof: Professor, formulario: FormGroup) {
    console.log(prof);
    this.http.post<Professor>(this.API, prof)
    .subscribe(dados => {
      console.log(dados);
      formulario.reset();
    },
    (error: any) => alert('Erro no Backend.'));
  }

  getProfessores() {
    return this.http.get<Professor[]>(this.API);
  }
}
