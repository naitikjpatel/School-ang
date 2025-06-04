import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private router: Router) {}

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout() {
    // Simulate logout (clear auth state if applicable)
    this.router.navigate(['']);
  }
}