import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {UserService} from 'src/app/services/user.service';
import {LoginStrings} from '../../core/login/login.strings';
import {Modal} from '../../shared/components/modals/modal/modal';
import {AccessInterface} from '../../core/interfaces/access-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AccessInterface {
  constructor(private modalService: MatDialog, userService: UserService, private router: Router) {
    super(
      userService,
      new FormGroup({
        email: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(11)
        ])
      })
    );
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.userService
      .performLogin(this.form.get('email')?.value, this.form.get('password')?.value)
      .then((success) => {
        if (success) {
          this.onSuccess();
        } else {
          this.onInvalidData();
        }
      });
  }

  // ! Las pruebas para este método son de UI
  protected onSuccess(): void {
    this.router.navigate(['/home']);
  }

  // ! Las pruebas para este método son de UI
  protected onInvalidData(): void {
    Modal.showInfoModal(
      this.modalService,
      LoginStrings.InvalidCredentialsTitle,
      LoginStrings.InvalidCredentialsDescription
    );
  }
}
