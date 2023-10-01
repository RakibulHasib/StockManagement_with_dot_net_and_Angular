import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavoyReportComponent } from './savoy-report.component';

describe('SavoyReportComponent', () => {
  let component: SavoyReportComponent;
  let fixture: ComponentFixture<SavoyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavoyReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavoyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
