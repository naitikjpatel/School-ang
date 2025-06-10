import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


 export interface UserType {
  userTypeId: number;
  userTypes: string;
}

export interface UserDetails {
  userDetailId: number;
  details: string;
  address: string;
  phone: string;
}

export interface Subject {
  subjectId: number;
  subjectName: string;
}

export interface Course {
  courseId: number;
  courseName: string;
  courseDescription: string;
  subjects: Subject[];
}

export interface Result {
  resultId: number;
  status: string;
  resultDate: string;
}

export interface Student {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: UserType;
  userDetails: UserDetails;
  results: Result[];
  courses: Course[];
}


export interface studentResult {
    resultId:number;
    status:string | null;
    resultDate:string;
    userId:number;
    userName:string;
    examId:number;
    examName:string;
    subjectId:number;
    subjectName:string;
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