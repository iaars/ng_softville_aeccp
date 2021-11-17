import {FormGroup} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';

export abstract class AccessInterface {
  // esta variable debe ser NgbModalRef, pero se usa any porque no se puede inicializar
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public modalRef: any;
  public hide: boolean;
  public form: FormGroup;

  constructor(public userService: UserService, public formGroup: FormGroup) {
    this.form = formGroup;
    this.hide = true;
  }

  protected abstract onSubmit(): void;
  protected abstract onSuccess(): void;
  protected abstract onInvalidData(): void;
}
