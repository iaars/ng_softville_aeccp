import {TestBed, waitForAsync} from '@angular/core/testing';

import {UserService} from './user.service';
import {imports} from '../core/providers';

describe('UserService', () => {
  let service: UserService;
  let spy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: imports
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

  it('should log out', async () => {
    await service.performLogin('prueba@mailinator.com', 'asdf1234');
    const prueba = await service.performLogout();
    expect(prueba).toBeTrue();
  });
});
