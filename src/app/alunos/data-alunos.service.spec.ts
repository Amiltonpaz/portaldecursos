import { TestBed } from '@angular/core/testing';

import { DataAlunosService } from './data-alunos.service';

describe('DataAlunosService', () => {
  let service: DataAlunosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataAlunosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
