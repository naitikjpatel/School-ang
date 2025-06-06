import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header-t',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-t.component.html',
  styleUrls: ['./header-t.component.css'],
})
export class HeaderTComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  //Getting the userName from the localStorage
  // userName:string|null = localStorage.getItem("userName");
  userName:string | null='';
  
  userProfileImageUrl=null;
  constructor( private router: Router) {}
  ngOnInit(): void {
    this.userName = localStorage.getItem("userName");
    console.log("Header username ",this.userName);
  }

  logout() {
    //here we clean the our cookies,session and the localstorage on the logout click
    localStorage.clear();
    this.router.navigate(['']);
  }
}