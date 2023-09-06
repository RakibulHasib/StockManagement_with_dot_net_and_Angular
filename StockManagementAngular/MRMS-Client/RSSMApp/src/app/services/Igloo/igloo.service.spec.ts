import { TestBed } from '@angular/core/testing';

import { IglooService } from './igloo.service';

describe('IglooService', () => {
  let service: IglooService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IglooService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
