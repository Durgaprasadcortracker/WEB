import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrytypeListComponent } from './industrytype-list.component';

describe('IndustrytypeListComponent', () => {
  let component: IndustrytypeListComponent;
  let fixture: ComponentFixture<IndustrytypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndustrytypeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustrytypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
