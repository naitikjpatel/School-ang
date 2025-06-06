import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardSubjectComponent } from './course-card-subject.component';

describe('CourseCardSubjectComponent', () => {
  let component: CourseCardSubjectComponent;
  let fixture: ComponentFixture<CourseCardSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCardSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
