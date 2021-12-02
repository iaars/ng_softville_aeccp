import {Component, OnInit} from '@angular/core';
import {Firestore, query, addDoc, collection, getDocs} from '@angular/fire/firestore';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Usuario} from 'db/src/usuario/usuario';
import {Modal} from 'src/app/shared/components/modals/modal/modal';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {
  constructor(
    private firestore: Firestore,
    private modalService: MatDialog,
    private location: Location
  ) {}

  ngOnInit(): void {}

  form: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9 ]*$')]),
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  async onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const patient: Usuario = {
      identificacion: this.form.get('id')?.value,
      nombre: this.form.get('name')?.value,
      apellidos: this.form.get('lastName')?.value,
      tipo: 'Paciente',
      telefono: this.form.get('phoneNumber')?.value,
      correo: this.form.get('email')?.value
    };

    if (!(await this.doesPacientExist(patient))) {
      try {
        await addDoc(collection(this.firestore, 'usuarios'), patient);
        this.onSuccess();
      } catch (error) {
        this.onError();
      }
    } else {
      this.onError();
    }
  }

  async doesPacientExist(patient: Usuario): Promise<boolean> {
    const usersSnapshot = await getDocs(query(collection(this.firestore, 'usuarios')));
    let isValid = true;

    if (!usersSnapshot.empty) {
      usersSnapshot.forEach((document) => {
        const user = document.data() as Usuario;
        const sameId = user.identificacion == patient.identificacion;
        const sameName = user.nombre == patient.nombre;
        const sameLastName = user.apellidos == patient.apellidos;
        const samePhoneNumber = user.telefono == patient.telefono;
        const sameEmail = user.correo == patient.correo;
        if (sameId || sameName || sameLastName || samePhoneNumber || sameEmail) {
          isValid = false;
        }
      });
    }

    return !isValid;
  }

  private onError(): void {
    Modal.showInfoModal(
      this.modalService,
      'No fue posible crear el paciente',
      'Alguno de los datos ya se encuentra registrado o hubo un error en el servidor.'
    );
  }

  private onSuccess() {
    Modal.showInfoModal(
      this.modalService,
      'Paciente creado',
      'Se ha creado al usuario exitosamente.'
    );
  }

  goBack(): void {
    this.location.back();
  }
}
