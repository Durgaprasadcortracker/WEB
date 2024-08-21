import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersDashboardComponent } from './reminders-dashboard.component';

describe('RemindersDashboardComponent', () => {
  let component: RemindersDashboardComponent;
  let fixture: ComponentFixture<RemindersDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemindersDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemindersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
