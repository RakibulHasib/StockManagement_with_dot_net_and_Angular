import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionViewComponent } from './distribution-view.component';

describe('DistributionViewComponent', () => {
  let component: DistributionViewComponent;
  let fixture: ComponentFixture<DistributionViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionViewComponent]
    });
    fixture = TestBed.createComponent(DistributionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
