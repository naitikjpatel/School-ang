
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AddSubjectModalComponent } from "../add-subject-modal/add-subject-modal.component";
interface Subject {
  subjectId: number;
  subjectName: string;
}

interface Course {
  courseId: number;
  courseName: string;
  courseDescription: string;
  subjects: Subject[];
}

@Component({
  selector: 'app-course-card-subject',
  standalone: true,
  imports: [CommonModule, AddSubjectModalComponent],
  templateUrl: './course-card-subject.component.html',
})
export class CourseCardSubjectComponent {
  @Input() course!: Course;
  showModal = false;

  constructor(private http: HttpClient) {}

  handleDelete(subjectId: number) {
    if (confirm('Are you sure you want to delete this subject?')) {
      this.http.delete(`http://localhost:9999/api/subject/${subjectId}`).subscribe({
        next: () => {
          this.course.subjects = this.course.subjects.filter(sub => sub.subjectId !== subjectId);
        },
        error: (err) => console.error('Error deleting subject:', err)
      });
    }
  }

  closeModal() {
    this.showModal = false;
    
  }
   onSubjectAdded(newSubject: any) {
    //taking this oject from the child component thought emit
    //and adding into course.subject array to reflect the ui as well
    this.course.subjects.push(newSubject);
    this.showModal = false; 
  }
}