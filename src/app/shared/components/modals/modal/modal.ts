import {Button} from './buttons/button';
import {ModalComponent} from './modal.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

export class Modal {
  protected modalRef!: MatDialogRef<ModalComponent>;

  public static closeButton = {
    action: (modalRef: MatDialogRef<ModalComponent>): void => {
      modalRef.close();
    },
    color: 'accent',
    label: 'Cerrar',
    disabled: false,
    type: 'button'
  };

  constructor(
    protected modalService: MatDialog,
    protected title: string,
    protected description: string,
    protected buttons: Button[] = [Modal.closeButton],
    protected buttonsPosition: string = 'end'
  ) {
    this.modalService = modalService;
    this.title = title;
    this.description = description;
    this.buttonsPosition = buttonsPosition;
    this.buttons = buttons;
  }

  public open(): void {
    this.init();
    this.assignElements();
  }

  protected init(): void {
    this.modalRef = this.modalService.open(ModalComponent);
  }

  protected assignElements(): void {
    this.modalRef.componentInstance.title = this.title;
    this.modalRef.componentInstance.description = this.description;
    this.modalRef.componentInstance.buttonsPosition = this.buttonsPosition;
    this.modalRef.componentInstance.buttons = this.buttons;
    this.modalRef.componentInstance.modalRef = this.modalRef;
  }

  public static showInfoModal(modalService: MatDialog, title: string, description: string): void {
    new Modal(modalService, title, description).open();
  }
}
