import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../../../../Services/BackendConnection/backend.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.css'
})
export class AddCityComponent implements OnInit {
cityForm: any;
citylist: any;
stateList: any;
submited: any;
cityId: any;

cities: any;
states: any;

countrylist: any;
  Id: any;

constructor(
  private fb: FormBuilder, 
  private http: BackendService, 
  private router: Router, 
  private ActivatedRoute: ActivatedRoute) {
this.ActivatedRoute.queryParamMap.subscribe((params) => {
this.cityId = params.get('cityid');
console.log(this.cityId);
if (this.Id) {
  this.http.getapi('api/Common/GetCities' + this.Id).subscribe((res) => {
    console.log(res)
    this.cityForm.patchValue(res.data);
    this.countryId= res.data.countryId;
  this.getCitybycountry();
  this.cityId=res.data.cityId;
  this.getstatesbycountrycity();
  });
// if (this.cityId > 0) {
// this.getCityById(this.cityId)
// }
}});
}
ngOnInit(): void {
  this.getapi();
  this.getCountry();
  this.getCity();
  this.cityForm = this.fb.group({
    id: [0],
    description: [null, Validators.required],
    countryId: [null, Validators.required],
    stateId: [null, Validators.required],
    
  });
}

getCity(): void {
  this.http.getapi('api/Common/GetCities').subscribe(
    (res: any) => {
      console.log(res);
      this.cities = res.data
    });
  }
      
  getapi(): void {
  this.http.getapi('api/Common/GetCities').subscribe((res) => {
    console.log(res)
    this.citylist = res.data;
  }, (error) => {
    console.error('Error fetching cities', error);
  });
}
countryId:any;
getCitybycountry(){
  debugger;
  this.countryId= this.cityForm.get("country")?.value;
  this.http.getapi('api/Common/cities/'+this.countryId).subscribe((res) => {
    this.citylist = res;
  });
}


  getstatesbycountrycity(){
    
    this.countryId= this.cityForm.get("country")?.value;
    this.cityId=this.cityForm.get("city")?.value;
    this.http.getapi('api/Common/GetCountryByState/'+this.cityId+"/"+this.countryId).subscribe((res) => {
      debugger;
      this.stateList = res.data;
    });
  }
  
  getState() {
    this.http.getapi('api/Common/GetStates').subscribe((res) => {
      this.stateList = res.data;
    });
  }

  getCountry() {
    this.http.getapi('api/Common/GetCountries').subscribe((res) => {
      this.countrylist = res.data;
    });
  }
  // getCountry() {
  //   this.http.getapi('api/Common/GetCountries').subscribe((res) => {
  //     this.countrylist = res.data;
  //   });
  // }
  // getStates() {
  //   let countryId= this.cityForm.get("countryId")?.value;
  //   console.log(countryId)
  //   this.http.getapi('api/Common/GetStates/'+countryId).subscribe((res)=> {
  //     console.log(res);
  //     this.states = res.data
  //   });
  // }

  submitForm(): void {
    
    this.submited = true;
    console.log(this.cityForm.value);
    const _ID = this.cityForm.value.id
    if (this.cityForm.invalid) {
      return;
    }
    if (_ID > 0) {
      this.http.putapi('api/Common/UpdateCity', this.cityForm.value).subscribe((res) => { 
        this.clear();
      }, (error) => {
        console.error('Error updating state', error);
      });
    } else {
      this.http.postapi('api/Common/cities', this.cityForm.value).subscribe(() => { 
        this.clear();
      }, (error) => {
        console.error('Error adding state', error);
      });
    }
  }
  

  getCityById(id: any) {
    this.http.getapi('api/Common/UpdateCity'
      + id ).subscribe((res: any) => {
        const cityData = res.data;
        console.log(res);
        this.cityForm.patchValue(res.data);
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.cityForm.controls;
  }




  clear(): void {
    this.cityForm.reset();
    this.submited = false;
    this.ngOnInit()
    this.router.navigate(['/CRM/Settings/state']);
  }

}
