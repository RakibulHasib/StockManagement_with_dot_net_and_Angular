import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovelloCreateComponent } from './lovello-create.component';

describe('LovelloCreateComponent', () => {
  let component: LovelloCreateComponent;
  let fixture: ComponentFixture<LovelloCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LovelloCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LovelloCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
