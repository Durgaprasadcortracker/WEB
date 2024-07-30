import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotetypeListComponent } from './quotetype-list.component';

describe('QuotetypeListComponent', () => {
  let component: QuotetypeListComponent;
  let fixture: ComponentFixture<QuotetypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuotetypeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotetypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
