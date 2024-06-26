import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-company',
  templateUrl: './add-new-company.component.html',
  styleUrl: './add-new-company.component.css'
})
export class AddNewCompanyComponent {

  // industrylist: any;
  // industrytypelist: any;
  // citylist: any;
  // statelist: any;
  // countrylist: any;
  // timeZonelist: any;

  // page: number = 1;
  // count: number = 0;
  // tableSize: number = 10;
  // tableSizes: any = [3, 6, 9, 12];
  // p: number = 1;
  // Id: any;

  // constructor(private http: BackendService,
  //   private route: ActivatedRoute,
  //   private router: Router) {
  //   this.Id = this.route.snapshot.paramMap.get('id');
  // }
  // @Output() childEvent = new EventEmitter<string>();
  // @Input() editData: any;

  // myForm: FormGroup | any;

  // ngOnInit() {
  //   console.log(this.Id);
  //   this.myForm  = new FormGroup({
  //     Id: new FormControl(0),
  //     domainName: new FormControl(null),
  //     companyName: new FormControl(null),
  //     companyOwner: new FormControl(null),
  //     companyIndustry: new FormControl(null),
  //     companyIndustryType: new FormControl(null),
  //     headCount: new FormControl(null),
  //     annualRevenue: new FormControl(null),
  //     city: new FormControl(null),
  //     state: new FormControl(null),
  //     country: new FormControl(null),
  //     postalCode: new FormControl(null),
  //     timeZone: new FormControl(null),
  //     linkedinUrl: new FormControl(null),
  //     businessEmail: new FormControl(null),
  //     website: new FormControl(null),
  //     companyAddress1: new FormControl(null),
  //     campanyAddress2: new FormControl(null),
  //   });
  //   if (this.Id > 0) {
  //     this.http.getapi('Company/GetCompaniesby/' + this.Id).subscribe((res) => {
  //       console.log(res);
  //       this.myForm.patchValue({ ...res });
  //     });
  //   }

  //   this.getIndustry();
  //   this.getIndustrytype();
  //   this.getCity();
  //   this.getState();
  //   this.getCountry();
  //   this.getTimeZone();
  // }

  // addcompany() {
  //   console.log(this.myForm.getRawValue());
  //   this.http.postapi('api/Company/AddCompanies', this.myForm.getRawValue()).subscribe((res) => {
  //     console.log(res);
  //     if(res.status){
  //       this.router.navigate(['/CRM/Companies']);
  //     }
  //   }); 
  //   if (this.myForm.valid) {
  //     this.http.putapi('api/Company/UpdateCompanies/'+this.Id, this.myForm.value).subscribe((res) => {
  //       console.log(res);
  //       this.router.navigate(['/CRM/Companies']);
  //     });
  //   }
  // }

  // close() {
  //   this.myForm.reset();
  //   this.router.navigate(['/CRM/Companies']);
  // }

  // getIndustry() {
  //   this.http.getapi('api/Company/GetIndustryDetails').subscribe((res) => {
  //     console.log(res);
  //     this.industrylist = res
  //   }
  //   );
  // }
  // getIndustrytype() {
  //   this.http.getapi('api/Company/GetIndustryTypeDetails').subscribe((res) => {
  //     console.log(res);
  //     this.industrytypelist = res
  //   }
  //   );
  // }
  // getTimeZone(){
  //   this.http.getapi('api/Company/GetTimeZoneDetails').subscribe((res) => {
  //     console.log(res);
  //     this.timeZonelist = res
  //   });
  // }
  // getCity(){
  //   this.http.getapi('api/Company/GetCitiesDetails').subscribe((res) => {
  //     console.log(res);
  //     this.citylist = res
  //   });
  // }
  // getState(){
  //   this.http.getapi('api/Company/GetStateDetails').subscribe((res) => {
  //     console.log(res);
  //     this.statelist = res
  //   });
  // }
  // getCountry(){
  //   this.http.getapi('api/Company/GetCountryDetails').subscribe((res) => {
  //     console.log(res);
  //     this.countrylist = res
  //   });
  // }

