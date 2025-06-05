
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarTComponent } from '../sidebar-t/sidebar-t.component';
import { HeaderTComponent } from '../header-t/header-t.component';
import { StudentListTComponent } from '../student-list-t/student-list-t.component';


@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterOutlet, SidebarTComponent, HeaderTComponent],

  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent {
  isSidebarOpen = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

