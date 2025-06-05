import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListTComponent } from './course-list-t.component';

describe('CourseListTComponent', () => {
  let component: CourseListTComponent;
  let fixture: ComponentFixture<CourseListTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListTComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseListTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
