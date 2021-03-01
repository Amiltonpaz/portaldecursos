import { OnlineOfflineService } from './../services/online-offline.service';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso-model';
import { Dexie } from 'Dexie';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataCursosService {

  private readonly API = 'http://localhost:3000/cursos';
  private db!: Dexie;
  private table!: Dexie.Table<Curso, any>;

  constructor(
    private http: HttpClient,
    private conexao: OnlineOfflineService) {
      this.ouvirStatusConexao();
      this.iniciarIndexedDb();
     }

     private iniciarIndexedDb() {
      this.db = new Dexie('db-cursos');
      this.db.version(1).stores({
        curso: 'id'
      });
      this.table = this.db.table('curso');
     }

  // tslint:disable-next-line: typedef
  getCurso(id: number) {
    return this.http.get<Curso>(this.API + '/' + id).subscribe(curso => console.log(curso));
  }

  // tslint:disable-next-line: typedef
  getListaDeCursos() {
    return this.http.get<Curso[]>(this.API);
  }

  // tslint:disable-next-line: typedef
  postCurso(curso: Curso) {
    return  this.http.post<Curso>(this.API, curso).subscribe(dados => console.log(dados));
  }

  async salvarCursoIndexedDb(curso: Curso) {
    try {

        await this.table.add(curso);
       // const todosCursos: Curso[] = await this.table.toArray();
        console.log('Curso gravado no IndexedDb.');

    } catch (error) {
      console.log('Erro ao executar o método - salvarCursoIndexedDb()', error);
    }
  }

  private async enviarIndexedDbParaApi() {

    const todosCursos: Curso[] = await this.table.toArray();

    for (const curso of todosCursos) {

      this.postCurso(curso);
      this.table.delete(curso.id);
    }

  }

  ouvirStatusConexao() {
    this.conexao.satusConexao
    .subscribe((onlineOffline) => {

      if (onlineOffline) {
        this.enviarIndexedDbParaApi();
      } else {
        console.log('Gravando no banco local.');
      }
    });
  }
}
