import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../../service/student.service';

// import { ModalComponent } from '../modal/modal.component';
// import { AddStudentFormModalComponent } from '../add-student-form-modal/add-student-form-modal.component';

interface Student {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  courses: { courseName: string }[];
}

@Component({
  selector: 'app-student-list-t',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './student-list-t.component.html',
  styleUrls: ['./student-list-t.component.css'],
})
export class StudentListTComponent implements OnInit {
  students: Student[] = [];
  currentPage = 1;
  studentsPerPage = 5;
  loading = true;
  isModalOpen = false;
  selectedStudent: Student | null = null;
  isAddModalOpen = false;
  math=Math;

  constructor(private studentService: StudentService, private router: Router) {
    console.log("student list compoent constructor called");
    
  }

  ngOnInit() {
    console.log("ngOnInti called");
    
    this.fetchStudents();
  }

  fetchStudents() {
    console.log("fetch students called");
    
    this.loading = true;
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.loading = false;
        console.log(students);
        
      },
      error: (error) => {
        console.error('Error fetching students:', error);
        this.loading = false;
      },
    });
    console.log("data fetched");
    
  }

  // deleteStudent(studentId: number) {
  //   if (confirm('Are you sure you want to delete this student?')) {
  //     this.studentService.deleteStudent(studentId).subscribe({
  //       next: () => {
  //         // Refetch students from backend to ensure frontend is in sync
  //         this.fetchStudents();
  //         const totalPages = Math.ceil(this.students.length / this.studentsPerPage);
  //         if (this.currentPage > totalPages && totalPages > 0) {
  //           this.currentPage = totalPages;
  //         } else if (totalPages === 0) {
  //           this.currentPage = 1;
  //         }
  //       },
  //       error: (error) => console.error('Error deleting student:', error),
  //     });
  //   }
  // }
deleteStudent(studentId: number) {
  if (confirm('Are you sure you want to delete this student?')) {
    this.studentService.deleteStudent(studentId).subscribe({
      next: () => {
        this.fetchStudentsAndUpdatePage();
      },
      error: (error) => console.error('Error deleting student:', error),
    });
  }
}

fetchStudentsAndUpdatePage() {
  this.studentService.getStudents().subscribe({
    next: (students) => {
      this.students = students;
      this.loading = false;

      const totalPages = Math.ceil(this.students.length / this.studentsPerPage);
      if (this.currentPage > totalPages && totalPages > 0) {
        this.currentPage = totalPages;
      } else if (totalPages === 0) {
        this.currentPage = 1;
      }

      // 🔁 Force re-evaluation of currentStudents getter
      const tempPage = this.currentPage;
      this.currentPage = 0;
      setTimeout(() => this.currentPage = tempPage, 0);
    },
    error: (error) => {
      console.error('Error fetching students:', error);
      this.loading = false;
    },
  });
}

  handleDelete(studentId: number) {
    this.deleteStudent(studentId);
  }

  get currentStudents() {
    const indexOfLastStudent = this.currentPage * this.studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - this.studentsPerPage;
    return this.students.slice(indexOfFirstStudent, indexOfLastStudent);
  }

  get indexOfFirstStudent() {
    return (this.currentPage - 1) * this.studentsPerPage;
  }

  get indexOfLastStudent() {
    return this.currentPage * this.studentsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.students.length / this.studentsPerPage);
  }

  paginate(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  openModal(student: Student) {
    this.selectedStudent = student;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedStudent = null;
  }

  openAddModal() {
    this.isAddModalOpen = true;
  }

  closeAddModal() {
    this.isAddModalOpen = false;
  }

  navigateToEdit(studentId: number) {
    this.router.navigate([`/editresult/${studentId}`]);
  }
}