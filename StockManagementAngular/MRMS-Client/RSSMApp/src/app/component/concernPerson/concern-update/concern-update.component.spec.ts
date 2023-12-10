import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcernUpdateComponent } from './concern-update.component';

describe('ConcernUpdateComponent', () => {
  let component: ConcernUpdateComponent;
  let fixture: ComponentFixture<ConcernUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConcernUpdateComponent]
    });
    fixture = TestBed.createComponent(ConcernUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
