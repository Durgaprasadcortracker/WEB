import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-add-leads',
  templateUrl: './add-leads.component.html',
  styleUrl: './add-leads.component.css',
})
export class AddLeadsComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  p: number = 1;
  Id: any;
  industrylist: any;
  companylist: any;
  statuslist: any;
  sourcelist: any;
  stagelist: any;
  _loginlist: any;

  constructor(
    private http: BackendService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.getLogin()
    this.http.getapi('api/Common/GetSource').subscribe((res) => {
      console.log(res);
      this.sourcelist = res.data;
    });
  }
  @Output() childEvent = new EventEmitter<string>();
  @Input() editData: any;

  myForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    leadOwner: new FormControl(null),
    Company: new FormControl(null),
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    description: new FormControl(null),
    businessEmail: new FormControl(null),
    secondaryEmail: new FormControl(null),
    phoneNumber: new FormControl(null),
    alternateNumber: new FormControl(null),
    leadStatus: new FormControl(null),
    leadSource: new FormControl(null),
    leadStage: new FormControl(null),
    website: new FormControl(null),
    industry: new FormControl(null),
    annualRevenue: new FormControl(null),
    emailOutput: new FormControl(null),
    skypeId: new FormControl(null),
    linkedIn: new FormControl(null),
    noofEmployees:new FormControl(null),
    rating:new FormControl(null),
  });

  ngOnInit() {
    // this.myForm = this.fb.group({
    //   id: new FormControl(0),
    //   leadOwner: new FormControl(null),
    //   Company: new FormControl(null),
    //   firstName: new FormControl(null),
    //   lastName: new FormControl(null),
    //   description: new FormControl(null),
    //   businessEmail: new FormControl(null),
    //   secondaryEmail: new FormControl(null),
    //   phoneNumber: new FormControl(null),
    //   alternateNumber: new FormControl(null),
    //   leadStatus: new FormControl(null),
    //   leadSource: new FormControl(null),
    //   leadStage: new FormControl(null),
    //   website: new FormControl(null),
    //   industry: new FormControl(null),
    //   annualRevenue: new FormControl(null),
    //   emailOutput: new FormControl(null),
    //   skypeId: new FormControl(null),
    //   linkedIn: new FormControl(null),
    //   noofEmployees:new FormControl(null),
    //   rating:new FormControl(null),
    // });
    this.getCompany();
    this.getStage();
    this.getStatus();
    this.getIndustry();
    // this.getLogin();
    console.log(this.Id);
    this.myForm.get('Company')?.valueChanges.subscribe((value) => {
      this.selectedCompany(value);
    });

    if (this.Id) {
      this.http
        .getapi('api/Contacts/GetContactsby/' + this.Id)
        .subscribe((res) => {
          console.log(res);
          this.myForm.patchValue(res.data);
        });
    }
  }

  submitted: any;

  addlead(): void {
    
    this.submitted = true;
    if (this.myForm.invalid) {
      return;
    }
    console.log(this.myForm.value);
    if (this.myForm.valid) {
      if (this.myForm.value.id === 0) {
        console.log('Adding new Lead:', this.myForm.value);
        this.http.postapi('api/Lead/AddLeads', this.myForm.value).subscribe(
          () => {
            this.snackBar.open('lead successfully added!', 'Close', {
              duration: 3000, // Snackbar stays open for 3 seconds
            });
            this.router.navigate(['/CRM/leads']);
          },
          (error) => {
            console.error('Error adding lead:', error);
          }
        );
      } else if (this.myForm.value.id > 0) {
        console.log('Editing lead:', this.myForm.value);
        this.http
          .putapi('api/Lead/UpdateLeads', this.myForm.getRawValue())
          .subscribe(
            () => {
              this.snackBar.open('Lead successfully updated!', 'Close', {
                duration: 3000, // Snackbar stays open for 3 seconds
              });
              this.router.navigate(['/CRM/leads']);
            },
            (error) => {
              console.error('Error updating lead:', error);
            }
          );
      }
    } else {
      console.log('Form is invalid');
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  getCompany() {
    this.http.getapi('api/Company/GetCompany').subscribe((res) => {
      console.log(res);
      
      this.companylist = res.data;
    });
  }
  getStage() {
    this.http.getapi('api/Common/GetStages').subscribe((res) => {
      console.log(res);
      this.stagelist = res;
    });
  }
  getStatus() {
    this.http.getapi('api/Common/GetStatus').subscribe((res) => {
      console.log(res);
      
      this.statuslist = res.data;
    });
  }
  getIndustry() {
    this.http.getapi('api/Common/GetIndustry').subscribe((res) => {
      console.log(res);
      this.industrylist = res.data;
    });
  }
  getLogin() {
    this.http.getapi('api/Login/GetLogins').subscribe((res) => {
      console.log(res);
      this._loginlist = res;
    });
  }
  getSource() {
    // this.http.getapi('api/Common/GetSource').subscribe((res) => {
    //   console.log(res);
    //   this.sourcelist = res;
    // });
  }
  close() {
    this.myForm.reset();
    this.router.navigate(['/Leads']);
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.http
        .putapi(`/api/Lead/UpdateLeads/${this.Id}`, this.myForm.value)
        .subscribe(() => {
          this.router.navigate(['/CRM/Leads']);
        });
    }
  }
  selectedCompany(selectedValue: string): void {
    console.log('Selected company ID:', selectedValue);
  }
}
