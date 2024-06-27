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
  selectedTab: number = 0;  // Ensure selectedTab is initialized as a number
  QuotedItems = false;
  public tabs = ["Quote Information", "Quoted Items"];
  Id: any;
  submited = false;
  lineItem: any[] = [];

  constructor(
    private http: BackendService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,private fb:FormBuilder
  ) {
    this.Id = this.route.snapshot.paramMap.get('id');
  }

  @Output() childEvent = new EventEmitter<string>();
  @Input() editData: any;

  

  myForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    quoteowner: new FormControl(null),
    dealname: new FormControl(null),
    subject: new FormControl(null),
    validuntil: new FormControl(''),
    quotetype: new FormControl(''),
    billingfromcompanyname: new FormControl(null),
    billingfromcompanyaddress: new FormControl(null),
    billingfromemail: new FormControl(null),
    billingfromphonenumber: new FormControl(null),
    billingtocompanyname: new FormControl(null),
    billingtocompanyaddress: new FormControl(null),
    billingtoemail: new FormControl(null),
    billingtophonenumber: new FormControl(null),
    termsandconditions: new FormControl(null),
    descriptioninformation: new FormControl(null),
    productName: new FormControl(null),
    shippingcountry: new FormControl(null),
    quantity: new FormControl(0),
    listPrice: new FormControl(0),
    amount: new FormControl(0),
    discount: new FormControl(0),
    tax: new FormControl(0),
    total: new FormControl(0),
    subtotal: new FormControl(0), 
    adjustment: new FormControl(0),
    grandtotal: new FormControl(0),
  });

  

  ngOnInit() {
    this.myForm = this.fb.group({
      id: [0],
      quoteowner: [null, Validators.required],
      dealname: [null, Validators.required],
      subject: [null, Validators.required],
      validuntil: [null, Validators.required],
      quotetype: [null, Validators.required],
      billingfromcompanyname: [null, Validators.required],
      billingfromcompanyaddress: [null, Validators.required],
      billingfromemail: [null, Validators.required],
      billingfromphonenumber: [null, Validators.required],
      billingtocompanyname: [null, Validators.required],
      billingtocompanyaddress: [null, Validators.required],
      billingtoemail: [null, Validators.required],
      billingtophonenumber: [null, Validators.required],
      termsandconditions: [null, Validators.required],
      descriptioninformation: [null, Validators.required],
      productName: [null, Validators.required],
      shippingcountry: [null, Validators.required],
      quantity: [null, Validators.required],
      listPrice: [null, Validators.required],
      amount: [null, Validators.required],
      discount: [null, Validators.required],
      tax: [null, Validators.required],
      total: [null, Validators.required],
      subtotal: [null, Validators.required],
      adjustment: [null, Validators.required],
      grandtotal: [null, Validators.required],
      
    });
    this.getQuotation();
    this.getCompany();

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
      this.http.postapi('api/Quotation/AddQuotations',this.myForm.value).subscribe(() => {
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
    this.editData = null;
    this.childEvent.emit('Hello Parent!');
  }
  getCompany(){
    
        this.http.getapi('api/Company/GetCompany').subscribe((res) => {
            console.log(res);
            
            this.companylist=res.data
          }
        );
      }
 

  getQuotation() {
    
    this.http.getapi('api/Quotation/GetQuotations').subscribe((res) => {
      console.log(res);
      this.companylist = res.data;
    });
  }
}