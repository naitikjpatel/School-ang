import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { LoaderComponent } from './component/loader/loader.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, NgIf],
})
export class AppComponent implements OnInit {
  title = 'school-management';
  showLoader = true;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // This method runs after the component's view has been fully initialized.
    // It shows a loader for 2.5 seconds, then hides it and navigates to the root route.
    setTimeout(() => {
      this.showLoader = false;
      // this.cdr.detectChanges();

      // This is new added
      const userId = localStorage.getItem('userId');
      const role = localStorage.getItem('role');
      if (userId && role === 'Student') {
        this.router.navigate(['/student-dashboard']);
        return;
      } else if (userId && role === 'Teacher') {
        this.router.navigate(['/teacher-dashboard']);
        return;
      }

      this.router.navigate(['']);
    }, 2500);
  }

  // ngOnInit(): void {
  //   const userId = localStorage.getItem('userId');
  // const role = localStorage.getItem('role');
  // if (userId && role === 'Student') {
  //   this.router.navigate(['/student-dashboard']);
  //   return;
  // } else if (userId && role === 'Teacher') {
  //   this.router.navigate(['/teacher-dashboard']);
  //   return;
  // }
  // }
}
