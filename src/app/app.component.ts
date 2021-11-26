import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened = false;

  constructor(private router: Router) {}

  goToDashboard(): void {
    this.router.navigate(['/home']);
    this.opened = false;
  }

  goToTagManager(): void {
    this.router.navigate(['/tag-manager']);
    this.opened = false;
  }

  goToOrdersHistory(): void {
    this.router.navigate(['/orders-history']);
    this.opened = false;
  }
  goToChangePassword(): void {
    this.router.navigate(['/change-password']);
    this.opened = false;
  }
}
