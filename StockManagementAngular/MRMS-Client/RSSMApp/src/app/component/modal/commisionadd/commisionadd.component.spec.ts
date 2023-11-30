import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommisionaddComponent } from './commisionadd.component';

describe('CommisionaddComponent', () => {
  let component: CommisionaddComponent;
  let fixture: ComponentFixture<CommisionaddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommisionaddComponent]
    });
    fixture = TestBed.createComponent(CommisionaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
