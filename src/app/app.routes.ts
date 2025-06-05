import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { StudentDashboardComponent } from './component/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './component/teacher-dashboard/teacher-dashboard.component';
import { StudentListTComponent } from './component/student-list-t/student-list-t.component';
import { CourseListTComponent } from './component/course-list-t/course-list-t.component';
import { AddStudentComponent } from './component/add-student/add-student.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    // children:[
    //     {
    //         path:'/courses'
    //     },
    //     {
    //         path:'/subjects'
    //     }
    //     ,{
    //         path:'/results'
    //     },{
    //         path:'/profile'
    //     }
    // ]
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
