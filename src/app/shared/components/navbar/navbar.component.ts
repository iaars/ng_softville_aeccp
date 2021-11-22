import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  toCreateAppointment(): void {
    this.router.navigate(['/create-appointment']);
  }

  logout(): void {
    this.userService.performLogout();
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}
