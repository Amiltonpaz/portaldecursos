import { Aluno } from './../alunos/aluno-model';
import { HttpClient } from '@angular/common/http';
import { Curso } from './../cursos/curso-model';
import { OnlineOfflineService } from './online-offline.service';
import { Injectable } from '@angular/core';
import { Dexie } from 'Dexie';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {

private db!: Dexie;
private table!: Dexie.Table<any, any>;
dbname!: string;
nomeDaTabela!: string;
API!: string;

constructor(
  private statusCon: OnlineOfflineService,
  private http: HttpClient) {
    this.escutaStatusConnection();
  }

// tslint:disable-next-line: typedef

iniciaIndexedDb(nomeDb: string, objeto: any, chaveObjeto: string, nomeDaTabela: string) {
  this.dbname = nomeDb;
  this.db = new Dexie(this.dbname);
  this.table = this.db.table('aluno');
  this.db.version(1).stores({
    aluno: chaveObjeto
  });

  console.log('banco de dados local criado.');

}

async criarTabela() {

  this.table = await this.db.table('alunos');
}


async salvaNoIndexedDb(objeto: any ) {
   await this.criarTabela();
   await this.table.add(objeto);
   console.log( `Objeto ${objeto.id} salvo no IndexedDB.` );
}

private async enviaParaApi()  {

  const todosOsRegistros: Curso[] = await this.table.toArray();

  // tslint:disable-next-line: prefer-const
  for ( let curso of todosOsRegistros ) {

    // tslint:disable-next-line: no-shadowed-variable
    this.http.post<Curso>(this.API, curso)
    // tslint:disable-next-line: no-shadowed-variable
    .subscribe(curso => {
      if (curso) {

        console.log(`Curso ${curso.id} salvo na API com sucesso.`);
        this.table.delete(curso.id);
        console.log(`Curso ${curso.id} deletado do IndexedDb.`);
      } else {
        console.log(`Falha ao gravar curso na API. O registro será mantido no IndexedDb.`);
      }

    });
  }
}

escutaStatusConnection() {
  this.statusCon.satusConexao.subscribe((onlineOuOffline) => {

    if (onlineOuOffline) {
      this.enviaParaApi();
    } else {
      console.log('Executando procedimento de gravação no IndexedDb.');
    }
  });
}

getStatusConnexao() {
  return this.statusCon.isOnline;
}

}
