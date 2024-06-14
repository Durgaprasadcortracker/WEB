import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampaginComponent } from './add-campagin.component';

describe('AddCampaginComponent', () => {
  let component: AddCampaginComponent;
  let fixture: ComponentFixture<AddCampaginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCampaginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCampaginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
