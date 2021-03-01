import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeCursoComponent } from './cadastro-de-curso.component';

describe('CadastroDeCursoComponent', () => {
  let component: CadastroDeCursoComponent;
  let fixture: ComponentFixture<CadastroDeCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDeCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDeCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
