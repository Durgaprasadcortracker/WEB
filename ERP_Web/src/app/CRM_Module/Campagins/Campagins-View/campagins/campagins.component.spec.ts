import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaginsComponent } from './campagins.component';

describe('CampaginsComponent', () => {
  let component: CampaginsComponent;
  let fixture: ComponentFixture<CampaginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaginsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
