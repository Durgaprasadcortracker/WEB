import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../../../../Services/BackendConnection/backend.service';


interface InvoiceItem {
  name: string;
  amount: number;
}

@Component({
  selector: 'app-quotes-invoice',
  templateUrl: './quotes-invoice.component.html',
  styleUrls: ['./quotes-invoice.component.scss']
}) 
export class QuotesInvoiceComponent  {
}
// export class QuotesInvoiceComponent implements OnInit {
// generatePDF() {
// throw new Error('Method not implemented.');
// }

//   invoiceDate: Date = new Date('2024-05-01');
//   paymentTerms: string = 'Cant be refunded';
//   dueDate: Date = new Date('2024-06-22');
//   poNumber: string = '12121321';
//   quotationNumber: string = '1111';
//   billTo: string = 'xyz';
//   shipTo: string = 'abc';
//   items: InvoiceItem[] = [];
//   subtotal: number = 0;
//   discountPercentage: number = 10;
//   discountAmount: number = 5000;
//   taxPercentage: number = 0;
//   taxAmount: number = 0;
//   total: number = 0;
//   notes: string = 'trainings';
//   terms: string = 'NON refundable';

//   constructor(private http: HttpClient, public backendService : BackendService) { }

  // ngOnInit(): void {
  //     this.getInvoiceData();
  // }

  // getInvoiceData(): void {
      
  //     this.http.getapi('').subscribe(data => {
  //         this.items = data.items;
  //         this.subtotal = data.subtotal;
  //         this.discountAmount = data.discountAmount;
  //         this.taxAmount = data.taxAmount;
  //         this.total = data.total;
  //     }, error => {
  //         console.error('Error fetching invoice data', error);
  //     });
  // }
