import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbabilityListComponent } from './probability-list.component';

describe('ProbabilityListComponent', () => {
  let component: ProbabilityListComponent;
  let fixture: ComponentFixture<ProbabilityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProbabilityListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProbabilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
