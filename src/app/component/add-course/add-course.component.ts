import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './add-course.component.html',
})
export class AddCourseComponent {
  courseName = '';
  courseDescription = '';
  loading = false;

  @Output() onClose = new EventEmitter<void>();
  @Output() onAddCourse = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  submitForm() {
    if (!this.courseName || !this.courseDescription) return;

    this.loading = true;

    const payload = {
      courseName: this.courseName,
      courseDescription: this.courseDescription,
    };

    this.http.post('http://localhost:9999/api/course/addCourse', payload).subscribe({
      next: (res) => {
        alert('Course saved successfully!');
        this.onAddCourse.emit(res);
        this.resetForm();
        this.onClose.emit();
      },
      error: (err) => {
        console.error('Error adding course:', err);
        this.loading = false;
      },
    });
  }

  closeModal() {
    this.onClose.emit();
  }

  private resetForm() {
    this.courseName = '';
    this.courseDescription = '';
    this.loading = false;
  }
}
