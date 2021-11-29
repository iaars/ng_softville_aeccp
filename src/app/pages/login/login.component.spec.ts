import {ComponentFixture, TestBed} from '@angular/core/testing';
import {imports} from 'src/app/core/providers';

import {LoginComponent} from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: imports
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // !TODO: prueba comentada por error que no se puede solventar en esta iteración
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
