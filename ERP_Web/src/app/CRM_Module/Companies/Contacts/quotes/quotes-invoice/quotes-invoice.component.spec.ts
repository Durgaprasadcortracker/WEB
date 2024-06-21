import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesInvoiceComponent } from './quotes-invoice.component';

describe('QuotesInvoiceComponent', () => {
  let component: QuotesInvoiceComponent;
  let fixture: ComponentFixture<QuotesInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuotesInvoiceComponent]
    });
    fixture = TestBed.createComponent(QuotesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
