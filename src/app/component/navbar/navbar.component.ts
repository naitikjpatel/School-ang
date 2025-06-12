import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule,TitleCasePipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  userName: string | null = localStorage.getItem('userName') || 'naitik';

  constructor(private router: Router) {}

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }


  logout(){
    //removing userId,role and userName from the localstorage 
    localStorage.clear();
    // clicking on the logout button and we redirect to the login component
    this.router.navigate(['']);
  }
}
