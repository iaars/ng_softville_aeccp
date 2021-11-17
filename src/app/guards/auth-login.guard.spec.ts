import {TestBed} from '@angular/core/testing';
import {imports} from '../core/providers';

import {AuthLoginGuard} from './auth-login.guard';

describe('AuthLoginGuard', () => {
  let guard: AuthLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: imports
    });
    guard = TestBed.inject(AuthLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
