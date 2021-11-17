import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppoimentFormComponent } from './create-appoiment-form.component';

describe('CreateAppoimentFormComponent', () => {
  let component: CreateAppoimentFormComponent;
  let fixture: ComponentFixture<CreateAppoimentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAppoimentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppoimentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
