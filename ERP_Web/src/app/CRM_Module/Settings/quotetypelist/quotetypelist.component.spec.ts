import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotetypelistComponent } from './quotetypelist.component';

describe('QuotetypelistComponent', () => {
  let component: QuotetypelistComponent;
  let fixture: ComponentFixture<QuotetypelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuotetypelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotetypelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
