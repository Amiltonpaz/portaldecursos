import { Curso } from './../curso-model';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbNav } from '@ng-bootstrap/ng-bootstrap'; // Se não tiver o Nav não abre o Modal, pois uso NgbNAv dentro dele.


@Component({
  selector: 'app-modal-curso',
  templateUrl: './modal-curso.component.html',
  styleUrls: ['./modal-curso.component.css']
})
export class ModalCursoComponent implements OnInit {


  // tslint:disable-next-line: no-input-rename
  @Input('curso') curso!: Curso;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {

  }

  closeDialog() {
    this.activeModal.dismiss();
  }

}
