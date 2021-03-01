/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ValidaCssService } from './validaCss.service';

describe('Service: ValidaCss', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidaCssService]
    });
  });

  it('should ...', inject([ValidaCssService], (service: ValidaCssService) => {
    expect(service).toBeTruthy();
  }));
});
