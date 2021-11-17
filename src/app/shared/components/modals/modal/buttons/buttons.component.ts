import {Component, Input} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ModalComponent} from '../modal.component';
import {Button} from './button';

@Component({
  selector: 'buttons-component',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {
  @Input() buttons: Button[];
  @Input() modalRef!: MatDialogRef<ModalComponent>;

  constructor() {
    this.buttons = [];
  }
}
