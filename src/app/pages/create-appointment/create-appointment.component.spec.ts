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
});
