import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrl: './add-contacts.component.css'
})
export class AddContactsComponent {

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  p: number = 1;
  Id: any;
 citylist: any;
 countrylist:any;
 statelist:any;
 companylist:any;
timeZonelist: any;
sourcelist: any;

  constructor(private http: BackendService,
    private route: ActivatedRoute,
    private router: Router) {
    this.Id = this.route.snapshot.paramMap.get('id');
  }
  @Output() childEvent = new EventEmitter<string>();
  @Input() editData: any;

  myForm: FormGroup  = new FormGroup({
    Id: new FormControl(0),
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    email: new FormControl(null),
    mobileNumber: new FormControl(null),
    alternateNumber: new FormControl(null),
    designation: new FormControl(null),
    companyName: new FormControl(null),
    city: new FormControl(''),
    state: new FormControl(null),
    country: new FormControl(null),
    postalCode: new FormControl(null),
    timeZone: new FormControl(null),
    source: new FormControl(null),
    address1: new FormControl(null),
    address2: new FormControl(null)
    
  });;

  ngOnInit() {
    console.log(this.Id);
    
    if (this.Id > 0) {
      this.http.getapi('api/Contacts/GetContactsby/' + this.Id).subscribe((res) => {
        console.log(res);
        this.myForm.patchValue({ ...res });
      });


    }
    this.getCompany();
    this.getCity();
    this.getState();
    this.getCountry();
    this.getTimeZone();
    this.getSource();

  }

  addcontact() {
    console.log(this.myForm.getRawValue());
    this.http.postapi('api/Contacts/AddContacts', this.myForm.getRawValue()).subscribe((res) => {
      console.log(res);
    });
  }
  getCompany(){
    this.http.getapi('api/Contacts/GetCompanies').subscribe((res) => {
        console.log(res);
        this.companylist=res
      }
    );
  }

  getCity(){
    this.http.getapi('api/Contacts/GetCities').subscribe((res) => {
        console.log(res);
        this.citylist=res
      }
    );
  }
  getState(){
    this.http.getapi('/api/Contacts/GetStateDetails').subscribe((res) => {
        console.log(res);
        this.statelist=res
      }
    );
  }

  getCountry(){
    this.http.getapi('/api/Contacts/GetCountryDetails').subscribe((res) => {
        console.log(res);
        this.countrylist=res
      }
    );
  }
  getTimeZone(){
    this.http.getapi('api/Contacts/GetTimezone').subscribe((res) => {
        console.log(res);
        this.timeZonelist=res
      }
    );
  }
  getSource(){
    this.http.getapi('api/Contacts/GetSource').subscribe((res) => {
        console.log(res);
        this.sourcelist=res
      }
    );
  }
  close() {
    this.myForm.reset();
    this.router.navigate(['/Contacts']);
  }
}
