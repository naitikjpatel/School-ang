import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { StudentDashboardComponent } from './component/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './component/teacher-dashboard/teacher-dashboard.component';
import { StudentListTComponent } from './component/student-list-t/student-list-t.component';
import { CourseListTComponent } from './component/course-list-t/course-list-t.component';
import { AddStudentComponent } from './component/add-student/add-student.component';
import { CourseListSubjectComponent } from './component/course-list-subject/course-list-subject.component';

export const routes: Routes = [
  {
    path: '',
    component: StudentDashboardComponent,
    children:[
      {
        path:'add-student',
        component:AddStudentComponent
      },
      {
        path: '',
        redirectTo: 'add-student',
        pathMatch: 'full',
      },
    ]
    // component:TeacherDashboardComponent
  },
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    children:[
      {
        path:'add-student',
        component:AddStudentComponent
      },
      {
        path: '',
        redirectTo: 'add-student',
        pathMatch: 'full',
      },
    ]
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
        path:'subjects',
        component:CourseListSubjectComponent
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
