import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendService } from '../../../../../Services/BackendConnection/backend.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
// import { QuoteItemsService, Summary } from '../quoteitems.service';


// interface Quote {
//   quoteId: string;
//   companyName: string;
//   validUntil: string;
//   quoteType: null;
//   billingFromCompanyName: string;
//   billingFromCompanyAddress: string;
//   billingFromEmail: string;
//   billingFromPhoneNumber: string;
//   billingToCompanyName: string;
//   billingToCompanyAddress: string;
//   billingToEmail: string;
//   billingToPhoneNumber: string;
//   termsConditions: string;
//   descriptionInformation: string;
// }
// declare var bootstrap: any;




@Component({
  selector: 'app-quoteslisting',
  templateUrl: './quoteslisting.component.html',
  styleUrls: ['./quoteslisting.component.scss']
})
export class QuoteslistingComponent {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  p: number = 1;
  a: any;
  route: any;
  companyId: any;
  id: any;
  quotation: any;
  constructor(private http: BackendService,
     private router: Router,
      private activateroute: ActivatedRoute,
      private snackBar: MatSnackBar,
    ) {
    this.activateroute.queryParamMap.subscribe((params) => {

      this.id = this.activateroute.snapshot.params['id'];
      console.log(this.id);

    });
  }


  data = {
    records: 0
  }
  addQuotes = 0
  listOfQuotes: any
  editData: any

  ngOnInit() {
    this.getData()
  }

  addQuote(message: any) {
    console.log(message);
    this.addQuotes = 0;
    this.editData = null;
    this.ngOnInit()
  }
  getData() {
    this.http.getapi(`api/Quotation/GetQuotations/${this.id}`).subscribe((res) => {
      console.log(res);
      this.listOfQuotes = res
    }
    );
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getData();
  }
  deleteQuotation(ID: any) {
    this.http.deleteapi('api/Quotation/DeleteQuotations/' + ID).subscribe((res) => {
      this.snackBar.open('Quotation successfully Deleted!', 'Close', {
        duration: 3000, // Snackbar stays open for 3 seconds
      });
      console.log(res);
      this.listOfQuotes = res
      this.ngOnInit()
    }
    );
  }
  edit(Id: any) {
    this.router.navigate(['/CRM/editcompany', Id]);
  }
}


// quote: Quote = {
//   quoteId: '',
//   companyName: '',
//   validUntil: '',
//   quoteType: null,
//   billingFromCompanyName: '',
//   billingFromCompanyAddress: '',
//   billingFromEmail: '',
//   billingFromPhoneNumber: '',
//   billingToCompanyName: '',
//   billingToCompanyAddress: '',
//   billingToEmail: '',
//   billingToPhoneNumber: '',
//   termsConditions: '',
//   descriptionInformation: ''
// };

// products: any[] = [];
// newProduct: any = { 
//   quoteId: '',
//   productName: '',
//   quantity: '',
//   price: null,
//   amount: null,
//   discount: null,
//   tax: null,
//   total: null,
// };

// summary: any = {
//   quoteId: '',
//   subTotal: null,
//   subDiscount: null,
//   subTax: null,
//   adjustment: null,
//   grandTotal: null
// };





// constructor(private http: BackendService,
//       private router: Router,
//        private activateroute: ActivatedRoute,
//       private snackBar: MatSnackBar,
// ) {} 

// ngOnInit(): void {
//   this.getQuoteItems();
// }

// getQuoteItems(): void {
//   this.http.getapi('api/Quotation/quotation').subscribe(data => {
//     this.products = data;
//   },
//   error => {
//     console.error('Error fetching quote items', error);
//   });
// }

// addQuoteItem(): void {
//   const payload = this.newProduct; 
//   console.log('Payload:', payload);
//   this.newProduct.quoteId = this.quote.quoteId;
//   console.log('Payload:', payload);

//   this.http.postapi('api/Quotation/quoteitem', payload).subscribe({
//     next: () => {
//       this.getQuoteItems(); 
//       this.resetForm();
//     },
//     error: (err) => {
//       console.error('Error adding quote item', err);
//       alert('An error occurred while adding the quote item. Please try again.');
//     }
//   });
// }

// onSubmit(): void {
//   this.http.postapi('api/Quotation/quotation', this.quote)
//   .subscribe(response => {
//     this.quote.quoteId = response.quoteId;
//     this.switchToQuoteItemsTab(); 
//     this.getQuoteItems(); 
//     console.log('Product saved successfully', response);
//   }, error => {
//     console.error('Error saving product', error);
//   });
// }

// switchToQuoteItemsTab(): void {
//   const tabTrigger = document.querySelector('#quote-items-tab');
//   if (tabTrigger) {
//     const tab = new bootstrap.Tab(tabTrigger);
//     tab.show(); 
//   }
// }

// resetForm(): void {
//   this.newProduct = {
//     quoteId: this.quote.quoteId,
//     productName: '',
//     quantity: '',
//     price: null,
//     amount: null,
//     discount: null,
//     tax: null,
//     total: null,
//   };
// }

// saveProduct(): void { 
//   this.addQuoteItem();
// }

// submitSummary(): void {
//   console.log('Quote:', this.quote); 
//   console.log('Quote ID:', this.quote.quoteId);
//   this.http.postapi('api/Quotation/quoteitemsummary', this.summary).subscribe({
//     next: () => {
//       console.log('Summary saved successfully');
//       this.resetSummaryForm(); 
//     },
//     error: (err) => {
//       console.error('Error saving summary', err);
//       alert('An error occurred while saving the summary. Please try again.');
//     }
//   });
// }

// resetSummaryForm(): void {
//   if (!this.quote.quoteId) {
//     console.error('Quote ID is not set');
//     return;
// }
//   this.summary = {
//     quoteId: this.quote.quoteId,
//     subTotal: null,
//     subDiscount: null,
//     subTax: null,
//     adjustment: null,
//     grandTotal: null
//   };
// }

