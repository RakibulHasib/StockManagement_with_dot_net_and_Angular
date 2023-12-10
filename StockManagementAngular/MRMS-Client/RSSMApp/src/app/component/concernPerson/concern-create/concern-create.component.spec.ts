import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcernCreateComponent } from './concern-create.component';

describe('ConcernCreateComponent', () => {
  let component: ConcernCreateComponent;
  let fixture: ComponentFixture<ConcernCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConcernCreateComponent]
    });
    fixture = TestBed.createComponent(ConcernCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
