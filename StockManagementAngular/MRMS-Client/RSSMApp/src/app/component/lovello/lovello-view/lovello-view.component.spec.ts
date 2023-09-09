import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovelloViewComponent } from './lovello-view.component';

describe('LovelloViewComponent', () => {
  let component: LovelloViewComponent;
  let fixture: ComponentFixture<LovelloViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LovelloViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LovelloViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
