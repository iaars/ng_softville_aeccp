import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {
  Firestore,
  where,
  query,
  collection,
  getDocs,
  addDoc,
  onSnapshot
} from '@angular/fire/firestore';
import {Cita} from 'db/src/cita/cita';
import {Usuario} from 'db/src/usuario/usuario';
import {CitaWrapper} from 'src/app/core/wrappers/CitaWrapper';
import {UsuarioWrapper} from 'src/app/core/wrappers/UsuarioWrapper';
import {fakeAsync} from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'nombrePaciente',
    'fechaHora',
    'nombreProfesional',
    'nombreSecretaria'
  ];
  dataSource = new MatTableDataSource<CitaWrapper>();
  citaWrappers: CitaWrapper[] = [];
  usuarioWrappers: UsuarioWrapper[] = [];

  constructor(private firestore: Firestore) {}

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

  private readAppointments(): void {
    onSnapshot(query(collection(this.firestore, 'citas')), (snapshot) => {
      this.citaWrappers.length = 0;
      snapshot.forEach((citaDoc) => {
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
    });
  }

  private getUserWrapper(id: string): UsuarioWrapper | undefined {
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
