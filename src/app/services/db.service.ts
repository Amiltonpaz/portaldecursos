import { MatSnackBar } from '@angular/material/snack-bar';
import { Aluno } from './../alunos/aluno-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DbService {

  private readonly API = 'http://localhost:3000/alunos';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  getAlunos() {

  }

  getAluno(id: any) {

  }

  postAluno(aluno: Aluno) {

    this.http.post(this.API, aluno).pipe(
      // tslint:disable-next-line: no-unused-expression
      tap((retorno) => retorno)).subscribe((dados) => {
        this.snackBar.open(`Aluno ${aluno.nome} gravado com sucesso!`, 'fechar', {duration: 5000}); },
      (error: any) => this.snackBar.open( `Falha ao gravar aluno!`, 'fechar' ));



  }

  putAluno(id: any) {

  }

  delete(id: any) {
    this.http.delete(this.API, id).pipe(
      tap(ret => ret)).subscribe(dados => this.snackBar.open(`Aluno ${id} deletado com sucesso!`, 'fechar', {duration: 5000} ));

  }

  resetarForm(form: NgForm) {
    form.form.setValue({
      "id": null,
      "nome": null,
      "sobrenome": null,
      "email": null,
      "endereco": {
        "cep": null,
        "cidade": null,
        "estado": null,
        "rua": null,
        "bairro": null
      }
    })
  }
}
