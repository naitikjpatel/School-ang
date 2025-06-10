import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { studentResult } from '../../service/student.service';

@Component({
  selector: 'app-student-result-list',
  imports: [NgIf,NgFor,NgClass],
  templateUrl: './student-result-list.component.html',
  styleUrl: './student-result-list.component.css'
})


export class StudentResultListComponent implements OnInit{

  @Input() userId: number = Number(localStorage.getItem("userId")) || 37;
  results: studentResult[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchResults();
  }

  fetchResults(): void {
    this.http.get<studentResult[]>(`http://localhost:9999/api/result/student/${this.userId}`)
      .subscribe({
        next: (data) => {
          this.results = data;
        },
        error: (err) => {
          console.error('Failed to fetch results', err);
          this.error = 'Failed to fetch results';
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
}
