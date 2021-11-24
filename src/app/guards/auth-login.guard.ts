import {Injectable} from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {
  constructor(private router: Router, private auth: Auth) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(false);
          this.router.navigate(['/home']);
        } else {
          resolve(true);
        }
      });
    });
  }
}
