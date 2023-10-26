import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionCreateComponent } from './distribution-create.component';

describe('DistributionCreateComponent', () => {
  let component: DistributionCreateComponent;
  let fixture: ComponentFixture<DistributionCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionCreateComponent]
    });
    fixture = TestBed.createComponent(DistributionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
