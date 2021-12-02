import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Firestore, query, collection, onSnapshot, getDocs, where} from '@angular/fire/firestore';
import {Cita} from 'db/src/cita/cita';
import {Usuario} from 'db/src/usuario/usuario';
import {CitaWrapper} from 'src/app/core/wrappers/wrapper.cita';
import {UsuarioWrapper} from 'src/app/core/wrappers/wrapper.usuario';
import {Router} from '@angular/router';
import {AccessInterface} from 'src/app/core/interfaces/access-interface';
import {UserService} from 'src/app/services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AccessInterface implements OnInit  {
  protected onSuccess(): void {
    throw new Error('Method not implemented.');
  }
  protected onInvalidData(): void {
    throw new Error('Method not implemented.');
  }
  displayedColumns: string[] = [
    'nombrePaciente',
    'fechaHora',
    'nombreProfesional',
    'nombreSecretaria'
  ];
  dataSource = new MatTableDataSource<CitaWrapper>();
  citaWrappers: CitaWrapper[] = [];
  usuarioWrappers: UsuarioWrapper[] = [];

  constructor(private firestore: Firestore, private router: Router, userService: UserService){
    super(
      userService,
      new FormGroup({
        since: new FormControl('', [Validators.required]),
        to: new FormControl('', [Validators.required])
      })
    );
  }

  ngOnInit(): void {
    this.readUsers();
    this.readAppointments();
  }

  private readUsers(): void {
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

  private async readAppointments(): Promise<void> {
    this.citaWrappers = [];
    const querySnapshotPatient = await getDocs(
      query(collection(this.firestore, 'citas'))
    );
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

  async readUsersAsync(): Promise<void> {
    const queryUsers = await getDocs(query(collection(this.firestore, 'usuarios')));
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

  // ! Las pruebas para este método son de UI
  public createAppointment(): void {
    this.router.navigate(['/create-appointment']);
  }
  public async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }
    const since = new Date(this.form.get('since')?.value);
    const to = new Date(this.form.get('to')?.value);
    since.setHours(parseInt('00'), parseInt('00'));
    to.setHours(parseInt('23'), parseInt('59'));
    this.citaWrappers = [];
    const querySnapshotPatient = await getDocs(
      query(collection(this.firestore, 'citas'), where('fechaHora', '>=', since.getTime()), where('fechaHora', '<=', to.getTime()))
    );
    console.log(this.citaWrappers);
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
    console.log(this.citaWrappers);
    this.citaWrappers.sort((a, b) => {
      return b.cita.fechaHora - a.cita.fechaHora;
    });
    this.dataSource = new MatTableDataSource<CitaWrapper>(this.citaWrappers);
  }
  public removeFilter(): void {
    this.readAppointments();
  }

}
