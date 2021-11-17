import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';

import {ButtonsComponent} from './shared/components/modals/modal/buttons/buttons.component';
import {ModalComponent} from './shared/components/modals/modal/modal.component';
import {imports} from './core/providers';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, ButtonsComponent, ModalComponent],
  imports: imports,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