  // onSubmit() {
  //   if (this.myForm.valid) {
  //     this.http.putapi(`api/Company/UpdateCompanies/${this.Id}`, this.myForm.value).subscribe((res) => {
  //       console.log(res);
  //       this.router.navigate(['/CRM/Companies']);
  //     });
  //   }
  // }




  industrylist: any;
  industrytypelist: any;
  citylist: any;
  statelist: any;
  countrylist: any;
  timeZonelist: any;
  submitted: any;
  f: any;
  Id: any;

  @Output() childEvent = new EventEmitter<string>();
  @Input() editData: any;



  myForm: FormGroup = new FormGroup({
    Id: new FormControl(0),
    domainName: new FormControl(null),
    companyName: new FormControl(null),
    companyOwner: new FormControl(null),
    companyIndustry: new FormControl(<number>(0)),
    companyIndustryType: new FormControl(<number>(0)),
    headCount: new FormControl(null),
    annualRevenue: new FormControl(null),
    city: new FormControl(<number>(0)),
    state: new FormControl(<number>(0)),
    country: new FormControl(<number>(0)),
    postalCode: new FormControl(null),
    timeZone: new FormControl(<number>(0)),
    linkedinUrl: new FormControl(null),
    businessEmail: new FormControl(null),
    website: new FormControl(null),
    companyAddress1: new FormControl(null),
    campanyAddress2: new FormControl(null),
  });


  constructor(
    private fb: FormBuilder,
    private http: BackendService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.Id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      id: [0],
      domainName: [null, Validators.required],
      companyName: [null, Validators.required],
      companyOwner: [null, Validators.required],
      companyIndustry: ['0'],
      companyIndustryType: ['0'],
      headCount: [null, Validators.required],
      annualRevenue: [null, Validators.required],
      city: ['0'],
      state: ['0'],
      country: ['0'],
      postalCode: [null, Validators.required],
      timeZone: ['0'],
      linkedinUrl: [null, [Validators.required, Validators.required]],
      businessEmail: [null, [Validators.required, Validators.email]],
      website: [null, [Validators.required, Validators.required]],
      companyAddress1: [null, Validators.required],
      companyAddress2: [null]
    });
    if (this.Id) {
      this.http.getapi('api/Company/GetCompaniesby/' + this.Id).subscribe((res) => {
        console.log(res)
        this.myForm.patchValue(res.data);
      });
    }

    this.getIndustry();
    this.getIndustrytype();
    this.getCity();
    this.getState();
    this.getCountry();
    this.getTimeZone();
  }

  addcompany() {
    if (this.myForm.value.id == 0) {
      console.log(this.myForm.value)
      this.http.postapi('api/Company/AddCompanies', this.myForm.value).subscribe(() => {
        this.router.navigate(['/CRM/Companies']);
      });
    }
    else if(this.myForm.value.id > 0) {
      console.log("edit")
      this.http.putapi(`api/Company/UpdateCompanies/${this.Id}`, this.myForm.value).subscribe(() => {
        this.router.navigate(['/CRM/Companies']);
      });
    }
  }
  

  close() {
    this.myForm.reset();
    this.router.navigate(['/CRM/Companies']);
  }

  getIndustry() {
    this.http.getapi('api/Company/GetIndustryDetails').subscribe((res) => {
      this.industrylist = res;
    });
  }

  getIndustrytype() {
    this.http.getapi('api/Company/GetIndustryTypeDetails').subscribe((res) => {
      this.industrytypelist = res;
    });
  }

  getTimeZone() {
    this.http.getapi('api/Company/GetTimeZoneDetails').subscribe((res) => {
      this.timeZonelist = res;
    });
  }

  getCity() {
    this.http.getapi('api/Company/GetCitiesDetails').subscribe((res) => {
      this.citylist = res;
    });
  }

  getState() {
    this.http.getapi('api/Company/GetStateDetails').subscribe((res) => {
      this.statelist = res;
    });
  }

  getCountry() {
    this.http.getapi('api/Company/GetCountryDetails').subscribe((res) => {
      this.countrylist = res;
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.http.putapi(`api/Company/UpdateCompanies/${this.Id}`, this.myForm.value).subscribe(() => {
        this.router.navigate(['/CRM/Companies']);
      });
    }
  }
}

