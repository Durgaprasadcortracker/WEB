import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesCreateComponent } from './quotes-create.component';

describe('QuotesCreateComponent', () => {
  let component: QuotesCreateComponent;
  let fixture: ComponentFixture<QuotesCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuotesCreateComponent]
    });
    fixture = TestBed.createComponent(QuotesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
