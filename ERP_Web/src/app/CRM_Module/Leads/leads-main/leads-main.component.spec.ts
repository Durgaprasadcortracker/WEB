import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsMainComponent } from './leads-main.component';

describe('LeadsMainComponent', () => {
  let component: LeadsMainComponent;
  let fixture: ComponentFixture<LeadsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeadsMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
