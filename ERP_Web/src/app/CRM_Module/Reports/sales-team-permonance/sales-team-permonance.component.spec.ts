import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTeamPermonanceComponent } from './sales-team-permonance.component';

describe('SalesTeamPermonanceComponent', () => {
  let component: SalesTeamPermonanceComponent;
  let fixture: ComponentFixture<SalesTeamPermonanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesTeamPermonanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesTeamPermonanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
