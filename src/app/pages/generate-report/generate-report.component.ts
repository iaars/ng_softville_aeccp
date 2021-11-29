import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {AccessInterface} from 'src/app/core/interfaces/access-interface';
import {UsuarioWrapper} from 'src/app/core/wrappers/wrapper.usuario';
import {Firestore, where, query, collection, getDocs} from '@angular/fire/firestore';
import {Usuario} from 'db/src/usuario/usuario';
import {CitaWrapper} from 'src/app/core/wrappers/wrapper.cita';
import {MatTableDataSource} from '@angular/material/table';
import {onSnapshot} from '@firebase/firestore';
import {Cita} from 'db/src/cita/cita';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent extends AccessInterface {
  patients: UsuarioWrapper[] = [];
  displayedColumns: string[] = [
    'nombrePaciente',
    'fechaHora',
    'nombreProfesional',
    'nombreSecretaria'
  ];
  dataSource = new MatTableDataSource<CitaWrapper>();
  citaWrappers: CitaWrapper[] = [];
  usuarioWrappers: UsuarioWrapper[] = [];
  constructor(userService: UserService, private firestore: Firestore) {
    super(
      userService,
      new FormGroup({
        patient: new FormControl('', [Validators.required])
      })
    );
  }

  ngOnInit(): void {
    this.getUsers();
    this.readUsers();
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.getReportData(this.form.get('patient')?.value);
  }

  protected onSuccess(): void {
    throw new Error('Method not implemented.');
  }

  protected onInvalidData(): void {
    throw new Error('Method not implemented.');
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
  }

  async getReportData(patientId: string): Promise<void> {
    //query para filtrar las citas con el patientId
    const querySnapshotPatient = await getDocs(
      query(collection(this.firestore, 'citas'), where('idPaciente', '==', patientId))
    );

    //cada cita encontrada se inserta en citawrappers para imprimirse
    querySnapshotPatient.forEach((citaDoc) => {
      const cita = citaDoc.data() as Cita;
      const wrapperCita: CitaWrapper = {
        id: citaDoc.id,
        cita: cita,
        paciente: this.getUserWrapper(cita.idPaciente),
        profesional: this.getUserWrapper(cita.idProfesional),
        secretaria: this.getUserWrapper(cita.idSecretaria),
        fechaHoraFormateada: new Date(cita.fechaHora).toLocaleString('es-ES')
      };
      this.citaWrappers.push(wrapperCita);
    });
    this.citaWrappers.sort((a, b) => {
      return b.cita.fechaHora - a.cita.fechaHora;
    });

    this.dataSource = new MatTableDataSource<CitaWrapper>(this.citaWrappers);
  }

  // ! no puede probarse porque este método solo se ejecuta tras eventos en firebase
  readUsers(): void {
    onSnapshot(query(collection(this.firestore, 'usuarios')), (snapshot) => {
      this.usuarioWrappers.length = 0;
      snapshot.forEach((usuarioDoc) => {
        this.usuarioWrappers.push({
          id: usuarioDoc.id,
          user: usuarioDoc.data() as Usuario
        });
      });
    });
  }

  async readUsersAsync(): Promise<void> {
    const queryUsers = await getDocs(
      query(collection(this.firestore, 'usuarios'))
    );
    queryUsers.forEach((usuarioDoc) => {
      this.usuarioWrappers.push({
        id: usuarioDoc.id,
        user: usuarioDoc.data() as Usuario
      });
    });
  }

  getUserWrapper(id: string): UsuarioWrapper | undefined {
    let usuarioWrapper: UsuarioWrapper | undefined = undefined;

    this.usuarioWrappers.every((uw) => {
      if (uw.id === id) {
        usuarioWrapper = uw;
        return false;
      }
      return true;
    });

    return usuarioWrapper;
  }
}
