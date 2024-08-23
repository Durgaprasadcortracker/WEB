import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteslistingComponent } from './quoteslisting.component';

describe('QuoteslistingComponent', () => {
  let component: QuoteslistingComponent;
  let fixture: ComponentFixture<QuoteslistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteslistingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteslistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
