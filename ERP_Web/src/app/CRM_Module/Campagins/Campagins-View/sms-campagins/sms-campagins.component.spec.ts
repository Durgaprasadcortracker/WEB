import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsCampaginsComponent } from './sms-campagins.component';

describe('SmsCampaginsComponent', () => {
  let component: SmsCampaginsComponent;
  let fixture: ComponentFixture<SmsCampaginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmsCampaginsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsCampaginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
