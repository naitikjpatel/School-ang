import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isOpen = true; // Controlled by parent component

  navItems = [
  
    { name: 'Courses', icon: 'book', route: '/student-dashboard/courses' },
    {name:'Subjects', icon: 'subject', route: '/student-dashboard/subjects'},
    { name: 'Result', icon: 'grade', route: '/student-dashboard/grades' },
    { name: 'Profile', icon: 'person', route: '/student-dashboard/profile' }
  ];
}