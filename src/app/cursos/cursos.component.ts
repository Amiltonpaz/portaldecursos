
import { ModalCursoComponent } from './modal-curso/modal-curso.component';
import { StarRatingComponent } from 'ng-starrating';
import { map, tap } from 'rxjs/operators';
import { FirestoreService } from './../services/firestore.service';
import { Observable } from 'rxjs';
import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Curso } from './curso-model';
import { DataCursosService } from './data-cursos.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as admin from 'firebase-admin';



@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  preserveWhitespaces: true
})
export class CursosComponent implements OnInit {

  lista: any;
  private cursosCollection!: AngularFirestoreCollection<Curso>;
  cursos!: Observable<Curso[]>;
  rating = 3.5;

  curso!: Curso;

  constructor(
    private dbCursos: DataCursosService,
    private fireData: FirestoreService ,
    private afs: AngularFirestore,
    private modalService: NgbModal,

    ) {

      this.cursosCollection = this.afs.collection<Curso>('cursos');
      this.cursos = this.cursosCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Curso;
          const cursoId = a.payload.doc.id;

         // this.curso.id = cursoId;
          this.curso = data;
         // this.curso.foto = data.foto;
         // this.curso.rating = data.rating;
         // this.curso.titulo = data.titulo;

         // this.curso.professor = data.professor;

          return { cursoId, ...data };
        }))
      );


  }

  // tslint:disable-next-line: typedef
  ngOnInit() {

    this.fireData.getCursos().pipe(
      map(dados => dados.map(a => a.payload.doc.data())),
      tap(console.log)
    ).subscribe();
  }

  onRate($event: {oldValue: number, newValue: number, starRating: StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue},
      New Value: ${$event.newValue},
      Checked Color: ${$event.starRating.checkedcolor},
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  buscaDados() {
    const collRef = this.afs.collection('cursos');

  }

  openModal(curso: Curso) {

    const modalRef = this.modalService.open(ModalCursoComponent, { backdrop: 'static' });
    modalRef.componentInstance.curso = curso;
  }

  closeDialog() {
    this.modalService.dismissAll();
  }

  create(curso: Curso) {
    this.fireData.createCurso(curso);
  }

  update(curso: Curso) {
    this.fireData.updateCurso(curso);
  }

  delete(id: string) {
    this.fireData.deleteCurso(id);
  }
}


