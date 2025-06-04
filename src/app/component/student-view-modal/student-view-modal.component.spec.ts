import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewModalComponent } from './student-view-modal.component';

describe('StudentViewModalComponent', () => {
  let component: StudentViewModalComponent;
  let fixture: ComponentFixture<StudentViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentViewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
