import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionConfigComponent } from './distribution-config.component';

describe('DistributionConfigComponent', () => {
  let component: DistributionConfigComponent;
  let fixture: ComponentFixture<DistributionConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionConfigComponent]
    });
    fixture = TestBed.createComponent(DistributionConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
