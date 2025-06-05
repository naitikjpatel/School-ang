import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListTComponent } from './student-list-t.component';

describe('StudentListTComponent', () => {
  let component: StudentListTComponent;
  let fixture: ComponentFixture<StudentListTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentListTComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentListTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
