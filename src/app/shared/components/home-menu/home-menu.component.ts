import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  logout(): void {
    this.userService.performLogout();
  }
}
