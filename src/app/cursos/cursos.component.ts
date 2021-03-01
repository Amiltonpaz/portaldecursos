import { Component, OnInit } from '@angular/core';
import { Curso } from './curso-model';
import { DataCursosService } from './data-cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  preserveWhitespaces: true
})
export class CursosComponent implements OnInit {

  lista: any;
  falhaAoCarregar = false;
  constructor(private dbCursos: DataCursosService) {

  }

  ngOnInit() {

    this.buscaCursos();
  }

  buscaCursos() {
    this.dbCursos.getListaDeCursos().subscribe(cursos => {
      if (cursos) {
        this.lista = cursos;
        this.falhaAoCarregar = true;
      } else {
        this.falhaAoCarregar = false;
      }
    });
    return this.lista;
  }


}
