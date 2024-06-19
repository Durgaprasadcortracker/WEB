import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelinesMainComponent } from './pipelines-main.component';

describe('PipelinesMainComponent', () => {
  let component: PipelinesMainComponent;
  let fixture: ComponentFixture<PipelinesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PipelinesMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelinesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
