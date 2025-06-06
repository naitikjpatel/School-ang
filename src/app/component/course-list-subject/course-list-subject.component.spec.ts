import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListSubjectComponent } from './course-list-subject.component';

describe('CourseListSubjectComponent', () => {
  let component: CourseListSubjectComponent;
  let fixture: ComponentFixture<CourseListSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseListSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
