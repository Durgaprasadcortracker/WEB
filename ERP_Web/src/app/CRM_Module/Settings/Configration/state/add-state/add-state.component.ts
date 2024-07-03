import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from '../../../../../Services/BackendConnection/backend.service';
@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrl: './add-state.component.css'
})
export class AddStateComponent implements OnInit {

  stateForm: any;
  stateList: any;
  CountryList: any;
  
  stateId: any;
  submited: any;
  states: any;


  constructor(private fb: FormBuilder, 
    private http: BackendService, 
    private router: Router, 
    private ActivatedRoute: ActivatedRoute) {
this.ActivatedRoute.queryParamMap.subscribe((params) => {
this.stateId = params.get('stateid');
console.log(this.stateId);
if (this.stateId > 0) {
this.getStateById(this.stateId)
}
});
}
 
ngOnInit(): void {
  this.getapi();
  this.getCountry();
  this.getstates();

  this.stateForm = this.fb.group({
    id: [0],
    description: [null, Validators.required],
    countryId: [null, Validators.required]
  });  
}

getapi(): void {
  this.http.getapi('api/Common/GetStates').subscribe((res) => {
    this.stateList = res.data;
  }, (error) => {
    console.error('Error fetching states', error);
  });
}

getCountry() {
  this.http.getapi('api/Common/GetCountries').subscribe((res) => {
    this.CountryList = res.data;
  });
}
getstates() {
  this.http.getapi('api/Common/GetStates').subscribe((res)=> {
    console.log(res);
    this.states = res.data
  });
}
submitForm(): void {
  this.submited = true;
  console.log(this.stateForm.value);
  const _ID = this.stateForm.value.id
  if (this.stateForm.invalid) {
    return;
  }
  if (_ID > 0) {
    this.http.putapi('api/Common/UpdateState', this.stateForm.value).subscribe((res) => { 
      this.clear();
    }, (error) => {
      console.error('Error updating state', error);
    });
  } else {
    this.http.postapi('api/Common/AddState', this.stateForm.value).subscribe(() => { 
      this.clear();
    }, (error) => {
      console.error('Error adding state', error);
    });
  }
}


getStateById(id: any) {
  this.http.getapi('api/Common/GetState/'
    + id ).subscribe((res) => {
      console.log(res);
      this.stateForm.patchValue(res.data);
  });
}

get f(): { [key: string]: AbstractControl } {
  return this.stateForm.controls;
}

clear(): void {
  this.stateForm.reset();
  this.submited = false;
  this.ngOnInit()
  this.router.navigate(['/CRM/Settings/state']);
}

}
