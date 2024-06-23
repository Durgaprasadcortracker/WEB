import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, RequiredValidator,AbstractControl,Validators, FormBuilder } from '@angular/forms';
import { privateDecrypt } from 'crypto';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar,
    private router: Router,private fb:FormBuilder) {
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
    this.myForm = this.fb.group({
      id: [0],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      designation: [null, Validators.required],
      mobileNumber: [null, Validators.required],
      CompanyId: [null, Validators.required],
      country: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      postalCode:[null, Validators.required],
      source:[null, Validators.required],
      address1:[null, Validators.required],
    });
    this.getCompany();
    this.getCity();
    this.getState();
    this.getCountry();
    this.getTimeZone();
    this.getSource();  
    console.log(this.Id)
   
    
    if (this.Id) {

      this.http.getapi('api/Contacts/GetContactsby/' + this.Id).subscribe((res) => {
        console.log(res);
        this.myForm.patchValue(res.data);
      });
    }
   
  }
  cityId:any;
  submitted: any;
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
    debugger;
    this.submitted=true;
    if(this.myForm.invalid){
      return;
    }
    console.log(this.myForm.value)
    if (this.myForm.valid) {
      if (this.myForm.value.id === 0) {
        console.log('Adding new contact:', this.myForm.value);
        this.http.postapi('api/Contacts/AddContactDetails', this.myForm.value).subscribe(() => {
          this.snackBar.open('Contact successfully added!', 'Close', {
            duration: 3000, // Snackbar stays open for 3 seconds
          });
          this.router.navigate(['/CRM/contacts']);
        }, error => {
          console.error('Error adding contact:', error);
        });
      } else if (this.myForm.value.id > 0) {
        console.log('Editing contact:', this.myForm.value);
        this.http.putapi('api/Contacts/UpdateContacts', this.myForm.getRawValue()).subscribe(() => {
          this.snackBar.open('Contact successfully updated!', 'Close', {
            duration: 3000, // Snackbar stays open for 3 seconds
          });
          this.router.navigate(['/CRM/contacts']);
        }, error => {
          console.error('Error updating contact:', error);
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
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
