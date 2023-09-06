import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZanzeeCreateComponent } from './zanzee-create.component';

describe('ZanzeeCreateComponent', () => {
  let component: ZanzeeCreateComponent;
  let fixture: ComponentFixture<ZanzeeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZanzeeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZanzeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
