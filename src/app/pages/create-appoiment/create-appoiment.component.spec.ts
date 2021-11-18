import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateAppoimentComponent} from './create-appoiment.component';

describe('CreateAppoimentComponent', () => {
  let component: CreateAppoimentComponent;
  let fixture: ComponentFixture<CreateAppoimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAppoimentComponent]
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
