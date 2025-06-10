import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { StudentDashboardComponent } from './component/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './component/teacher-dashboard/teacher-dashboard.component';
import { StudentListTComponent } from './component/student-list-t/student-list-t.component';
import { CourseListTComponent } from './component/course-list-t/course-list-t.component';
import { AddStudentComponent } from './component/add-student/add-student.component';
import { CourseListSubjectComponent } from './component/course-list-subject/course-list-subject.component';
import { CourseListStudentComponent } from './component/course-list-student/course-list-student.component';
import { StudentResultListComponent } from './component/student-result-list/student-result-list.component';
import { StudentEditComponent } from './componet/student-edit/student-edit.component';
import { EditStudentByTeacherComponent } from './component/edit-student-by-teacher/edit-student-by-teacher.component';
import { AddTeacherComponent } from './component/add-teacher/add-teacher.component';

export const routes: Routes = [
  // implement the auth guard for restracting the all url except the login and page not found
  {
    path: '',
   component:LoginComponent
  },
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    children:[
      {
        path:'course-list',
        component:CourseListStudentComponent,
      },
      {
        path:'grades',
        component:StudentResultListComponent
      },
      {
        path:'edit-user',
        component:StudentEditComponent
      },
       {
        path: '',
        redirectTo: 'course-list',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'teacher-dashboard',
    component: TeacherDashboardComponent,
    children: [
      {
        path: 'students',
        component: StudentListTComponent,
      },
      {
        path:'courses',
        component:CourseListTComponent
      },
      {
        path:'add-student',
        component:AddStudentComponent
      },
      {
        path:'edit-student/:id',
        component:EditStudentByTeacherComponent
      },
      {
        path:'subjects',
        component:CourseListSubjectComponent
      },
      {
        path:'add-teacher',
        component:AddTeacherComponent
      },
      {
        path: '',
        redirectTo: 'students',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
