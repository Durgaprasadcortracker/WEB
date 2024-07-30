import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadStatusListComponent } from './lead-status-list.component';

describe('LeadStatusListComponent', () => {
  let component: LeadStatusListComponent;
  let fixture: ComponentFixture<LeadStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeadStatusListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
