import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-new-company',
  templateUrl: './add-new-company.component.html',
  styleUrl: './add-new-company.component.css'
})
export class AddNewCompanyComponent {

  industrylist: any;
  industrytypelist: any;
  citylist: any;
  statelist: any;
  countrylist: any;


  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  p: number = 1;
  Id: any;

  constructor(private http: BackendService,
    private route: ActivatedRoute,
    private router: Router) {
    this.Id = this.route.snapshot.paramMap.get('id');
  }
  @Output() childEvent = new EventEmitter<string>();
  @Input() editData: any;

  myForm: FormGroup | any;

  ngOnInit() {
    console.log(this.Id);
    this.myForm  = new FormGroup({
      Id: new FormControl(0),
      domainName: new FormControl(null),
      companyName: new FormControl(null),
      companyOwner: new FormControl(null),
      companyIndustry: new FormControl(null),
      companyIndustryType: new FormControl(null),
      headCount: new FormControl(null),
      annualRevenue: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      country: new FormControl(null),
      postalCode: new FormControl(null),
      timeZone: new FormControl(null),
      linkedinUrl: new FormControl(null),
      businessEmail: new FormControl(null),
      website: new FormControl(null),
      companyAddress1: new FormControl(null),
      campanyAddress2: new FormControl(null),
    });;
    if (this.Id > 0) {
      this.http.getapi('Company/GetCompaniesby/' + this.Id).subscribe((res) => {
        console.log(res);
        this.myForm.patchValue({ ...res });
      });
    }

    this.getIndustry();
    this.getIndustrytype();
    this.getCity();
    this.getState();
    this.getCountry();
  }
  
  addcompany() {
    console.log(this.myForm.getRawValue());
    this.http.postapi('api/Company/AddCompanies', this.myForm.getRawValue()).subscribe((res) => {
      console.log(res);
    }); 
  }
  
  close() {
    this.myForm.reset();
    this.router.navigate(['/Companies']);
  }

  getIndustry() {
    this.http.getapi('api/Common/GetIndustry').subscribe((res) => {
      console.log(res);
      this.industrylist = res
    }
    );
  }
  getIndustrytype() {
    this.http.getapi('api/Common/GetIndustrytype').subscribe((res) => {
      console.log(res);
      this.industrytypelist = res
    }
    );
  }
  getCity(){
    this.http.getapi('api/Company/cities').subscribe((res) => {
      console.log(res);
      this.citylist = res
    });
  }
  getState(){
    this.http.getapi('api/Company/GetStates').subscribe((res) => {
      console.log(res);
      this.statelist = res
    });
  }
  getCountry(){
    this.http.getapi('api/Company/GetCountry').subscribe((res) => {
      console.log(res);
      this.countrylist = res
    });
  }
}
