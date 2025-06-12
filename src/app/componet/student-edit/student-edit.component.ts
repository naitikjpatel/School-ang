import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-student-edit',
  imports:[ReactiveFormsModule,NgIf],
  templateUrl: './student-edit.component.html',
})
export class StudentEditComponent implements OnInit {
  userForm!: FormGroup;
  loading = true;
  error: string | null = null;
  userId: number = Number(localStorage.getItem('userId')) ||19;
  userDetailsId:number =1;
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      details: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.fetchUser();
  }

  fetchUser() {
    this.http.get<any>(`http://localhost:9999/api/users/${this.userId}`).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          details: user.userDetails?.details || '',
          address: user.userDetails?.address || '',
          phone: user.userDetails?.phone || '',
        });
        this.userDetailsId =user.userDetails?.userDetailId ||1;
        console.log("user details id ",this.userDetailsId);
        
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch user details';
        this.loading = false;
      },
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    this.loading = true;
    //copying the data from the userForm
    const updatedUser = {
      
      userDetailId:this.userDetailsId,
      ...this.userForm.value,
    };

    this.http.put('http://localhost:9999/api/usersDetails/updateUserDetails', updatedUser).subscribe({
      next: () => {
        this.loading = false;
        alert('UserDetails updated successfully!');
      },
      error: () => {
        this.error = 'Failed to update user details';
        this.loading = false;
      },
    });
  }

  onCancel() {
    // implement your cancel navigation logic here
    console.log("Cancle Clicked..");
    
    history.back();
  }
}
