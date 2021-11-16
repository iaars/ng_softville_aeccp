import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Button} from './buttons/button';

@Component({
  selector: 'info-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() buttons: Button[] = [];
  @Input() buttonsPosition = '';
  @Input() modalRef: any;

  constructor(public activeModal: MatDialog) {}
}
