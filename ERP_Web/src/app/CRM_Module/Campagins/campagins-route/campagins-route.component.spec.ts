import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaginsRouteComponent } from './campagins-route.component';

describe('CampaginsRouteComponent', () => {
  let component: CampaginsRouteComponent;
  let fixture: ComponentFixture<CampaginsRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaginsRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaginsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
