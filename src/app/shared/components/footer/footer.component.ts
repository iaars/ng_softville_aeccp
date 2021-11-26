import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() currentYear: number;
  @Input() companyName: string;

  constructor() {
    this.currentYear = new Date().getFullYear();
    this.companyName = 'Softville, S. A.';
  }
}
