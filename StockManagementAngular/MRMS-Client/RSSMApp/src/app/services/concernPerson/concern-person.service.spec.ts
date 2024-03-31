import { TestBed } from '@angular/core/testing';

import { ConcernPersonService } from './concern-person.service';

describe('ConcernPersonService', () => {
  let service: ConcernPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcernPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
