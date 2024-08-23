import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompainesRouteComponent } from './compaines-route.component';

describe('CompainesRouteComponent', () => {
  let component: CompainesRouteComponent;
  let fixture: ComponentFixture<CompainesRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompainesRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompainesRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
