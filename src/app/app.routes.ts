import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { StudentDashboardComponent } from './component/student-dashboard/student-dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path:'student-dashboard',
        component:StudentDashboardComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];
