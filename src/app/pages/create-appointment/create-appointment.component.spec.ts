import {ComponentFixture, TestBed} from '@angular/core/testing';
import {imports} from 'src/app/core/providers';

import {CreateAppointmentComponent} from './create-appointment.component';

describe('CreateAppointmentComponent', () => {
  let component: CreateAppointmentComponent;
  let fixture: ComponentFixture<CreateAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAppointmentComponent],
      imports: imports
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppointmentComponent);
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

  it('should fill the list of professionals with at least one element', async () => {
    // esta prueba asume existencia de datos en la colección de 'usuarios' en la db
    // lo ideal es tener un mock que asegure que hay datos en la colección
    await component.getUsers();
    expect(component.professionals[0]).toBeTruthy();
  });
});
