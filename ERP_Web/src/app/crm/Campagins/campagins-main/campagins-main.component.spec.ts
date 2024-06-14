import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaginsMainComponent } from './campagins-main.component';

describe('CampaginsMainComponent', () => {
  let component: CampaginsMainComponent;
  let fixture: ComponentFixture<CampaginsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaginsMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaginsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
