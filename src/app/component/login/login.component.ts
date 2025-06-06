import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // Import NgModules here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  loading = false;
  showSuccessToast = false;
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userId: ['', [Validators.required]],
    });
  }
  // ngOnInit(): void {
  //   //if data is already present in login then it's need to redirect on the dashboard
  //  const userId = localStorage.getItem('userId');
  // const role = localStorage.getItem('role');
  // if (userId && role === 'Student') {
  //   this.router.navigate(['/student-dashboard']);
  //   return;
  // } else if (userId && role === 'Teacher') {
  //   this.router.navigate(['/teacher-dashboard']);
  //   return;
  // }

  //   this.loginForm.reset();
  //   this.showSuccessToast = false;
  //   this.loading = false;
  //   this.hidePassword = true;
  // }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;

      fetch('http://localhost:9999/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.loginForm.value),
      })
        .then(async (response) => {
          this.loading = false;
          if (!response.ok) {
            throw new Error('Login failed');
          }

          const user = await response.json();
          console.log('Logged In User ', user);
          //now firstly we store the userid,name and role in localstorage
          localStorage.setItem('userId', user.userId);
          //set the role
          localStorage.setItem('role', user.userType.userTypes);
          localStorage.setItem('userName', user.firstName);
          this.showSuccessToast = true;
          setTimeout(() => (this.showSuccessToast = false), 2000);
          if (user.userType.userTypes === 'Student') {
            this.router.navigate(['/student-dashboard']);
          } else if (user.userType.userTypes === 'Teacher') {
            this.router.navigate(['/teacher-dashboard']);
          }
        })
        .catch((error) => {
          this.loading = false;
          console.error('Login error:', error);
          // Optionally show error to user
        });
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  get email() {
    return this.loginForm.get('email');
  }
  get userId() {
    return this.loginForm.get('userId');
  }
}
