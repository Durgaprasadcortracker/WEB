import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuebyMonthuarterearComponent } from './revenueby-monthuarterear.component';

describe('RevenuebyMonthuarterearComponent', () => {
  let component: RevenuebyMonthuarterearComponent;
  let fixture: ComponentFixture<RevenuebyMonthuarterearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RevenuebyMonthuarterearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenuebyMonthuarterearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
