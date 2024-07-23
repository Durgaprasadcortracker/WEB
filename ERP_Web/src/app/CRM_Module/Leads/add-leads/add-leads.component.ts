import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AnyARecord } from 'node:dns';

@Component({
  selector: 'app-add-leads',
  templateUrl: './add-leads.component.html',
  styleUrl: './add-leads.component.css',
})
export class AddLeadsComponent {
  // page: number = 1;
  // count: number = 0;
  // tableSize: number = 10;
  // tableSizes: any = [3, 6, 9, 12];
  // p: number = 1;
  // Id: any;
  // industrylist: any;
  // lostReasonlist:any;
  // companylist: any;
  // statuslist: any;
  // sourcelist: any;
  // stagelist: any;
  // _loginlist: any;

  // constructor(
  //   private http: BackendService,
  //   private route: ActivatedRoute,
  //   private snackBar: MatSnackBar,
  //   private router: Router,
  //   private fb: FormBuilder
  // ) {
  //   // this.Id = this.route.snapshot.paramMap.get('id');
  //   this.route.queryParamMap.subscribe((params) => {
  //     this.Id = params.get('leadid');
  //     console.log(this.Id);
  //   });
  //   this.getLogin()
  //   this.http.getapi('api/Common/GetSource').subscribe((res) => {
  //     console.log(res);
  //     this.sourcelist = res.data;
  //   });
  // }
  // @Output() childEvent = new EventEmitter<string>();
  // @Input() editData: any;

  // myForm: any;
  // ngOnInit() {
  //   this.myForm = this.fb.group({
  //     id: new FormControl(0),
  //     LeadOwner: [null, Validators.required],
  //     CompanyId: [null, Validators.required],
  //     firstName: [{value:null,disabled:true}],
  //     lastName: [null, Validators.required],
  //     description: [null, Validators.required],
  //     email: [null, Validators.required],
  //     secondaryEmail:[null],
  //     mobileNumber: [null, Validators.required],
  //     alternateNumber:[null],
  //     website:[null],
  //     skypeId:[null],
  //     linkedIn:[null],
  //     leadStatus: [null, Validators.required],
  //     leadSource: [null, Validators.required],
  //     leadStage: [null, Validators.required],
  //     industryType: [null, Validators.required],
  //     headCount:[null, Validators.required],
  //     lostReason:[null],
  //     emailOutput:[null],
  //     rating:[null],
  //     annualRevenue:[null],
  //   });
  //   this.getCompany();
  //   this.getStage();
  //   this.getStatus();
  //   this.getIndustry();
  //   this.getLostreason();
  //   // this.getLogin();
  //   console.log(this.Id);
   
  //   if (this.Id) {
  //     this.http
  //       .getapi('api/Lead/GetLeadsby/' + this.Id)
  //       .subscribe((res) => {
  //         console.log(res);
  //         this.myForm.patchValue(res.data);
  //       });
  //   }
  // }

  // submitted: any;

  // addlead(): void {
    
