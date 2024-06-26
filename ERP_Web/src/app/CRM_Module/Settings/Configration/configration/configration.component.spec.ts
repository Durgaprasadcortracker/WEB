import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigrationComponent } from './configration.component';

describe('ConfigrationComponent', () => {
  let component: ConfigrationComponent;
  let fixture: ComponentFixture<ConfigrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
