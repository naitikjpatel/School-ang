import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CourseCardSubjectComponent } from '../course-card-subject/course-card-subject.component';
// import { Course } from '../../service/student.service';

interface Course {
  courseId: number;
  courseName: string;
  courseDescription: string;
  subjects: Subject[];
}

interface Subject {
  subjectId: number;
  subjectName: string;
}

@Component({
  selector: 'app-course-list-subject',
  standalone: true,
  imports: [CommonModule, CourseCardSubjectComponent],
  templateUrl: './course-list-subject.component.html',
})
export class CourseListSubjectComponent implements OnInit {
  courses: Course[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Course[]>('http://localhost:9999/api/course/getAllCourse')
      .subscribe({
        next: (data) => {
          this.courses = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching courses:', err);
          this.loading = false;
        },
      });
  }
}
