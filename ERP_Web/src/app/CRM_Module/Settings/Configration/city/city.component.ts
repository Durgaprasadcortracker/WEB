import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent implements OnInit{
  cityForm: any;
  cityList: any;
  currentCityId = 0;
  countryList: any;
  stateList: any;
  cityId: any;

  constructor(private fb: FormBuilder, 
    private http: BackendService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
    this.cityId = params.get('cityid');
    });
  
    this.cityForm = this.fb.group({
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getapi(): void {
    this.http.getapi('api/Common/cities').subscribe((res) => {
      this.stateList = res.data;
    }, (error) => {
      console.error('Error fetching cities', error);
    });
  }
  getCountryValues(): void {
    this.http.getapi('api/Common/GetCountries').subscribe((res) => {
      this.countryList = res.data;
      this.getstateValues();
    }, (error) => {
      console.error('Error fetching countries', error);
    });
  }
  getstateValues(): void {
    this.http.getapi('api/Common/GetStates').subscribe((res) => {
      this.cityList = res.data;
    }, (error) => {
      console.error('Error fetching state', error);
    });
  }
  
  submitForm(): void {
    const stateData = this.cityForm.getRawValue();
    this.cityForm.get("id").setValue(this.cityId);
    if (this.cityId > 0) {
      this.http.putapi(`api/Common/cityId`, stateData).subscribe((res) => {
        console.log('State updated successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error updating state', error);
      });
    } else {
      this.http.postapi('api/Common/cities', stateData).subscribe(() => {
        console.log('State added successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error adding state', error);
      });
    }
  }

  edit(id: number): void {
    this.cityId = id;
    this.getCityById();
  }

  getCityById() {
    this.http.getapi('api/Common/GetCityById/' + this.cityId).subscribe((res) => {
      const stateData = res.data;
      this.cityForm.get("countryId")?.setValue(stateData.countryId);
      this.cityForm.get("cityId")?.setValue(stateData.cityId);
      this.cityForm.get("description")?.setValue(stateData.description);
    });
  }

  deleteCity(id: number): void {
    this.http.deleteapi(`api/Common/DeleteCity/${id}`).subscribe(() => {
      console.log('City deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deletingcity with id ${id}`, error);
    });
  }
  resetForm(): void {
    this.cityForm.reset();
    this.currentCityId = 0;
  }
}
