import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  tableSizes: any = [20, 40, 60, 80];
  p:number=1;



  cityForm: any;
  citylist: any;
  stateList: any;
  submited: any;
  cityId: any;
  
  cities: any;
  states: any;

countrylist: any;
  currentCityId: any;

  constructor(
    private fb: FormBuilder, 
    private http: BackendService, 
    private router: Router, 
    private ActivatedRoute: ActivatedRoute) {
this.ActivatedRoute.queryParamMap.subscribe((params) => {
this.cityId = params.get('cityid');
console.log(this.cityId);
if (this.cityId > 0) {
this.getCityById(this.cityId)
}
});
}
   

  ngOnInit(): void {
    this.getapi();
    this.getCountry();
    this.getstates();
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

    getCountry() {
      this.http.getapi('api/Common/GetCountries').subscribe((res) => {
        this.countrylist = res.data;
      });
    }
    getstates() {
      this.http.getapi('api/Common/GetStates').subscribe((res)=> {
        console.log(res);
        this.states = res.data
      });
    }

  submitForm(): void {
    
    const formData = this.cityForm.getRawValue();
    if (this.currentCityId > 0) {
      this.http.putapi('api/Common/UpdateCity', formData).subscribe(() => { // Updated API endpoint
        console.log('City updated successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error updating city', error);
      });
    } else {
      this.http.postapi('api/Common/cities', { description: formData.description }).subscribe(() => { // Updated API endpoint
        console.log('City added successfully');
        debugger
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error adding city', error);
      });
    }
    // this.submited = true;
    // console.log(this.cityForm.value);
    // const _ID = this.cityForm.value.id
    // if (this.cityForm.invalid) {
    //   return;
    // }
    // if (_ID > 0) {
    //   this.http.putapi('api/Common/UpdateCity', this.cityForm.value).subscribe((res) => { 
    //     this.clear();
    //   }, (error) => {
    //     console.error('Error updating state', error);
    //   });
    // } else {
    //   this.http.postapi('api/Common/cities', this.cityForm.value).subscribe(() => { 
    //     this.clear();
    //   }, (error) => {
    //     console.error('Error adding state', error);
    //   });
    // }
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

  deleteCity(id: number): void {

    this.http.deleteapi(`api/Common/DeleteCity/${id}`)
    .subscribe(() => {
        console.log('City deleted successfully');
        this.ngOnInit()
        this.getapi();
      }, (error) => {
        console.error(`Error deleting city with id 
          ${id}`, error);
      });
      
  }
  resetForm(): void {
    this.cityForm.reset({ id: 0, description: '' });
    this.currentCityId = 0;
  }
  // clear(): void {
  //   this.cityForm.reset();
  //   this.submited = false;
  //   this.ngOnInit()
  //   this.router.navigate(['/CRM/Settings/city']);
  // }
}
