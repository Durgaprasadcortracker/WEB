import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quotes-create',
  templateUrl: './quotes-create.component.html',
  styleUrls: ['./quotes-create.component.scss']
})
export class QuotesCreateComponent {

  companylist: any;
  myForm: any
  selectedTab: number = 0;
  quoteTypes:any
  QuotedItems = false;
  public tabs = ["Quote Information", "Quoted Items"];
  Id: any;
  submited = false;
  lineItem: any[] = [];
  quoteForm: any
  companyid: any;
  constructor(
    private http: BackendService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.companyid = this.route.snapshot.paramMap.get('companyid');
    this.getRequired()
  }

  ngOnInit() {
    this.quoteForm = this.fb.group({
      id: [null],
      companyId: [this.companyid],
      quoteId: ['', Validators.required],
      validUntil: [null, Validators.required],
      quoteType: [null, Validators.required],
      quoteTypeName: [''],
      billingFromCompanyName: ['', Validators.required],
      billingFromCompanyAddress: ['', Validators.required],
      billingFromEmail: ['', [Validators.required, Validators.email]],
      billingFromPhoneNumber: ['', Validators.required],
      billingToCompanyName: ['', Validators.required],
      billingToCompanyAddress: ['', Validators.required],
      billingToEmail: ['', [Validators.required, Validators.email]],
      billingToPhoneNumber: ['', Validators.required],
      termsandconditions: ['', Validators.required],
      descriptionInformation: ['', Validators.required],
      createdBy: [null],
      createdAt: [null],
      modifiedBy: [null],
      modifiedAt: [null],
      companyNewid: [null]
    });
    this.getQuotation();
    if (this.Id) {
      this.http.getapi(`api/Quotation/GetQuotationsby/${this.Id}`).subscribe((res) => {
        console.log(res);
        this.myForm.patchValue(res.data);
      });
    }
  }

  selectTab(tab: any, index: number) {
    this.selectedTab = index;
  }

  addquotations(): void {
    this.submited = true;
    if (this.myForm.invalid) {
      return;
    }
    console.log(this.myForm.value)
    if (this.myForm.valid) {
      if (this.myForm.value.id === 0) {
        console.log('Adding new Quotation:', this.myForm.value);
        this.http.postapi('api/Quotation/AddQuotations', this.myForm.value).subscribe(() => {
          this.snackBar.open('Quotation successfully added!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/CRM/quotes-create']);
        }, error => {
          console.error('Error adding Quotation:', error);
        });
      } else if (this.myForm.value.id > 0) {
        console.log('Editing Quotation:', this.myForm.value);
        this.http.putapi('api/Quotations/UpdateQuotations', this.myForm.getRawValue()).subscribe(() => {
          this.snackBar.open('Quotation successfully updated!', 'Close', {
            duration: 3000, // Snackbar stays open for 3 seconds
          });
          this.router.navigate(['/CRM/quoteslisting']);
        }, error => {
          console.error('Error updating Quotation:', error);
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  next() {
    console.log(this.quoteForm);
    this.AddNewLine()
    this.selectedTab = 1;
    this.QuotedItems = true;
  }

  submit() {
    const obj = {
      quote: this.myForm.value,
      lineitems: this.lineItem
    };
    console.log(obj);
  }

  AddNewLine() {
    const obj = {
      productName: "",
      quantity: 0,
      listPrice: 0,
      amount: 0,
      discount: 0,
      tax: 0,
      total: 0
    };
    this.lineItem.push({ ...obj });
  }

  calculateTotal(i: number) {
    const item = this.lineItem[i];
    item.amount = item.quantity * item.listPrice;
    item.total = item.amount - item.discount + item.tax;
  }

  onSubmit() {
    this.http.postapi('api/Quotation/AddCompanies', this.myForm.getRawValue()).subscribe(() => {
      this.router.navigate(['/CRM/quotes-create']);
    });
  }

  close() {
    this.myForm.reset();
  }
  getRequired() {
    this.http.getapi('api/Company/GetCompany').subscribe((res) => {
      console.log(res);
      this.companylist = res.data
    });
    this.http.getapi('api/Common/GetQuoteType').subscribe((res) => {
      console.log(res);
      this.quoteTypes = res.data
    });
  }
  getQuotation() {
    this.http.getapi('api/Quotation/GetQuotations').subscribe((res) => {
      console.log(res);
      this.companylist = res.data;
    });
  }
}