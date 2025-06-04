import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { LoaderComponent } from './component/loader/loader.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent,NgIf]
})
export class AppComponent implements AfterViewInit {
  title = 'school-management';
  showLoader = true;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.showLoader = false;
      this.cdr.detectChanges();
      this.router.navigate(['']);
    }, 2500);
  }
}
