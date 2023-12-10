import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcernViewComponent } from './concern-view.component';

describe('ConcernViewComponent', () => {
  let component: ConcernViewComponent;
  let fixture: ComponentFixture<ConcernViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConcernViewComponent]
    });
    fixture = TestBed.createComponent(ConcernViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
