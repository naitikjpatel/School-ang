import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
  constructor(private http:HttpClient)
  {}

  getAllUser(): Observable<any[]> {
    return this.http.get<any[]>("https://fakestoreapi.com/products");
  }
}
 