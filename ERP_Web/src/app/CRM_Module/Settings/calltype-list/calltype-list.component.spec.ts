import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalltypeListComponent } from './calltype-list.component';

describe('CalltypeListComponent', () => {
  let component: CalltypeListComponent;
  let fixture: ComponentFixture<CalltypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalltypeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalltypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
