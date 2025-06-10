import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentByTeacherComponent } from './edit-student-by-teacher.component';

describe('EditStudentByTeacherComponent', () => {
  let component: EditStudentByTeacherComponent;
  let fixture: ComponentFixture<EditStudentByTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStudentByTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStudentByTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
