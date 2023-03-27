import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileBtnComponent } from './file-btn.component';

describe('FileBtnComponent', () => {
  let component: FileBtnComponent;
  let fixture: ComponentFixture<FileBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
