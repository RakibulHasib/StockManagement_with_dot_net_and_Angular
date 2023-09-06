import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZanzeeEditComponent } from './zanzee-edit.component';

describe('ZanzeeEditComponent', () => {
  let component: ZanzeeEditComponent;
  let fixture: ComponentFixture<ZanzeeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZanzeeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZanzeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
