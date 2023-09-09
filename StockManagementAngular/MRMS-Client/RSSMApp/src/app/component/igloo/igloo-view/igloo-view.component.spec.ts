import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IglooViewComponent } from './igloo-view.component';

describe('IglooViewComponent', () => {
  let component: IglooViewComponent;
  let fixture: ComponentFixture<IglooViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IglooViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IglooViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
