import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccessInterface } from 'src/app/core/interfaces/access-interface';
import { UsuarioWrapper } from 'src/app/core/wrappers/UsuarioWrapper';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-generate-report-count',
  templateUrl: './generate-report-count.component.html',
  styleUrls: ['./generate-report-count.component.css']
})
export class GenerateReportCountComponent extends AccessInterface {
  patients: UsuarioWrapper[] = [];
  professionals: UsuarioWrapper[] = [];
  constructor(userService: UserService) {
    super(
      userService,
      new FormGroup({
        patient: new FormControl('', [Validators.required]),
        professional: new FormControl('', [Validators.required]),
      })
    );
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
  }

  protected onSuccess(): void {
    throw new Error('Method not implemented.');
  }

  protected onInvalidData(): void {
    throw new Error('Method not implemented.');
  }

}
