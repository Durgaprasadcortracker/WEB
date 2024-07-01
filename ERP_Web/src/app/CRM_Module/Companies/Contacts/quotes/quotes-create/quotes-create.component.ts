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
  quoteForm: any
  submitted: any;
  id: any;
  quoteItems: any;
  listOfCompanys: any;
  lineItem:any=[]
  companyid: any;
  constructor(private route: ActivatedRoute,
    private http: BackendService,
    private fb: FormBuilder,
    private ActivatedRoute: ActivatedRoute,
    private router: Router

  ) {
    this.companyid = this.route.snapshot.params['companyid'];
    this.id = this.route.snapshot.params['id'];
    this.getRequiredData()
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
  }
  addQuote() {
  }
  getRequiredData() {
    this.http.getapi('api/Company/GetCompany').subscribe((res) => {
      console.log(res);
      this.listOfCompanys = res.data;
    });
    this.http.getapi('api/Common/GetQuoteType').subscribe((res) => {
      console.log(res);
      if (res) {
        this.quoteItems = res.data
      }
    });
  }
  edit(_id: any) {
  }
  get f(): { [key: string]: AbstractControl } {
    return this.quoteForm.controls;
  }
  AddNewLine(){
    
  }
}