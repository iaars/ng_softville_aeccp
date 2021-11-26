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

  goTo(route: string): void {
    this.router.navigate([route]);
    this.opened = false;
  }
}
