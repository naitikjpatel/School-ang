import { Component, OnInit, Signal } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { Course } from '../../service/student.service';
import { NgFor, NgIf } from '@angular/common';
import { AddCourseComponent } from "../add-course/add-course.component";

@Component({
  selector: 'app-course-list-t',
  templateUrl: './course-list-t.component.html',
  imports: [NgFor, NgIf, AddCourseComponent],
})
export class CourseListTComponent implements OnInit {
  courses: Course[] = [];
  currentPage = 1;
  coursesPerPage = 5;
  loading = true;
  math = Math;
  isEditModalOpen = false;
  isAddModalOpen = false;
  selectedCourse: Course | null = null;

  constructor(private courseService: CourseService) {}

  pageSize: number = 5;

  pagedCourses: Course[] = []; 
  get start() {
    return (this.currentPage - 1) * this.pageSize;
  }

  get end() {
    return this.start + this.pageSize;
  }

  updatePagedCourses() {
    
    console.log('Update Paged Course : ', this.start, ' and ', this.end);

    this.pagedCourses = this.courses.slice(this.start, this.end);
  }

  ngOnInit(): void {
    this.getAllCourses();
  }

  deleteCourse(courseId: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      //this code to delete the course from the courseList
      this.courses=this.courses.filter((course) => course.courseId != courseId);
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.courses = this.courses.filter((c) => c.courseId !== courseId);
          this.currentPage = 1;
          this.updatePagedCourses();
        },
        error: (err) => console.error('Delete failed', err),
      });
    }
  }

  editCourse(course: Course): void {
    this.selectedCourse = { ...course };
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedCourse = null;
  }

  onSaveCourse(updatedCourse: Course): void {
    this.courseService.updateCourse(updatedCourse).subscribe({
      next: () => {
        this.courses = this.courses.map((c) =>
          c.courseId === updatedCourse.courseId ? updatedCourse : c
        );
        this.closeEditModal();
      },
      error: (err) => console.error('Update failed:', err),
    });
  }

  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  closeAddModal(): void {
    this.isAddModalOpen = false;
  }

  onAddCourse(newCourse: Course): void {
    this.courses.unshift(newCourse);
    this.closeAddModal();
  }

  get currentCourses(): Course[] {
    const start = (this.currentPage - 1) * this.coursesPerPage;
    return this.courses.slice(start, start + this.coursesPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.courses.length / this.coursesPerPage);
  }

  paginate(page: number): void {
    this.currentPage = page;
  }

  // get pagedCourses(): Course[] {
  //   const start = (this.currentPage - 1) * this.coursesPerPage;
  //   return this.courses.slice(start, start + this.coursesPerPage);
  // }

  getAllCourses(): void {
    this.loading = true;
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
        this.updatePagedCourses();
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
        this.loading = false;
      },
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.updatePagedCourses();
    }
  }
}
