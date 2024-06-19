import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcedesignComponent } from './sourcedesign.component';

describe('SourcedesignComponent', () => {
  let component: SourcedesignComponent;
  let fixture: ComponentFixture<SourcedesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SourcedesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourcedesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
