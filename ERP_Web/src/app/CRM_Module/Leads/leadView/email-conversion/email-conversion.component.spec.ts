import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConversionComponent } from './email-conversion.component';

describe('EmailConversionComponent', () => {
  let component: EmailConversionComponent;
  let fixture: ComponentFixture<EmailConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailConversionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
