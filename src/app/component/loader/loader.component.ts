import { Component, inject } from '@angular/core';import { UserServiceService } from '../../service/user-service.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {

  // constructor(private userservice:UserServiceService){}
 
  // ngOnInit() {
  //   this.userservice.getAllUser().subscribe(data => {
  //     console.log("Users:", data);
  //   });
// }
}