import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';

import {ButtonsComponent} from './shared/components/modals/modal/buttons/buttons.component';
import {ModalComponent} from './shared/components/modals/modal/modal.component';
import {imports} from './core/providers';
import {CreateAppoimentComponent} from './pages/create-appoiment/create-appoiment.component';
import {NavbarComponent} from './shared/components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ButtonsComponent,
    ModalComponent,
    CreateAppoimentComponent,
    NavbarComponent
  ],
  imports: imports,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
