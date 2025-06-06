import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


  interface UserType {
  userTypeId: number;
  userTypes: string;
}

interface UserDetails {
  userDetailId: number;
  details: string;
  address: string;
  phone: string;
}

interface Subject {
  subjectId: number;
  subjectName: string;
}

export interface Course {
  courseId: number;
  courseName: string;
  courseDescription: string;
  subjects: Subject[];
}

interface Result {
  resultId: number;
  status: string;
  resultDate: string;
}

interface Student {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: UserType;
  userDetails: UserDetails;
  results: Result[];
  courses: Course[];
}
@Injectable({
  providedIn: 'root',
})

export class StudentService {
  private apiUrl = 'http://localhost:9999/api/users';

  constructor(private http: HttpClient) {
    console.log("service constructor called");
    
  }
  getStudents(): Observable<Student[]> {
    console.log('getStudents method called');
    return this.http.get<Student[]>(`${this.apiUrl}/getAllUser`).pipe(
      map((users) => users.filter((user) => user.userType.userTypes === 'Student'))
    );
  }
  deleteStudent(studentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${studentId}`);
  }

  addStudent(student: any): Observable<void> {
    return this.http.post<void>(this.apiUrl, student);
  }

  
}