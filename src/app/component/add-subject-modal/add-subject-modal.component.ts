import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-subject-modal',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-subject-modal.component.html',
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px);}
      to { opacity: 1; transform: translateY(0);}
    }
  `]
})
export class AddSubjectModalComponent implements OnInit {
  @Input() courseId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() subjectAdded = new EventEmitter<any>();

  subjectName = ''; //here we took the template based form using ([ngModel])
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log("Add subject Modal is called");
  }

  addSubject() {
    if (!this.subjectName.trim()) return;
    this.loading = true;
    const payload = {
      subjectName: this.subjectName,
      course: { courseId: this.courseId }
    };
    console.log(payload);
    this.http.post(`http://localhost:9999/api/subject/addSubject/${this.courseId}`, payload).subscribe({
      next: (res) => {
        this.subjectAdded.emit(res);
        this.close.emit();
        this.loading = false;
      },
      error: (err) => {
        alert('Failed to add subject');
        this.loading = false;
      }
    });
  }
}