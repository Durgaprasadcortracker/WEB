import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalltypeComponent } from './calltype.component';

describe('CalltypeComponent', () => {
  let component: CalltypeComponent;
  let fixture: ComponentFixture<CalltypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalltypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalltypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
