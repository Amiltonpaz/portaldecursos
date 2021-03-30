import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCursoComponent } from './modal-curso.component';

describe('ModalCursoComponent', () => {
  let component: ModalCursoComponent;
  let fixture: ComponentFixture<ModalCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
