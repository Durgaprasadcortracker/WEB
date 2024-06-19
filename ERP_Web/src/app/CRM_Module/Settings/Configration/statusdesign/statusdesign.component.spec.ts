import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusdesignComponent } from './statusdesign.component';

describe('StatusdesignComponent', () => {
  let component: StatusdesignComponent;
  let fixture: ComponentFixture<StatusdesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusdesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusdesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
