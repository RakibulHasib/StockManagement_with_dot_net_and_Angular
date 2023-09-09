import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KazifarmEditComponent } from './kazifarm-edit.component';

describe('KazifarmEditComponent', () => {
  let component: KazifarmEditComponent;
  let fixture: ComponentFixture<KazifarmEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KazifarmEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KazifarmEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
