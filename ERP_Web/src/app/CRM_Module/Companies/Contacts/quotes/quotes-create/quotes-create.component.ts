import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  @Output() childEvent = new EventEmitter<string>();
  @Input() editData: any;

  myForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    quoteowner: new FormControl(null, Validators.required),
    dealname: new FormControl(null, Validators.required),
    subject: new FormControl({ value: null, disabled: true }),
    validuntil: new FormControl('', Validators.required),
    quotetype: new FormControl('', Validators.required),
    billingfromcompanyname: new FormControl('', Validators.required),
    billingfromcompanyaddress: new FormControl('', Validators.required),
    billingfromemail: new FormControl('', [Validators.required, Validators.email]),
    billingfromphonenumber: new FormControl('', Validators.required),
    billingtocompanyname: new FormControl('', Validators.required),
    billingtocompanyaddress: new FormControl('', Validators.required),
    billingtoemail: new FormControl('', [Validators.required, Validators.email]),
    billingtophonenumber: new FormControl('', Validators.required),
    termsandconditions: new FormControl(''),
    descriptioninformation: new FormControl(''),
    productName: new FormControl(''),
    shippingcountry: new FormControl(''),
    quantity: new FormControl(0, Validators.required),
    listPrice: new FormControl(0, Validators.required),
    amount: new FormControl(0),
    discount: new FormControl(0),
    tax: new FormControl(0),
    total: new FormControl(0),
    subtotal: new FormControl(0),
    Discount: new FormControl(0),
    Tax: new FormControl(0),
    adjustment: new FormControl(0),
    grandtotal: new FormControl(0),
  });

  constructor(
    private http: BackendService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.Id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.AddNewLine();

    if (this.Id) {
      this.http.getapi(`api/Quotation/GetQuotationsby/${this.Id}`).subscribe((res) => {
        console.log(res);
        this.myForm.patchValue(res.data);
      });
    }

    this.getCompany();
  }

  selectTab(tab: any, index: number) {
    this.selectedTab = index;
  }

  addquotes(): void {
    this.submited = true;
    if (this.myForm.invalid) {
      return;
    }

    const quote = this.myForm.value;

    if (quote.id === 0) {
      this.http.postapi('api/Quotation/AddQuotations', quote).subscribe(() => {
        this.router.navigate(['/CRM/quotes-create']);
      });
    } else {
      this.http.putapi('api/Quotation/UpdateQuotations', this.myForm.getRawValue()).subscribe(() => {
        this.router.navigate(['/CRM/quotes-create']);
      });
    }
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

  lstcompany: any;

  getData() {
    this.http.getapi('api/Quotation/GetQuotations').subscribe((res) => {
      console.log(res);
      this.lstcompany = res;
    });
  }

  getCompany() {
    this.http.getapi('api/Company/GetCompany').subscribe((res) => {
      console.log(res);
      this.companylist = res.data;
    });
  }
}