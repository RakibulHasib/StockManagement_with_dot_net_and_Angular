import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KazifarmViewComponent } from './kazifarm-view.component';

describe('KazifarmViewComponent', () => {
  let component: KazifarmViewComponent;
  let fixture: ComponentFixture<KazifarmViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KazifarmViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KazifarmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
