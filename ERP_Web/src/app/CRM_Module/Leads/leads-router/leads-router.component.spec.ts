import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsRouterComponent } from './leads-router.component';

describe('LeadsRouterComponent', () => {
  let component: LeadsRouterComponent;
  let fixture: ComponentFixture<LeadsRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeadsRouterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadsRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
