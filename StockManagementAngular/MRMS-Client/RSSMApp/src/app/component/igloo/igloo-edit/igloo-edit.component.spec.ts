import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IglooEditComponent } from './igloo-edit.component';

describe('IglooEditComponent', () => {
  let component: IglooEditComponent;
  let fixture: ComponentFixture<IglooEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IglooEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IglooEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
