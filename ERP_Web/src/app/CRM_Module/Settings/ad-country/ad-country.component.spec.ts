import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCountryComponent } from './ad-country.component';

describe('AdCountryComponent', () => {
  let component: AdCountryComponent;
  let fixture: ComponentFixture<AdCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdCountryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
