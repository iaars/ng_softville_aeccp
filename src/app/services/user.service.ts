import {Injectable} from '@angular/core';
import {Auth, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';

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

  public async performLogout(): Promise<boolean> {
    let canLogOut = false;
    await signOut(this.auth)
      .then(() => {
        canLogOut = true;
      })
      .catch((e: Error) => {});
    return canLogOut;
  }

  public isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }
}
