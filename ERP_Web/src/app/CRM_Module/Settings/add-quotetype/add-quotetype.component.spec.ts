import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuotetypeComponent } from './add-quotetype.component';

describe('AddQuotetypeComponent', () => {
  let component: AddQuotetypeComponent;
  let fixture: ComponentFixture<AddQuotetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddQuotetypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuotetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
