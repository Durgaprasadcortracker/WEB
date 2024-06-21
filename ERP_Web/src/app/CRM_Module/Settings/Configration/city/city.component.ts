import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cityForm: FormGroup;
  cityList: any[] = [];
  countrylist: any[] = [];
  stateList: any[] = [];
  cityId: number = 0;

  constructor(
    private fb: FormBuilder,
    private http: BackendService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.cityId = +(params.get('cityid') || 0);
    });

    this.cityForm = this.fb.group({
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCountry();
    this.getState();
    this.getCityList();
  }

  getCityList(): void {
    this.http.getapi('api/Common/cities').subscribe(
      (res: any) => {
        this.cityList = res.data || [];
      },
      error => {
        console.error('Error fetching cities', error);
      }
    );
  }

  getCountry(): void {
    this.http.getapi('api/Common/GetCountry').subscribe(
      (res: any) => {
        this.countrylist = res.data || [];
      },
      error => {
        console.error('Error fetching countries', error);
      }
    );
  }

  getState(): void {
    this.http.getapi('api/Common/GetStates').subscribe(
      (res: any) => {
        this.stateList = res.data || [];
      },
      error => {
        console.error('Error fetching states', error);
      }
    );
  }

  submitForm(): void {
    if (this.cityForm.valid) {
      const cityData = this.cityForm.value;
      cityData.id = this.cityId;

      if (this.cityId > 0) {
        this.http.putapi(`api/Common/cities/${this.cityId}`, cityData).subscribe(
          () => {
            console.log('City updated successfully');
            this.getCityList();
            this.resetForm();
          },
          error => {
            console.error('Error updating city', error);
          }
        );
      } else {
        this.http.postapi('api/Common/cities', cityData).subscribe(
          () => {
            console.log('City added successfully');
            this.getCityList();
            this.resetForm();
          },
          error => {
            console.error('Error adding city', error);
          }
        );
      }
    }
  }

  edit(id: number): void {
    this.cityId = id;
    this.getCityById();
  }

  getCityById(): void {
    this.http.getapi(`api/Common/getcities/${this.cityId}`).subscribe(
      (res: any) => {
        const cityData = res.data;
        this.cityForm.patchValue({
          countryId: cityData.countryId,
          stateId: cityData.stateId,
          description: cityData.description
        });
      },
      error => {
        console.error('Error fetching city by id', error);
      }
    );
  }

  deleteCity(id: number): void {
    this.http.deleteapi(`api/Common/Deletecity/${id}`).subscribe(
      () => {
        console.log('City deleted successfully');
        this.getCityList();
      },
      error => {
        console.error(`Error deleting city with id ${id}`, error);
      }
    );
  }

  resetForm(): void {
    this.cityForm.reset();
    this.cityId = 0;
  }
}
