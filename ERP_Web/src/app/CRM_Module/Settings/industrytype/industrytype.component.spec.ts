import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrytypeComponent } from './industrytype.component';

describe('IndustrytypeComponent', () => {
  let component: IndustrytypeComponent;
  let fixture: ComponentFixture<IndustrytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndustrytypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustrytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
