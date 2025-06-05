import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header-t',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-t.component.html',
  styleUrls: ['./header-t.component.css'],
})
export class HeaderTComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  userName = 'John Doe'; // Replace with dynamic user data
userProfileImageUrl=null;
  constructor( private router: Router) {}

  logout() {
    
    this.router.navigate(['']);
  }
}