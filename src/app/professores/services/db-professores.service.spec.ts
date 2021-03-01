import { TestBed } from '@angular/core/testing';

import { DbProfessoresService } from './db-professores.service';

describe('DbProfessoresService', () => {
  let service: DbProfessoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbProfessoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
