import { TestBed } from '@angular/core/testing';

import { LovelloService } from './lovello.service';

describe('LovelloService', () => {
  let service: LovelloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LovelloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
