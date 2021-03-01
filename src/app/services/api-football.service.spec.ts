import { TestBed } from '@angular/core/testing';

import { ApiFootballService } from './api-football.service';

describe('ApiFootballService', () => {
  let service: ApiFootballService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFootballService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
