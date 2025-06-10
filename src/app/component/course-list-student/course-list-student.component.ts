import { Component, signal } from '@angular/core';
import { Course } from '../../service/student.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-list-student',
  imports: [CommonModule],
  templateUrl: './course-list-student.component.html',
  styleUrl: './course-list-student.component.css'
})

export class CourseListStudentComponent {
  courses = signal<Course[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {
    const userId = Number(localStorage.getItem('userId')) || 19;
    this.fetchCourses(userId);
  }

  fetchCourses(userId: number) {
    this.http.get<any>(`http://localhost:9999/api/users/${userId}`).subscribe({
      next: (data) => {
        console.log(data);
        
        this.courses.set(data.courses || []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to fetch course data');
        this.loading.set(false);
      },
    });
  }
}