import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLoginGuard} from './guards/auth-login.guard';
import {AuthGuard} from './guards/auth.guard';
import {CreateAppoimentComponent} from './pages/create-appointment/create-appointment.component';
import {CreatePatientComponent} from './pages/create-patient/create-patient.component';
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
    component: CreateAppoimentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-patient',
    component: CreatePatientComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
