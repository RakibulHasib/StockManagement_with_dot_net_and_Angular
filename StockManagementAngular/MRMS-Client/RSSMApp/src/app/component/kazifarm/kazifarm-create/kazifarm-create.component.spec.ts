import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KazifarmCreateComponent } from './kazifarm-create.component';

describe('KazifarmCreateComponent', () => {
  let component: KazifarmCreateComponent;
  let fixture: ComponentFixture<KazifarmCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KazifarmCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KazifarmCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
