import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealCreatedVsLostComponent } from './deal-created-vs-lost.component';

describe('DealCreatedVsLostComponent', () => {
  let component: DealCreatedVsLostComponent;
  let fixture: ComponentFixture<DealCreatedVsLostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DealCreatedVsLostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealCreatedVsLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
