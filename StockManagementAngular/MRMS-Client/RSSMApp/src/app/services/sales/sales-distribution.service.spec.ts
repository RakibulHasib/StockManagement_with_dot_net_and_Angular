import { TestBed } from '@angular/core/testing';

import { SalesDistributionService } from './sales-distribution.service';

describe('SalesDistributionService', () => {
  let service: SalesDistributionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesDistributionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
