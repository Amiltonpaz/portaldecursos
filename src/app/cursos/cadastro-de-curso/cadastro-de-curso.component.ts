import { FirestoreService } from './../../services/firestore.service';
import { DbProfessoresService } from './../../professores/services/db-professores.service';
import { OnlineOfflineService } from './../../services/online-offline.service';
import { Curso } from './../curso-model';
import { DataCursosService } from './../data-cursos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-cadastro-de-curso',
  templateUrl: './cadastro-de-curso.component.html',
  styleUrls: ['./cadastro-de-curso.component.css']
})
export class CadastroDeCursoComponent implements OnInit {

  curso!: Curso;

  formulario!: FormGroup;
  listaProfessores!: any[];
  listaTags!: AbstractControl[];

  tags = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private fb: FormBuilder,
    private dbCursos: DataCursosService,
    private fireData: FirestoreService ,
    private onlineOffline: OnlineOfflineService,
    private dbProf: DbProfessoresService) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      titulo: [null],
      foto: [null],
      descricao: [null],
      professor: [null]
      // tags: this.buildTags()
    });

   // this.getProfessores();



  }

  buildTags() {


    const values = this.tags.map(v => new FormControl(false));

    return this.fb.array(values);
    /*
    return [
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ] */
  }

  getProfessores() {
    this.dbProf.getProfessores().subscribe((prof) => this.listaProfessores = prof);
    return this.listaProfessores;
  }

  // tslint:disable-next-line: typedef
  onSubmit() {

    if (this.formulario.valid) {

      // this.curso.id = Math.random();
      // this.curso.titulo = this.formulario.controls.titulo.value;
      // this.curso.foto = this.formulario.controls.foto.value;
      // this.curso.descricao = this.formulario.controls.descricao.value;
      // this.curso.professor = this.formulario.controls.professor.value;

      this.curso = this.formulario.value;

      if (this.onlineOffline.isOnline) {
        console.log('ONLINE');
        this.fireData.createCurso(this.curso);
       // this.dbCursos.postCurso(this.curso);
        this.formulario.reset();

      } else {
        this.dbCursos.salvarCursoIndexedDb(this.curso);
        this.formulario.reset();
      }
    }

  }

}
