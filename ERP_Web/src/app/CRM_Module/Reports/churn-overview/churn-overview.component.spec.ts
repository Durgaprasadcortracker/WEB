import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurnOverviewComponent } from './churn-overview.component';

describe('ChurnOverviewComponent', () => {
  let component: ChurnOverviewComponent;
  let fixture: ComponentFixture<ChurnOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChurnOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChurnOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
