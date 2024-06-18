import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.css'
})
export class AddCompanyComponent {

  industrylist: any;

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

  myForm: FormGroup  = new FormGroup({
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
    bnusinessEmail: new FormControl(null),
    website: new FormControl(null),
    companyAddress1: new FormControl(null),
    campanyAddress2: new FormControl(null),
  });;

  ngOnInit() {
    console.log(this.Id);
    
    if (this.Id > 0) {
      this.http.getapi('Company/GetCompaniesby/' + this.Id).subscribe((res) => {
        console.log(res);
        this.myForm.patchValue({ ...res });
      });
    }
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
}