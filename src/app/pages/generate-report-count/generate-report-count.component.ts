import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccessInterface} from 'src/app/core/interfaces/access-interface';
import {UsuarioWrapper} from 'src/app/core/wrappers/wrapper.usuario';
import {UserService} from 'src/app/services/user.service';
import {Firestore, query, collection, where, getDocs} from '@angular/fire/firestore';
import {Usuario} from 'db/src/usuario/usuario';

@Component({
  selector: 'app-generate-report-count',
  templateUrl: './generate-report-count.component.html',
  styleUrls: ['./generate-report-count.component.css']
})
export class GenerateReportCountComponent extends AccessInterface {
  usersSelected: UsuarioWrapper[] = [];
  userTypes: string[] = ['Paciente', 'Profesional'];
  paciente = 'Paciente';
  enableForm = false;
  appointmentsQuantity = 0;
  userDummy: Usuario = {
    identificacion: '',
    nombre: '',
    apellidos: '',
    tipo: 'Paciente',
    telefono: '',
    correo: ''
  };

  userSubmited: UsuarioWrapper = {
    id: '',
    user: this.userDummy
  };

  constructor(userService: UserService, private firestore: Firestore) {
    super(
      userService,
      new FormGroup({
        userType: new FormControl('', [Validators.required]),
        userSelected: new FormControl('', [Validators.required])
      })
    );
  }

  onSelect(event: any) {
    if (event.value == 'Paciente') {
      this.readPatients();
    }
    if (event.value == 'Profesional') {
      this.readProfessionals();
    }
  }

  onSubmit(): void {
    if (this.form.get('userType')?.value == 'Paciente') {
      this.getAppointmentsPatient(this.form.get('userSelected')?.value);
    } else {
      this.getAppointmentsProfessional(this.form.get('userSelected')?.value);
    }
  }

  protected onSuccess(): void {
    throw new Error('Method not implemented.');
  }

  protected onInvalidData(): void {
    throw new Error('Method not implemented.');
  }

  private async readProfessionals(): Promise<void> {
    this.usersSelected.length = 0;
    const querySnapshotPatient = await getDocs(
      query(collection(this.firestore, 'usuarios'), where('tipo', '==', 'Profesional'))
    );

    querySnapshotPatient.forEach((professional) => {
      this.usersSelected.push({
        id: professional.id,
        user: professional.data() as Usuario
      });
    });
    this.enableForm = true;
  }

  private async readPatients(): Promise<void> {
    this.usersSelected.length = 0;
    const querySnapshotPatient = await getDocs(
      query(collection(this.firestore, 'usuarios'), where('tipo', '==', 'Paciente'))
    );

    querySnapshotPatient.forEach((patient) => {
      this.usersSelected.push({
        id: patient.id,
        user: patient.data() as Usuario
      });
    });
    this.enableForm = true;
  }

  private async getAppointmentsProfessional(idUser: string) {
    this.appointmentsQuantity = 0;
    const querySnapshotPatient = await getDocs(
      query(collection(this.firestore, 'citas'), where('idProfesional', '==', idUser))
    );
    querySnapshotPatient.forEach((professional) => {
      this.appointmentsQuantity++;
    });
  }
  
  private async getAppointmentsPatient(idUser: string) {
    this.appointmentsQuantity = 0;
    const querySnapshotPatient = await getDocs(
      query(collection(this.firestore, 'citas'), where('idPaciente', '==', idUser))
    );
    querySnapshotPatient.forEach((professional) => {
      this.appointmentsQuantity++;
    });
  }
}
