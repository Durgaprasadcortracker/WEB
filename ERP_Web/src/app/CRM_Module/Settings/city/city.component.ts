import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent {
  // cityForm: any;
  // citylist: any;
  // stateList: any;
  // submited: any;
  // cityId: any;

  // cities: any;
  // states: any;

  // countrylist: any;
  // Id = 0;
  // cityData: any;
  // countryId: any;

  // constructor(
  //   private fb: FormBuilder,
  //   private http: BackendService,
  //   private router: Router,
  //   private ActivatedRoute: ActivatedRoute
  // ) {
  //   this.cityForm = this.fb.group({
  //     id: [0],
  //     description: [null, Validators.required],
  //     countryId: [null, Validators.required],
  //     stateId: [null, Validators.required],
  //   });
  //   this.Id = this.ActivatedRoute.snapshot.params['id'];
  //   console.log(this.Id);
  //   if (this.Id) {
  //     this.http.getapi('api/Common/GetCityby/' + this.Id).subscribe((res) => {
  //       console.log(res);
  //       this.cityData = res.data;
  //       console.log(this.cityData);
  //       this.cityForm.get('countryId').setValue(this.cityData.countryId);
  //       this.getstatesbycountrycity()
  //       this.cityForm.get('id').setValue(this.cityData.id);
  //       this.cityForm.get('stateId').setValue(this.cityData.stateId);
  //       this.cityForm.get('description').setValue(this.cityData.description);
  //       console.log(this.cityForm.value);
  //     });
  //   }
  // }
  // ngOnInit(): void {
  //   this.getapi();
  //   this.getCountry();
  //   this.getCity();
  // }

  // getCity(): void {
  //   this.http.getapi('api/Common/GetCities').subscribe((res: any) => {
  //     console.log(res);
  //     this.cities = res.data;
  //   });
  // }

  // getapi(): void {
  //   this.http.getapi('api/Common/GetCities').subscribe(
  //     (res) => {
  //       console.log(res);
  //       this.citylist = res.data;
  //     },
  //     (error) => {
  //       console.error('Error fetching cities', error);
  //     }
  //   );
  // }
  // getCitybycountry() {
  //   this.countryId = this.cityForm.get('country')?.value;
  //   this.http.getapi('api/Common/cities/' + this.countryId).subscribe((res) => {
  //     this.citylist = res;
  //   });
  // }

  // getstatesbycountrycity() {
  //   this.countryId = this.cityForm.get('countryId')?.value;
  //   this.http
  //     .getapi(`api/Common/GetCountryByStates/${this.countryId}`)
  //     .subscribe((res) => {
  //       this.stateList = res.data;
  //     });
  // }

  // getState() {
  //   this.http.getapi('api/Common/GetStates').subscribe((res) => {
  //     this.stateList = res.data;
  //   });
  // }

  // getCountry() {
  //   this.http.getapi('api/Common/GetCountries').subscribe((res) => {
  //     this.countrylist = res.data;
  //   });
  // }
  // // getCountry() {
  // //   this.http.getapi('api/Common/GetCountries').subscribe((res) => {
  // //     this.countrylist = res.data;
  // //   });
  // // }
  // // getStates() {
  // //   let countryId= this.cityForm.get("countryId")?.value;
  // //   console.log(countryId)
  // //   this.http.getapi('api/Common/GetStates/'+countryId).subscribe((res)=> {
  // //     console.log(res);
  // //     this.states = res.data
  // //   });
  // // }

  // submitForm(): void {
  //   this.submited = true;
  //   console.log(this.cityForm.value);
  //   const _ID = this.cityForm.value.id;
  //   if (this.cityForm.invalid) {
  //     return;
  //   }
  //   if (_ID > 0) {
  //     this.http.putapi('api/Common/UpdateCity', this.cityForm.value).subscribe(
  //       (res) => {
  //         this.clear();
  //       },
  //       (error) => {
  //         console.error('Error updating state', error);
  //       }
  //     );
  //   } else {
  //     this.http.postapi('api/Common/cities', this.cityForm.value).subscribe(
  //       () => {
  //         this.clear();
  //       },
  //       (error) => {
  //         console.error('Error adding state', error);
  //       }
  //     );
  //   }
  // }

  // getCityById(id: any) {
  //   this.http.getapi('/api/Common/GetCityby' + id).subscribe((res: any) => {
  //     const cityData = res.data;
  //     console.log(res);
  //     this.cityForm.patchValue(res.data);
  //   });
  // }

  // get f(): { [key: string]: AbstractControl } {
  //   return this.cityForm.controls;
  // }

  // clear(): void {
  //   this.cityForm.reset();
  //   this.submited = false;
  //   this.ngOnInit();
  //   this.router.navigate(['/CRM/Settings/citylist']);
  // }
  cityForm: FormGroup;
  submited = false;
  cityId: number | null = null;
  countrylist: any[] = [];
  stateList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: BackendService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.cityForm = this.fb.group({
      id: [0],
      description: [null, Validators.required],
      countryId: [null, Validators.required],
      stateId: [null, Validators.required],
    });
    
  }

  ngOnInit(): void {
    this.cityId = +this.activatedRoute.snapshot.queryParams['cityId'] || null;
    console.log('City ID:', this.cityId);
    this.getCountries();
    if (this.cityId) {
      this.loadCityData(this.cityId);
    }
  }
  

  getCountries(): void {
    this.http.getapi('api/Common/GetCountries').subscribe((res) => {
      this.countrylist = res.data;
    });
  }

  getStatesByCountry(): void {
    const countryId = this.cityForm.get('countryId')?.value;
    if (countryId) {
      this.http.getapi(`api/Common/GetCountryByState/${countryId}`).subscribe((res) => {
        this.stateList = res.data;
      });
    }
  }

  loadCityData(cityId: number): void {
    this.http.getapi('api/Common/cities/' + cityId).subscribe((res) => {
      console.log('API Response:', res); 
      const cityData = res.data;
      if (cityData) {
        this.cityForm.patchValue(cityData);
        this.getStatesByCountry(); 
      } else {
        console.error('City data not found for ID:', cityId);
      }
    }, error => {
      console.error('Error fetching city data:', error);
    });
  }
  
  submitForm(): void {
    this.submited = true;
    if (this.cityForm.invalid) {
      return;
    }

    const formValue = this.cityForm.value;
    if (formValue.id > 0) {
      // this.cityForm.get("id")?.setValue(this.cityId);
      this.http.putapi('api/Common/UpdateCity', formValue).subscribe(() => {
        this.clear();
        this.snackBar.open('City Updated successfully!', 'Close', {
          duration: 3000, // Snackbar stays open for 3 seconds
        });
      }, (error) => {
        console.error('Error updating city', error);
      });
    } else {
      this.http.postapi('api/Common/cities', formValue).subscribe(() => {
        this.clear();
        this.snackBar.open('City Added successfully!', 'Close', {
          duration: 3000, // Snackbar stays open for 3 seconds
        });
      }, (error) => {
        console.error('Error adding city', error);
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.cityForm.controls;
  }

  clear(): void {
    this.cityForm.reset();
    this.submited = false;
    this.router.navigate(['/CRM/Settings/citylist']);
  }
}
