import {Injectable} from '@angular/core';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth';
import {signOut} from '@firebase/auth';

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
      .catch((e: Error) => {
        console.error(e.message);
      });

    return canLogIn;
  }

  public performLogout(): boolean {
    let canLogOut = false;
    signOut(this.auth)
      .then(() => {
        canLogOut = true;
      })
      .catch((e: Error) => {
        console.error(e.message, 'aqui');
      });

    return canLogOut;
  }
}
