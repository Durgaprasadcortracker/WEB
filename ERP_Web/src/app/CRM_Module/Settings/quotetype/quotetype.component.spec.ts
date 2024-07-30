import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotetypeComponent } from './quotetype.component';

describe('QuotetypeComponent', () => {
  let component: QuotetypeComponent;
  let fixture: ComponentFixture<QuotetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuotetypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
