/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserviewComponent } from './userview.component';

describe('UserviewComponent', () => {
  let component: UserviewComponent;
  let fixture: ComponentFixture<UserviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
