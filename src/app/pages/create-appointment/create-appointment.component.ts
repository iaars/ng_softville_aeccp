import {Component} from '@angular/core';
import {Firestore, where, query, collection, getDocs, addDoc} from '@angular/fire/firestore';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccessInterface} from 'src/app/core/interfaces/access-interface';
import {UserService} from 'src/app/services/user.service';
import {Usuario} from 'db/src/usuario/usuario';
import {UsuarioWrapper} from 'src/app/core/wrappers/wrapper.usuario';
import {Cita} from 'db/src/cita/cita';
import {Router} from '@angular/router';
import {DateAdapter} from '@angular/material/core';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {Modal} from 'src/app/shared/components/modals/modal/modal';
@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent extends AccessInterface {
  patients: UsuarioWrapper[] = [];
  professionals: UsuarioWrapper[] = [];
  times: string[] = [
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00'
  ];

  constructor(
    userService: UserService,
    private firestore: Firestore,
    private router: Router,
    private location: Location,
    private dateAdapter: DateAdapter<Date>,
    private modalService: MatDialog
  ) {
    super(
      userService,
      new FormGroup({
        patient: new FormControl('', [Validators.required]),
        professional: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        time: new FormControl('', [Validators.required])
      })
    );
    this.dateAdapter.setLocale('es-ES');
  }

  ngOnInit(): void {
    this.getUsers();
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    const date = new Date(this.form.get('date')?.value);
    const str = this.form.get('time')?.value;
    const timeSplitted = str.split(':');
    date.setHours(parseInt(timeSplitted[0]), parseInt(timeSplitted[1]));
    let cantCitas = 0;
    const querySnapshotAppointment = await getDocs(
      query(collection(this.firestore, 'citas'), where('fechaHora', '==', date.getTime()))
    );
    querySnapshotAppointment.forEach((patient) => {
      cantCitas++;
    });
    if(cantCitas > 0){
      //si hay citas el mismo dia a la misma hora
      this.onError();
    }
    else{
      //se agrega la cita
      const cita: Cita = {
        fechaHora: date.getTime(),
        idSecretaria: 'xLK9LdQOhqDPU4wQYoWx',
        idPaciente: this.form.get('patient')?.value,
        idProfesional: this.form.get('professional')?.value
      };
      addDoc(collection(this.firestore, 'citas'), cita);
      this.onSuccess();
      this.router.navigate(['/home']);
    }
  }
  onError(): void {
    Modal.showInfoModal(
      this.modalService,
      'No fue posible agendar la cita',
      'El paciente ya tiene una cita en la fecha y hora seleccionadas.'
    );
  }

   onSuccess() {
    Modal.showInfoModal(
      this.modalService,
      'Cita agendada',
      'Se ha agendado la cita exitosamente.'
    );
  }

  protected onInvalidData(): void {
    throw new Error('Method not implemented.');
  }

  public crearPaciente(): void {
    this.router.navigate(['/create-patient']);
  }

  async getUsers(): Promise<void> {
    const querySnapshotPatient = await getDocs(
      query(collection(this.firestore, 'usuarios'), where('tipo', '==', 'Paciente'))
    );

    querySnapshotPatient.forEach((patient) => {
      this.patients.push({
        id: patient.id,
        user: patient.data() as Usuario
      });
    });

    const querySnapshotProfessional = await getDocs(
      query(collection(this.firestore, 'usuarios'), where('tipo', '==', 'Profesional'))
    );

    querySnapshotProfessional.forEach((professional) => {
      this.professionals.push({
        id: professional.id,
        user: professional.data() as Usuario
      });
    });
  }

  goBack(): void {
    this.location.back();
  }
}
