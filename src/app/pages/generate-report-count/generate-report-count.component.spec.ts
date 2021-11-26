import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GenerateReportCountComponent} from './generate-report-count.component';

describe('GenerateReportCountComponent', () => {
  let component: GenerateReportCountComponent;
  let fixture: ComponentFixture<GenerateReportCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateReportCountComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateReportCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
