import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrl: './add-state.component.css'
})
export class AddStateComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  p: number = 1;
  states: any;
  myForm: FormGroup = new FormGroup({
    id: new FormControl(<Number>(0)),
    countryId: new FormControl(''),
    description: new FormControl('')
  });
  Countrylist: any;
  stateId: any;
  constructor(private fb: FormBuilder, private http: BackendService, private router: Router, private ActivatedRoute: ActivatedRoute) {
    this.ActivatedRoute.queryParamMap.subscribe((params) => {
      this.stateId = params.get('stateId');
    });
    if (this.stateId > 0) {
      this.http.getapi('api/Common/GetState/' + this.stateId).subscribe((res) => {
        console.log(res);
        debugger;
        this.myForm.patchValue(res.data);
        // this.myForm.get("stageId")?.setValue(res.data.stageId);

        // this.myForm.get("description")?.setValue(res.data.description);

      });
    }

    // Initialize the form group with form controls and validators
    // this.myForm = this.fb.group({
    //   addcountry: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-]+$')]]
    // });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getstatusList();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getstatusList();
  }


  onSubmit() {
    console.log(this.myForm.value)
    if (this.stateId > 0) {
      this.myForm.get("id")?.setValue(this.stateId);
      this.http.putapi('api/Common/UpdateState', this.myForm.getRawValue()).subscribe((res) => {
        console.log(res);
        this.router.navigate(['/CRM/Settings/statelist'])
        this.resetvalues();
        this.getstatusList();
      });
    }
    else {
      this.http.postapi('api/Common/AddStates', this.myForm.getRawValue()).subscribe((res) => {
        console.log(res);
        this.router.navigate(['/CRM/Settings/statelist'])
        this.resetvalues();
        this.getstatusList();
      });
    }
  }
  resetvalues() {
    this.myForm.get("stateId")?.setValue(null);

    this.myForm.get("description")?.setValue(null);
  }
  getstatebyId() {

  }

  close() {
    console.log('field closed');
  }


  ngOnInit() {
    this.getCountry();
    this.getstatusList();


  }
  getstatusList() {
    this.http.getapi('api/Common/GetStates').subscribe((res) => {
      console.log(res);
      this.states = res.data
    });
  }

  getCountry() {
    this.http.getapi('api/Common/GetCountries').subscribe((res) => {
      this.Countrylist = res.data;
    });
  }

}
