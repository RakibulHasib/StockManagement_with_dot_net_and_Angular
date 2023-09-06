import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZanzeeViewComponent } from './zanzee-view.component';

describe('ZanzeeViewComponent', () => {
  let component: ZanzeeViewComponent;
  let fixture: ComponentFixture<ZanzeeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZanzeeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZanzeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
