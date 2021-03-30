import { Observable } from 'rxjs';
import { Curso } from './../cursos/curso-model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  cursos$!: Observable<Curso[]>;

  constructor(private firestore: AngularFirestore) { }

  getCursos() {
    return this.firestore.collection<Curso>('cursos').snapshotChanges();
  }

  createCurso(curso: Curso) {
    curso.id = this.firestore.createId();
    return this.firestore.collection('cursos').add(curso);
  }

  updateCurso(curso: Curso) {
    delete curso.id; // Não entendi
    this.firestore.doc('cursos/' + curso.id).update(curso);
  }

  deleteCurso(cursoId: string) {
    this.firestore.doc('cursos/' + cursoId).delete();
  }

}
