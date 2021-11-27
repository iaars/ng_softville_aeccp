import {Injectable} from '@angular/core';
import {Auth, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: Auth, private router: Router) {}

  public async performLogin(email: string, password: string): Promise<boolean> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        return true;
      })
      .catch((e: Error) => {
        console.error(e.message);
        return false;
      });
  }

  public async performLogout(): Promise<boolean> {
    let canLogOut = false;

    try {
      await signOut(this.auth);
      canLogOut = true;
      console.log('SE PUDO HACER LOGOUT');
    } catch (error) {
      console.error('ERROR DE LOGOUT');
    }

    return canLogOut;
  }

  public isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }
}
