import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfCadastroComponent } from './prof-cadastro.component';

describe('ProfCadastroComponent', () => {
  let component: ProfCadastroComponent;
  let fixture: ComponentFixture<ProfCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
