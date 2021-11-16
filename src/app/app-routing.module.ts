import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLoginGuard} from './guards/auth-login.guard';
import {AuthGuard} from './guards/auth.guard';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthLoginGuard]
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
