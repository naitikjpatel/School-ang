import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-student-by-teacher',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    NgClass,
    FormsModule,
    TitleCasePipe,
  ],
  templateUrl: './edit-student-by-teacher.component.html',
  styleUrl: './edit-student-by-teacher.component.css',
})
export class EditStudentByTeacherComponent {
  teacherForm!: FormGroup;
  loading = false;
  error: string | null = null;
  studentId: number | null = 0;
  teacherData: any = {
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    userDetails: {
      details: '',
      address: '',
      phone: '',
    },
    userType: {
      userTypeId: 1,
    },
  };
  expandedSubjectId: number | null = null;
  subjectExamData: any = null;
  examResults: { examId: number; examResult: string }[] = [];
  examLoading = false;
  examError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    //getting id from the path variable
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.studentId === null) {
      this.router.navigate(['teacher-dashboard/students']);
    }

    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: [''],
      details: [''],
    });

    if (this.studentId) {
      this.loading = true;
      this.http
        .get<any>(`http://localhost:9999/api/users/${this.studentId}`)
        .subscribe({
          next: (data) => {
            this.teacherData = data;
            this.teacherForm.patchValue({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.userDetails?.phone,
              address: data.userDetails?.address,
              details: data.userDetails?.details,
            });
            this.loading = false;
          },
          error: (err) => {
            this.error = 'Failed to load student data.';
            this.loading = false;
          },
        });
    }
  }
  expandSubject1(subjectId: number) {
    if (this.expandedSubjectId === subjectId) {
      this.expandedSubjectId = null;
      return;
    }
    this.expandedSubjectId = subjectId;
    this.examLoading = true;
    this.examError = null;
    this.http
      .get<any>(`http://localhost:9999/api/subject/${subjectId}`)
      .subscribe({
        next: (data) => {
          this.subjectExamData = data;
          this.examResults = data.exam.map((exam: any) => ({
            examId: exam.examId,
            examResult: '', //exam.existingResult
          }));
          this.examLoading = false;
        },
        error: () => {
          this.examError = 'Failed to fetch subject data';
          this.examLoading = false;
        },
      });
  }

  expandSubject(subjectId: number) {
    if (this.expandedSubjectId === subjectId) {
      this.expandedSubjectId = null;
      return;
    }
    this.expandedSubjectId = subjectId;
    this.examLoading = true;
    this.examError = null;

    Promise.all([
      this.http
        .get<any>(`http://localhost:9999/api/subject/${subjectId}`)
        .toPromise(),
      this.http
        .get<any[]>(
          `http://localhost:9999/api/result/student/${this.studentId}`
        )
        .toPromise(),
    ])
      .then(([subjectData, studentResults]) => {
        this.subjectExamData = subjectData;
        console.log('Student id is ', this.studentId);

        console.log('Subject Data in edit ', subjectData);
        console.log('Result Data in edit', studentResults);
        //here we are mapping the each exam with it's result if there is present if not then assigned : Not Assigned
        this.examResults = subjectData.exam.map((exam: any) => {
          const found = studentResults?.find(
            (r) => r.examId === exam.examId && r.subjectId === subjectId
          );
          return {
            examId: exam.examId,
            examResult: found ? found.status : 'Not_Assigned',
          };
        });

        this.examLoading = false;
      })
      .catch(() => {
        this.examError = 'Failed to fetch subject or result data';
        this.examLoading = false;
      });
  }
  handleExamResultChange(event: any, examIndex: number) {
    this.examResults[examIndex].examResult = event.target.value;
  }

  submitExamResults() {
    const currentDate = new Date().toISOString();
    const resultsToSubmit = this.examResults.map((examResult) => ({
      status: examResult.examResult,
      resultDate: currentDate,
      users: { userId: this.teacherData.userId },
      exam: { examId: examResult.examId },
    }));

    this.http
      .post('http://localhost:z9999/api/result/addResult', resultsToSubmit)
      .subscribe({
        next: () => {
          alert('Results saved successfully!');
          this.expandedSubjectId = null;
        },
        error: () => {
          this.examError = 'Failed to submit results';
        },
      });
  }

  onSubmit() {
    if (this.teacherForm.valid && this.studentId) {
      this.loading = true;
      const updatedData = {
        ...this.teacherData,
        firstName: this.teacherForm.value.firstName,
        lastName: this.teacherForm.value.lastName,
        email: this.teacherForm.value.email,
        userDetails: {
          ...this.teacherData.userDetails,
          phone: this.teacherForm.value.phone,
          address: this.teacherForm.value.address,
          details: this.teacherForm.value.details,
        },
      };

      this.http
        .put(`http://localhost:9999/api/users/updateUser`, updatedData)
        .subscribe({
          next: () => {
            this.loading = false;
            alert('Student updated successfully!');
          },
          error: (err) => {
            this.error = 'Failed to update student.';
            this.loading = false;
          },
        });
    } else {
      this.error = 'Please fill all required fields correctly.';
    }
  }

  onCancel() {
    this.teacherForm.patchValue({
      firstName: this.teacherData.firstName,
      lastName: this.teacherData.lastName,
      email: this.teacherData.email,
      phone: this.teacherData.userDetails?.phone,
      address: this.teacherData.userDetails?.address,
      details: this.teacherData.userDetails?.details,
    });
  }

  alertMsg() {
    alert('Student Result Added Successfully..');
  }
}
