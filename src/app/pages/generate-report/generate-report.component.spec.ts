import {ComponentFixture, TestBed} from '@angular/core/testing';
import {imports} from 'src/app/core/providers';

import {GenerateReportComponent} from './generate-report.component';

describe('GenerateReportComponent', () => {
  let component: GenerateReportComponent;
  let fixture: ComponentFixture<GenerateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateReportComponent],
      imports: imports
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill the list of patients with at least one element', async () => {
    // esta prueba asume existencia de datos en la colección de 'usuarios' en la db
    // lo ideal es tener un mock que asegure que hay datos en la colección
    await component.getUsers();
    expect(component.patients[0]).toBeTruthy();
  });

  it('should fill the list of appointments related to a specific patient with at least one element', async () => {
    // esta prueba asume existencia de datos en la colección de 'usuarios' en la db
    // lo ideal es tener un mock que asegure que hay datos en la colección
    const idPacienteExistente = 'tswp47G8BfV3VNCnnzGE';
    await component.getReportData(idPacienteExistente);
    expect(component.citaWrappers[0]).toBeTruthy();
  });

  it('should find the user wrapper', async () => {
    // esta prueba asume existencia de datos en la colección de 'usuarios' en la db
    // lo ideal es tener un mock que asegure que hay datos en la colección
    const idUsuarioExistente = 'tswp47G8BfV3VNCnnzGE';
    await component.readUsersAsync();
    const userWrapper = await component.getUserWrapper(idUsuarioExistente);
    expect(userWrapper).toBeTruthy();
  });

  it('should not find the user wrapper because id does not exist on db', async () => {
    // esta prueba asume existencia de datos en la colección de 'usuarios' en la db
    // lo ideal es tener un mock que asegure que hay datos en la colección
    const idUsuarioInexistente = 'idQueNoExisteEnDb';
    await component.readUsersAsync();
    const userWrapper = await component.getUserWrapper(idUsuarioInexistente);
    expect(userWrapper).toBeFalsy();
  });
});
