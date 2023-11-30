import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageaddComponent } from './damageadd.component';

describe('DamageaddComponent', () => {
  let component: DamageaddComponent;
  let fixture: ComponentFixture<DamageaddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DamageaddComponent]
    });
    fixture = TestBed.createComponent(DamageaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
