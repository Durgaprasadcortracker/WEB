import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCampaginsComponent } from './email-campagins.component';

describe('EmailCampaginsComponent', () => {
  let component: EmailCampaginsComponent;
  let fixture: ComponentFixture<EmailCampaginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailCampaginsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailCampaginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
