import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css'
})
export class CityListComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [20, 40, 60, 80];
  p: number = 1;

  cityForm: any;
  citylist: any;
  stateList: any;
  submited: any;
  cityId: any;

  cities: any;
  states: any;

  countrylist: any;
  currentCityId: any;
  country: any;

  constructor(
    private fb: FormBuilder,
    private http: BackendService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    this.getCities();
   
    
  }
  getCities(): void {
    this.http.getapi('api/Common/GetCitydetails').subscribe(
      (res) => {
        console.log(res);
        this.citylist = res;
      },
      (error) => {
        console.error('Error fetching cities', error);
      }
    );
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getCities();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getCities();
  }

  getCountry() {
    this.http.getapi('api/Common/GetCountries').subscribe((res) => {
      this.countrylist = res.data;
    });
  }
  getstates() {
    this.http.getapi('api/Common/GetStates').subscribe((res) => {
      console.log(res);
      this.states = res.data;
    });
  }

  submitForm(): void {
    const formData = this.cityForm.getRawValue();
    if (this.currentCityId > 0) {
      this.http.putapi('api/Common/UpdateCity', formData).subscribe(
        () => {
          // Updated API endpoint
          console.log('City updated successfully');
          this.getCities();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating city', error);
        }
      );
    } else {
      this.http
        .postapi('api/Common/cities', { description: formData.description })
        .subscribe(
          () => {
            // Updated API endpoint
            console.log('City added successfully');
            // debugger
            this.getCities();
            this.resetForm();
          },
          (error) => {
            console.error('Error adding city', error);
          }
        );
    }
  }

  getCityById(id: any) {
    this.http.getapi('api/Common/UpdateCity' + id).subscribe((res: any) => {
      const cityData = res.data;
      console.log(res);

      this.cityForm.patchValue(res.data);
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.cityForm.controls;
  }

  deleteCity(id: number): void {
    this.http.deleteapi(`api/Common/DeleteCity/${id}`).subscribe(
      () => {
        console.log('City deleted successfully');
        this.ngOnInit();
        this.getCities();
      },
      (error) => {
        console.error(
          `Error deleting city with id 
          ${id}`,
          error
        );
      }
    );
  }
  resetForm(): void {
    this.cityForm.reset({ id: 0, description: '' });
    this.currentCityId = 0;
  }
}
