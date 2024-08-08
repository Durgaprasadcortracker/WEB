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
  
  companyid: any;
  submited = false;
  lineItem: any[] = [];

  @Output() childEvent = new EventEmitter<string>();
  @Input() editData: any;

  myForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    quoteId:new FormControl(''),
     companyId:new FormControl(''),
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
  });
companyId:any;
f: any;
  constructor(
    private http: BackendService,
    private route: ActivatedRoute,
    private router: Router,
    
  ) {
    
  }


  getGeneratedQuoteId() {
    this.http.getapi('api/Quotation/GenerateQuoteId').subscribe((quoteId) => {
      console.log(quoteId)
      this.myForm.get("quoteId")?.setValue(quoteId);
    });
  }
 

  ngOnInit() {
    this.AddNewLine();
  
   // Check if editing or adding a new quote
    this.Id = this.route.snapshot.paramMap.get('id');  // Get the Id from route parameters
  
    if (this.Id) {
      // Existing quote: Load the data
      this.loadExistingQuote();
    } else {
      // New quote: Generate a new QuoteId
      this.getGeneratedQuoteId();
    }

    if (this.Id) {
      // Existing quote: Load the data
      this.http.getapi(`api/Quotation/GetQuotationsbyid/${this.Id}`).subscribe((res) => {
        console.log(res);
        this.myForm.get("quoteId")?.setValue(res.data.quoteId);
        this.myForm.get("validuntil")?.setValue(new Date(res.data.validuntil));
        this.myForm.get("quotetype")?.setValue(res.data.quoteType == 1 ? "1" : "2");
        this.myForm.get("billingfromcompanyaddress")?.setValue(res.data.billingFromCompanyAddress);
        this.myForm.get("billingfromcompanyname")?.setValue(res.data.billingFromCompanyName);
        this.myForm.get("billingfromphonenumber")?.setValue(res.data.billingFromPhoneNumber);
        this.myForm.get("billingtocompanyaddress")?.setValue(res.data.billingToCompanyAddress);
        this.myForm.get("billingfromemail")?.setValue(res.data.billingFromEmail);
        this.myForm.get("billingfromcompanyaddress")?.setValue(res.data.billingFromCompanyAddress);
        this.myForm.get("billingtocompanyname")?.setValue(res.data.billingToCompanyName);
        this.myForm.get("billingtophonenumber")?.setValue(res.data.billingToPhoneNumber);
        this.myForm.get("billingtocompanyaddress")?.setValue(res.data.billingToCompanyAddress);
        this.myForm.get("billingtoemail")?.setValue(res.data.billingToEmail);
        this.myForm.get("termsandconditions")?.setValue(res.data.termsandconditions);
        this.myForm.get("descriptioninformation")?.setValue(res.data.descriptionInformation);
      });
    } else {
      // New quote: Generate a new QuoteId
      this.getGeneratedQuoteId();
    }
  
    this.getCompany();
  }
  loadExistingQuote() {
    throw new Error('Method not implemented.');
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
    this.myForm.get("companyId")?.setValue(this.companyId);
  
    if (quote.id === 0) {
      // Adding a new quote
      this.http.postapi('api/Quotation/AddQuotations', quote).subscribe(() => {
        this.router.navigate(['/CRM/companiesinfo']);
      });
    } else {
      // Updating an existing quote
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
    this.http.getapi(`api/Quotation/GetQuotations/${this.companyId}`).subscribe((res) => {
      console.log(res);
      this.lstcompany = res.data;
    });
  }


  

  getCompany() {
    this.http.getapi('api/Company/GetCompany').subscribe((res) => {
      console.log(res);
      this.companylist = res.data;
    });
  }
}