  //   this.submitted = true;
  //   if (this.myForm.invalid) {
  //     return;
  //   }
  //   console.log(this.myForm.value);
  //   if (this.myForm.valid) {
  //     if (this.myForm.value.id === 0) {
  //       console.log('Adding new Lead:', this.myForm.value);
  //       this.http.postapi('api/Lead/AddLeads', this.myForm.getRawValue()).subscribe(
  //         () => {
  //           this.snackBar.open('lead successfully added!', 'Close', {
  //             duration: 3000, // Snackbar stays open for 3 seconds
  //           });
  //           this.router.navigate(['/CRM/leads']);
  //         },
  //         (error) => {
  //           console.error('Error adding lead:', error);
  //         }
  //       );
  //     } else if (this.myForm.value.id > 0) {
  //       console.log('Editing lead:', this.myForm.value);
  //       this.http
  //         .putapi('api/Lead/UpdateLeads', this.myForm.getRawValue()).subscribe(() => {
  //             this.snackBar.open('Lead successfully updated!', 'Close', {
  //               duration: 3000, // Snackbar stays open for 3 seconds
  //             });
  //             this.router.navigate(['/CRM/Leads']);
  //           },
  //           (error) => {
  //             console.error('Error updating lead:', error);
  //           }
  //         );
  //     }
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }
  // get f(): { [key: string]: AbstractControl } {
  //   return this.myForm.controls;
  // }
  // getcompanydetails(event:any){
  //   debugger;
  //   console.log(event);
  //   this.http.getapi(`api/Contacts/GetContactsbycompanyId/${event.target.value}`).subscribe((res) => {
  //     console.log(res);
  //     debugger;
  //     this.myForm.get("firstName")?.setValue(res.data.firstName);
  //     this.myForm.get("lastName")?.setValue(res.data.lastName);
  //     this.myForm.get("email")?.setValue(res.data.email);
  //     this.myForm.get("mobileNumber")?.setValue(res.data.mobileNumber);
     
  //   });
  //   this.http.getapi(`api/Company/GetCompaniesby/${event.target.value}`).subscribe((res) => {
  //     console.log(res);
  //     debugger;
  //     this.myForm.get("headCount")?.setValue(res.data.headCount);
  //     this.myForm.get("industryType")?.setValue(res.data.companyIndustry);
  //   });
  // }
  // getCompany() {
  //   this.http.getapi('api/Company/GetCompany').subscribe((res) => {
  //     console.log(res);
      
  //     this.companylist = res.data;
  //   });
  // }
  // getStage() {
  //   this.http.getapi('api/Common/GetStages').subscribe((res) => {
  //     console.log(res);
  //     this.stagelist = res;
  //   });
  // }
  // getLostreason() {
  //   this.http.getapi('api/Common/GetLostReason').subscribe((res) => {
  //     console.log(res);
      
  //     this.lostReasonlist = res.data;
  //   });
  // }

  // getStatus() {
  //   this.http.getapi('api/Common/GetStatus').subscribe((res) => {
  //     console.log(res);
      
  //     this.statuslist = res.data;
  //   });
  // }
  // getIndustry() {
  //   this.http.getapi('api/Common/GetIndustry').subscribe((res) => {
  //     console.log(res);
  //     this.industrylist = res.data;
  //   });
  // }
  // getLogin() {
  //   this.http.getapi('api/Login/GetLogins').subscribe((res) => {
  //     console.log(res);
  //     this._loginlist = res;
  //   });
  // }
  // getSource() {
  //   // this.http.getapi('api/Common/GetSource').subscribe((res) => {
  //   //   console.log(res);
  //   //   this.sourcelist = res;
  //   // });
  // }
  // close() {
  //   this.myForm.reset();
  //   this.router.navigate(['/Leads']);
  // }

  // onSubmit() {
  //   if (this.myForm.valid) {
  //     this.http
  //       .putapi(`/api/Lead/UpdateLeads/${this.Id}`, this.myForm.value)
  //       .subscribe(() => {
  //         this.router.navigate(['/CRM/Leads/listing']);
  //       }); ///CRM/Leads/listing
  //   }
  // }
  // selectedCompany(selectedValue: string): void {
  //   console.log('Selected company ID:', selectedValue);
  // }
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  p: number = 1;
  Id: any;
  industrylist: any;
  lostReasonlist:any;
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
    // this.route.queryParamMap.subscribe((params) => {
    //   this.Id = params.get('leadid');
    //   console.log(this.Id);
    // });
    this.getLogin()
    this.http.getapi('api/Common/GetSource').subscribe((res) => {
      console.log(res);
      this.sourcelist = res.data;
    });
  }
  @Output() childEvent = new EventEmitter<string>();
  @Input() editData: any;

  myForm: any;
  ngOnInit() {
    this.myForm = this.fb.group({
      id: new FormControl(0),
      LeadOwner: [null, Validators.required],
      CompanyId: [null, Validators.required],
      firstName: [{value:null,disabled:true}],
      lastName: [null, Validators.required],
      description: [null, Validators.required],
      email: [null, Validators.required],
      secondaryEmail:[null],
      mobileNumber: [null, Validators.required],
      alternateNumber:[null],
      website:[null],
      skypeId:[null],
      linkedIn:[null],
      leadStatus: [null, Validators.required],
      leadSource: [null, Validators.required],
      leadStage: [null, Validators.required],
      industryType: [null, Validators.required],
      headCount:[null, Validators.required],
      lostReason:[null],
      emailOutput:[null],
      rating:[null],
      annualRevenue:[null],
    });
    this.getCompany();
    this.getStage();
    this.getStatus();
    this.getIndustry();
    this.getLostreason();
    console.log(this.Id);
   
    if (this.Id) {
      this.http
        .getapi('api/Lead/GetLeadsby/' + this.Id)
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
        this.http.postapi('api/Lead/AddLeads', this.myForm.getRawValue()).subscribe(
          
          () => {
            this.snackBar.open('Lead successfully Added!', 'Close', {
              duration: 3000, // Snackbar stays open for 3 seconds
            });
            this.router.navigate(['/CRM/Leads/listing']);
          },
          (error) => {
            console.error('Error adding lead:', error);
          }
        );
      } else if (this.myForm.value.Id > 0) {
        console.log('Editing lead:', this.myForm.value);
        console.log("edit")
        this.http.putapi('api/Lead/UpdateLeads', this.myForm.getRawValue()).subscribe(() => {
            this.snackBar.open('Lead successfully Updated!', 'Close', {
              duration: 3000, // Snackbar stays open for 3 seconds
            });
        
              this.router.navigate(['/CRM/Leads']);
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
  getcompanydetails(event:any){
    debugger;
    console.log(event);
    this.http.getapi(`api/Contacts/GetContactsbycompanyId/${event.target.value}`).subscribe((res) => {
      console.log(res);
      this.myForm.get("firstName")?.setValue(res.data.firstName);
      this.myForm.get("lastName")?.setValue(res.data.lastName);
      this.myForm.get("email")?.setValue(res.data.email);
      this.myForm.get("mobileNumber")?.setValue(res.data.mobileNumber);
     
    });
    this.http.getapi(`api/Company/GetCompaniesby/${event.target.value}`).subscribe((res) => {
      console.log(res);
      debugger;
      this.myForm.get("headCount")?.setValue(res.data.headCount);
      this.myForm.get("industryType")?.setValue(res.data.companyIndustry);
    });
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
  getLostreason() {
    this.http.getapi('api/Common/GetLostReason').subscribe((res) => {
      console.log(res);
      
      this.lostReasonlist = res.data;
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
          this.router.navigate(['/CRM/Leads/listing']);
        });
    }
  }
  selectedCompany(selectedValue: string): void {
    console.log('Selected company ID:', selectedValue);
  }



}
