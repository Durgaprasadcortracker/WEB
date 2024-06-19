import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagedesignComponent } from './stagedesign.component';

describe('StagedesignComponent', () => {
  let component: StagedesignComponent;
  let fixture: ComponentFixture<StagedesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StagedesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StagedesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
