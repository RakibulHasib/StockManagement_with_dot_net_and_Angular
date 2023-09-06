import { TestBed } from '@angular/core/testing';

import { ZaNZeeService } from './za-nzee.service';

describe('ZaNZeeService', () => {
  let service: ZaNZeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZaNZeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
