
import { OnlineOfflineService } from './../../services/online-offline.service';
import { Component, OnInit } from '@angular/core';
import { ViaCepService } from 'src/app/services/via-cep.service';
import { Dexie } from 'Dexie';
import { NgForm, FormBuilder } from '@angular/forms';
import { DbService } from 'src/app/services/db.service';
import { Aluno } from '../aluno-model';


@Component({
  selector: 'app-cadastro-de-alunos',
  templateUrl: './cadastro-de-alunos.component.html',
  styleUrls: ['./cadastro-de-alunos.component.css']
})
export class CadastroDeAlunosComponent implements OnInit {
  aluno = new Aluno();
  endereco: any;
  form!: NgForm;
  customPatternEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
  private dexie!: Dexie;
  private table!: Dexie.Table<Aluno, any>;



  constructor(
    private viaCep: ViaCepService,
    private db: DbService,
    private status: OnlineOfflineService,
    private fb: FormBuilder) {

   }

  ngOnInit(): void {
    this.escutaStatusOnOff();
    this.iniciaDbDexie();

  }

  private iniciaDbDexie() {
    this.dexie = new Dexie('db-alunos');
    this.dexie.version(1).stores({
      aluno: 'id'
    });
    this.table = this.dexie.table('aluno');
  }

  onSubmit(form: NgForm) {

    if (form.valid) {

      this.aluno.id = Math.random();
      this.aluno.nome = form.controls.nome.value;
      this.aluno.email = form.controls.email.value;

      if (this.status.isOnline) {

        this.db.postAluno(this.aluno);
      } else {

        this.table.add(this.aluno);
      }

      form.reset();
    }
  }

  escutaStatusOnOff() {
    this.status.satusConexao.subscribe(async (onoff) => {
      if (onoff) {
        const registrosLocais: Aluno[] = await this.table.toArray();

        for (let aluno of registrosLocais) {
          console.log(`enviando registro ${aluno.id}`);
          this.db.postAluno(aluno);
          this.table.delete(aluno.id);
        }
      } else {
        console.log('offline')
      }
    } );
  }

  expressaoInvalid(campo: any) {
    return !campo.valid && !campo.pristine;
  }

  expressaoValid(campo: any) {
    return campo.valid && !campo.pristine;
  }

  retornaClassesErro(campo: any) {
    return {
      'is-invalid': this.expressaoInvalid(campo),
      'is-valid': this.expressaoValid(campo)
     };
  }

  pesquisaCep(cep: number, formulario: NgForm) {
    console.log(cep);
    this.form = formulario;

    if (cep){
      this.viaCep.pesquisaCep(cep).subscribe(
        (dados) => this.populaDados(dados)
      );

    }else {
      alert("CEP não pode ser vazio.");
      formulario.value.cep = null;
    }
}

populaDados(dados: any) {

this.form.form.patchValue({
  "endereco": {
    "cep": dados.cep,
    "cidade": dados.localidade,
    "estado": dados.uf,
    "rua": dados.logradouro,
    "bairro": dados.bairro }
                          });
  }


}
