import { TestBed } from '@angular/core/testing';

import { DataCursosService } from './data-cursos.service';

describe('DataCursosService', () => {
  let service: DataCursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCursosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
