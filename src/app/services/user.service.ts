import {Injectable} from '@angular/core';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: Auth) {}

  public async performLogin(email: string, password: string): Promise<boolean> {
    let canLogIn = false;
    await signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        canLogIn = true;
      })
      .catch(() => {
        canLogIn = false;
        console.error('Error en signInWithEmailAndPassword');
      });

    return canLogIn;
  }
}
