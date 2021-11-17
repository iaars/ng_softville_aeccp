import {MatDialogRef} from '@angular/material/dialog';
import {ModalComponent} from '../modal.component';

export interface Button {
  label: string;
  color: string;
  action: (modalRef: MatDialogRef<ModalComponent>) => void;
  disabled: boolean;
  type: string;
}
