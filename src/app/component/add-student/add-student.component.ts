// src/app/add-student/add-student.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student.component.html',
})
export class AddStudentComponent implements OnInit {
  studentForm!: FormGroup;
  courses: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    console.log('Add Student Form is called.ngOnInit Method');

    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phone: ['', Validators.required],
      courseId: ['', Validators.required],
    });

    this.loadCourses();
  }

  loadCourses() {
    this.http
      .get<any[]>('http://localhost:9999/api/course/getAllCourse')
      .subscribe({
        next: (data) => (this.courses = data),
        error: (err) => {
          console.error('Error loading courses', err);
        },
      });
  }

  onSubmit() {
    if (this.studentForm.invalid) return;
    this.loading = true;
    this.error = null;

    const payload = {
      firstName: this.studentForm.value.firstName,
      lastName: this.studentForm.value.lastName,
      email: this.studentForm.value.email,
      userDetails: {
        address: this.studentForm.value.address,
        phone: this.studentForm.value.phone,
        details: '-',
      },
      userType: {
        userTypeId: 1,
      },
      courseId: this.studentForm.value.courseId,
    };

    console.log('Student Data ', payload);

    this.http
      .post(
        `http://localhost:9999/api/users/addUser/${payload.courseId}`,
        payload
      )
      .subscribe({
        next: (res) => {
          console.log('Student Added', res);

          this.studentForm.reset();
          alert('Student Added Successfully..');
        },
        error: (err) => {
          this.error = 'An error occurred while submitting the form.';
          console.error(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  onCancel() {
    this.studentForm.reset();
    history.back();
  }
}
