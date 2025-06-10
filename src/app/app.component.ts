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
    setTimeout(() => {
      this.showLoader = false;
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
}