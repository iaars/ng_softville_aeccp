import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';

import {ButtonsComponent} from './shared/components/modals/modal/buttons/buttons.component';
import {ModalComponent} from './shared/components/modals/modal/modal.component';
import {imports} from './core/providers';
import {CreateAppoimentComponent} from './pages/create-appointment/create-appointment.component';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {CreatePatientComponent} from './pages/create-patient/create-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ButtonsComponent,
    ModalComponent,
    CreateAppoimentComponent,
    NavbarComponent,
    CreatePatientComponent
  ],
  imports: imports,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
