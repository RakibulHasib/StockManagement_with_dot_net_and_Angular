import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovelloEditComponent } from './lovello-edit.component';

describe('LovelloEditComponent', () => {
  let component: LovelloEditComponent;
  let fixture: ComponentFixture<LovelloEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LovelloEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LovelloEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
