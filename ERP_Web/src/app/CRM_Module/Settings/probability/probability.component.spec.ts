import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbabilityComponent } from './probability.component';

describe('ProbabilityComponent', () => {
  let component: ProbabilityComponent;
  let fixture: ComponentFixture<ProbabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProbabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProbabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
