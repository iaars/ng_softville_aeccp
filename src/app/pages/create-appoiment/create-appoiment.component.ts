import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-appoiment',
  templateUrl: './create-appoiment.component.html',
  styleUrls: ['./create-appoiment.component.css']
})
export class CreateAppoimentComponent implements OnInit {
  public form: FormGroup;

  constructor(public formGroup: FormGroup) {
    this.form = new FormGroup({
      paciente: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [Validators.required]),
      telefono: new FormControl('', []),
      correo: new FormControl('', []),
      profesional: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      hora: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {}
}
