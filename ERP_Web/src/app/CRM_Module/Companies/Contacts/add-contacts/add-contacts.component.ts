import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, RequiredValidator } from '@angular/forms';

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
  fb: any;

  constructor(private http: BackendService,
    private route: ActivatedRoute,
    private router: Router) {
    this.Id = this.route.snapshot.paramMap.get('id');
  }
  @Output() childEvent = new EventEmitter<string>();
  @Input() editData: any;

  myForm: FormGroup  = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    email: new FormControl(null),
    mobileNumber: new FormControl(null),
    alternateNumber: new FormControl(null),
    designation: new FormControl(null),
    CompanyId: new FormControl(null),
    city: new FormControl(''),
    state: new FormControl(null),
    country: new FormControl(null),
    postalCode: new FormControl(null),
    timeZone: new FormControl(null),
    source: new FormControl(''),
    address1: new FormControl(null),
    address2: new FormControl(null)
    
  });

  ngOnInit() {
    this.getCompany();
    this.getCity();
    this.getState();
    this.getCountry();
    this.getTimeZone();
    this.getSource();  
    console.log(this.Id)
    this.myForm=new FormGroup({
      id:new FormControl(<Number>(0)),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      mobileNumber: new FormControl(''),
      alternateNumber: new FormControl(''),
      designation: new FormControl(''),
      CompanyId: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      postalCode: new FormControl(''),
      timeZone: new FormControl(''),
      source: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl('')
      


    });
    
    if (this.Id) {

      this.http.getapi('api/Contacts/GetContactsby/' + this.Id).subscribe((res) => {
        console.log(res);
        this.myForm.patchValue(res.data);
      });
    }
   
  }
  cityId:any;

  getstatesbycountrycity(){
    debugger;
    this.countryId= this.myForm.get("country")?.value;
    this.cityId=this.myForm.get("city")?.value;
    this.http.getapi('api/Common/GetCountryByState/'+this.cityId+"/"+this.countryId).subscribe((res) => {
      debugger;
      this.statelist = res.data;
    });
  }
  countryId:any;
  getCitybycountry(){
    debugger;
    this.countryId= this.myForm.get("country")?.value;
    this.http.getapi('api/Common/cities/'+this.countryId).subscribe((res) => {
      this.citylist = res;
    });
  }
  addcontact(): void {
    console.log(this.myForm.value)
    if (this.myForm.valid) {
      if (this.myForm.value.id === 0) {
        console.log('Adding new contact:', this.myForm.value);
        this.http.postapi('api/Contacts/AddContactDetails', this.myForm.value).subscribe(() => {
          this.router.navigate(['/CRM/contacts']);
        }, error => {
          console.error('Error adding contact:', error);
        });
      } else if (this.myForm.value.id > 0) {
        console.log('Editing contact:', this.myForm.value);
        this.http.putapi('/api/Contacts/UpdateContacts', this.myForm.getRawValue()).subscribe(() => {
          this.router.navigate(['/CRM/contacts']);
        }, error => {
          console.error('Error updating contact:', error);
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

 


  getCompany(){
debugger;
    this.http.getapi('api/Company/GetCompany').subscribe((res) => {
        console.log(res);
        debugger;
        this.companylist=res.data
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
    this.http.getapi('api/Contacts/GetStateDetails').subscribe((res) => {
        console.log(res);
        this.statelist=res
      }
    );
  }

  getCountry(){
    this.http.getapi('api/Contacts/GetCountryDetails').subscribe((res) => {
        console.log(res);
        this.countrylist=res
      }
    );
  }
  getTimeZone(){
    this.http.getapi('api/Common/GetTimezones').subscribe((res) => {
        console.log(res);
        this.timeZonelist=res.data
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

  onSubmit() {
    if (this.myForm.valid) {
      this.http.putapi(`/api/Contacts/UpdateContacts/${this.Id}`, this.myForm.value).subscribe(() => {
        this.router.navigate(['/CRM/Contacts'])
      });
    }
  }
}
