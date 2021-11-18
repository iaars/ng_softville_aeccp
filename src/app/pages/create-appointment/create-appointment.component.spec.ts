import {ComponentFixture, TestBed} from '@angular/core/testing';
import {imports} from 'src/app/core/providers';

import {CreateAppoimentComponent} from './create-appointment.component';

describe('CreateAppoimentComponent', () => {
  let component: CreateAppoimentComponent;
  let fixture: ComponentFixture<CreateAppoimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAppoimentComponent],
      imports: imports
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppoimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
