import { TestBed } from '@angular/core/testing';

import { KaziFarmService } from './kazi-farm.service';

describe('KaziFarmService', () => {
  let service: KaziFarmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KaziFarmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
