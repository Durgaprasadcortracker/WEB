import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaCampaginsComponent } from './social-media-campagins.component';

describe('SocialMediaCampaginsComponent', () => {
  let component: SocialMediaCampaginsComponent;
  let fixture: ComponentFixture<SocialMediaCampaginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialMediaCampaginsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaCampaginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
