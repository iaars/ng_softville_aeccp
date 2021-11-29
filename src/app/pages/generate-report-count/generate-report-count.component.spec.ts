import {ComponentFixture, TestBed} from '@angular/core/testing';
import {imports} from 'src/app/core/providers';

import {GenerateReportCountComponent} from './generate-report-count.component';

describe('GenerateReportCountComponent', () => {
  let component: GenerateReportCountComponent;
  let fixture: ComponentFixture<GenerateReportCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateReportCountComponent],
      imports: imports
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateReportCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill the list of professionals with at least one element', async () => {
    // esta prueba asume existencia de datos en la colección de 'usuarios' en la db
    // lo ideal es tener un mock que asegure que hay datos en la colección
    await component.readProfessionals();
    expect(component.usersSelected[0]).toBeTruthy();
  });

  it('should fill the list of pacients with at least one element', async () => {
    // esta prueba asume existencia de datos en la colección de 'usuarios' en la db
    // lo ideal es tener un mock que asegure que hay datos en la colección
    await component.readPatients();
    expect(component.usersSelected[0]).toBeTruthy();
  });

  it('should be at least one appointment related to a specific professional', async () => {
    // esta prueba asume existencia de datos en la colección de 'usuarios' en la db
    // lo ideal es tener un mock que asegure que hay datos en la colección
    const campo = 'idProfesional';
    const idProfesionalExistente = 'KjUzWzWTie9ezGYX23IW';
    await component.getAppointments(campo, idProfesionalExistente);
    expect(component.appointmentsQuantity).toBeGreaterThan(0);
  });

  it('should not be any appointment related to a nonexistent professional', async () => {
    // esta prueba asume existencia de datos en la colección de 'usuarios' en la db
    // lo ideal es tener un mock que asegure que hay datos en la colección
    const campo = 'idProfesional';
    const idProfesionalExistente = 'noExisto';
    await component.getAppointments(campo, idProfesionalExistente);
    expect(component.appointmentsQuantity).toEqual(0);
  });

  it('should be at least one appointment related to a specific patient', async () => {
    // esta prueba asume existencia de datos en la colección de 'usuarios' en la db
    // lo ideal es tener un mock que asegure que hay datos en la colección
    const campo = 'idPaciente';
    const idProfesionalExistente = 'tswp47G8BfV3VNCnnzGE';
    await component.getAppointments(campo, idProfesionalExistente);
    expect(component.appointmentsQuantity).toBeGreaterThan(0);
  });

  it('should not be any appointment related to a nonexistent patient', async () => {
    // esta prueba asume existencia de datos en la colección de 'usuarios' en la db
    // lo ideal es tener un mock que asegure que hay datos en la colección
    const campo = 'idPaciente';
    const idProfesionalExistente = 'noExisto';
    await component.getAppointments(campo, idProfesionalExistente);
    expect(component.appointmentsQuantity).toEqual(0);
  });
});
