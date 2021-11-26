import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {CreateAppointmentComponent} from './pages/create-appointment/create-appointment.component';
import {CreatePatientComponent} from './pages/create-patient/create-patient.component';
import {GenerateReportCountComponent} from './pages/generate-report-count/generate-report-count.component';
import {GenerateReportComponent} from './pages/generate-report/generate-report.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-appointment',
    component: CreateAppointmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-patient',
    component: CreatePatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'generate-report',
    component: GenerateReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'generate-report-count',
    component: GenerateReportCountComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
