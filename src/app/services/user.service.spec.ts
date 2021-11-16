import {TestBed} from '@angular/core/testing';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';

import {UserService} from './user.service';
import {environment} from 'src/environments/environment';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth())
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in', async () => {
    // usuario registrado
    const prueba = await service.performLogin('prueba@mailinator.com', 'asdf1234');
    expect(prueba).toBeTrue();
  });

  it('should not log in because it is not registered', async () => {
    // usuario no registrado
    const prueba = await service.performLogin('josue@mailinator.com', 'asdf1234');
    expect(prueba).toBeFalse();
  });

  it('should not log in because the password is not correct', async () => {
    // usuario registrado con contraseña incorrecta
    const prueba = await service.performLogin('prueba@mailinator.com', 'asdf123');
    expect(prueba).toBeFalse();
  });
});
