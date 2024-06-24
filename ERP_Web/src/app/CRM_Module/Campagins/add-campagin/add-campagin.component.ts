import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-campagin',
  templateUrl: './add-campagin.component.html',
  styleUrl: './add-campagin.component.css'
})
export class AddCampaginComponent {
  statuslist: any;
  industrytypelist: any;
  citylist: any;
  statelist: any;
  countrylist: any;
  timeZonelist: any;
  submitted: any;
 
  Id: any;

  myForm: FormGroup = new FormGroup({
    Id: new FormControl(0),
    campaignOwner: new FormControl(null),
    campaignName: new FormControl(null),
    campaignType: new FormControl(null),
    status: new FormControl(null),
    startDate: new FormControl(null),
    endDate: new FormControl(null),
    campaignObjective: new FormControl(null),
    budgetedCost: new FormControl(null),
    description: new FormControl(null),
  
  });


  constructor(
    private fb: FormBuilder,
    private http: BackendService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.Id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      id: [0],
      campaignOwner: [null, Validators.required],
      campaignName: [null, Validators.required],
      campaignType: [null, Validators.required],
      status: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      campaignObjective: [null, Validators.required],
      budgetedCost: [null, Validators.required],
      description: [null, Validators.required],
     
    });
    if (this.Id) {
      this.http.getapi('api/Company/GetCompaniesby/' + this.Id).subscribe((res) => {
        console.log(res)
        this.myForm.patchValue(res.data);
     
     
     
      });
      
    }

    this.getCampaignStatus();
   
  
  }

  addCampaign() {
    
    this.submitted=true;
    if(this.myForm.invalid){
      return;
    }
    if (this.myForm.value.id == 0) {
      console.log(this.myForm.value)
      this.http.postapi('api/Company/AddCompanies', this.myForm.value).subscribe(() => {
        this.snackBar.open('Company successfully added!', 'Close', {
          duration: 3000, // Snackbar stays open for 3 seconds
        });
        this.router.navigate(['/CRM/Companies']);
      });
    }
    else if(this.myForm.value.id > 0) {
      console.log("edit")
      this.http.putapi(`api/Company/UpdateCompanies`, this.myForm.getRawValue()).subscribe(() => {
        this.snackBar.open('Company successfully updated!', 'Close', {
          duration: 3000, // Snackbar stays open for 3 seconds
        });
        this.router.navigate(['/CRM/Companies']);
      });
    }
  }
  

  close() {
    this.myForm.reset();
    this.router.navigate(['/CRM/Companies']);
  }

 

  getCampaignStatus() {
    this.http.getapi('api/Common/GetIndustryType').subscribe((res) => {
      this.statuslist = res.data;
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  onSubmit() {
    //if (this.myForm.valid) {
      this.http.putapi(`api/Company/UpdateCompanies`, this.myForm.getRawValue()).subscribe(() => {
        this.router.navigate(['/CRM/Companies']);
      });
   // }
  }
}
