/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SavoyService } from './savoy.service';

describe('Service: Savoy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavoyService]
    });
  });

  it('should ...', inject([SavoyService], (service: SavoyService) => {
    expect(service).toBeTruthy();
  }));
});
