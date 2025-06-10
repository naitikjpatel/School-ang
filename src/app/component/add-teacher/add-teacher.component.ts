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
  selector: 'app-add-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-teacher.component.html',
})
export class AddTeacherComponent implements OnInit {
  teacherForm!: FormGroup;
  courses: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    console.log('Add Teacher Form is called.ngOnInit Method');

    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phone: ['', Validators.required],
      
    });

    
  }


  onSubmit() {
    if (this.teacherForm.invalid) return;
    this.loading = true;
    this.error = null;

    const payload = {
      firstName:this.teacherForm.value.firstName,
      lastName:this.teacherForm.value.lastName,
      email:this.teacherForm.value.email,
      userDetails: {
        address: this.teacherForm.value.address,
        phone: this.teacherForm.value.phone,
        details: '-',
      },
      userType: {
        userTypeId:2,
      }
    };

    console.log('Teacher Data ', payload);

    this.http
      .post(
        'http://localhost:9999/api/users/addUser',
        payload
      )
      .subscribe({
        next: (res) => {
          
          this.teacherForm.reset();
          console.log('Teacher Added', res);
          console.log('Teacher Added Successfully..');
          
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
    this.teacherForm.reset();
  }
}
