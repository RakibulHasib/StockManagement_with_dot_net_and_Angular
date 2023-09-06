import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IglooCreateComponent } from './igloo-create.component';

describe('IglooCreateComponent', () => {
  let component: IglooCreateComponent;
  let fixture: ComponentFixture<IglooCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IglooCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IglooCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
