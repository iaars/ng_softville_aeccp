import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Usuario} from 'db/src/usuario/usuario';
import {imports} from 'src/app/core/providers';

import {CreatePatientComponent} from './create-patient.component';

describe('CreatePatientComponent', () => {
  let component: CreatePatientComponent;
  let fixture: ComponentFixture<CreatePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePatientComponent],
      imports: imports
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check that pacient does exist', async () => {
    const pacienteExistente: Usuario = {
      identificacion: '117750494',
      nombre: 'Gustavo',
      apellidos: 'Jiménez Hernández',
      tipo: 'Paciente',
      telefono: '89831224',
      correo: 'gustavo.jimenezhernandez@ucr.ac.cr'
    };

    const pacientExists = await component.doesPacientExist(pacienteExistente);
    expect(pacientExists).toBeTrue();
  });

  it('should check that pacient does not exist', async () => {
    const pacienteInexistente: Usuario = {
      identificacion: '100010001',
      nombre: 'Daniel',
      apellidos: 'Martínez Gómez',
      tipo: 'Paciente',
      telefono: '88339900',
      correo: 'daniel.martinez@ucr.ac.cr'
    };

    const pacientExists = await component.doesPacientExist(pacienteInexistente);
    expect(pacientExists).toBeFalse();
  });
});
