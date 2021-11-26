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

  goToHome(): void {
    this.router.navigate(['/home']);
    this.opened = false;
  }

  goToReports(): void {
    this.router.navigate(['/home']);
    this.opened = false;
  }
}
