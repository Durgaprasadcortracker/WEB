import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadStageComponent } from './lead-stage.component';

describe('LeadStageComponent', () => {
  let component: LeadStageComponent;
  let fixture: ComponentFixture<LeadStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeadStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
