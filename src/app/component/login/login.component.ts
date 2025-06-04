import { Component } from '@angular/core';
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
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userId: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      
      setTimeout(() => {
        console.log('Login data:', this.loginForm.value);
        this.loading = false;
        // if the login credentials are valid, navigate to the student
        this.router.navigate(['student-dashboard']);
      }, 1500);
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // Getter for form controls to simplify template access
  get email() { return this.loginForm.get('email'); }
  get userId() { return this.loginForm.get('userId'); }
}