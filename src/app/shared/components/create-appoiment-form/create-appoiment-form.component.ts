import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-appoiment-form',
  templateUrl: './create-appoiment-form.component.html',
  styleUrls: ['./create-appoiment-form.component.css']
})
export class CreateAppoimentFormComponent implements OnInit {
  public form: FormGroup;

  constructor(public formGroup: FormGroup) {
    this.form = formGroup;
  }

  ngOnInit(): void {}

  onSubmit() {}
}
