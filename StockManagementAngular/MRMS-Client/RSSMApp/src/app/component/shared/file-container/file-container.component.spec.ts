import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileContainerComponent } from './file-container.component';

describe('FileContainerComponent', () => {
  let component: FileContainerComponent;
  let fixture: ComponentFixture<FileContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
