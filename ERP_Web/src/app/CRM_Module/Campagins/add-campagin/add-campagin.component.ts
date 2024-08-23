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
  _loginlist:any;
 
  submitted: any;
 
  Id: any;

  myForm: FormGroup = new FormGroup({
    Id: new FormControl(0),
    campaignOwnerName: new FormControl(null),
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
    console.log(this.Id);
    this.getCampaignStatus();
    this.getLeadOwner();
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      id: [0],
      loginId: [null, Validators.required],
      campaignName: [null, Validators.required],
      campaignType: [null, Validators.required],
      campaignStatus: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      campaignObjective: [null, Validators.required],
      budgetCost: [null, Validators.required],
      description: [null, Validators.required],
    });
    if (this.Id) {
      this.http.getapi('api/Campaign/GetCampaignById/' + this.Id).subscribe((res) => {
        console.log(res)
        this.myForm.patchValue(res.data);
      }); 
    }
  }

  addCampaign() {
    
    this.submitted=true;
    if(this.myForm.invalid){
      return;
    }
    if (this.myForm.value.id == 0) {
      console.log(this.myForm.value)
      this.http.postapi('api/Campaign/AddCampaign', this.myForm.getRawValue()).subscribe(() => {
        this.snackBar.open('Campaign successfully added!', 'Close', {
          duration: 3000, // Snackbar stays open for 3 seconds
        });
        this.router.navigate(['/CRM/Campagins/campagins']);
      });
    }
    else if(this.myForm.value.id > 0) {
      console.log("edit")
      this.http.putapi(`api/Campaign/UpdateCampaign`, this.myForm.getRawValue()).subscribe(() => {
        this.snackBar.open('Campaign successfully updated!', 'Close', {
          duration: 3000, // Snackbar stays open for 3 seconds
        });
        this.router.navigate(['/CRM/Campagins/campagins']);
      });
    }
  }
  

  close() {
    this.myForm.reset();
    this.router.navigate(['/CRM/Campaigns']);
  }

 getLeadOwner(){
  this.http.getapi('api/Login/GetLogins').subscribe((res) => {
    console.log(res);
    this._loginlist = res;
  })
 }
 

  getCampaignStatus() {
    this.http.getapi('api/Common/GetCampaignStatus').subscribe((res) => {
      this.statuslist = res.data;
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
}
