import { Component } from '@angular/core';
import {AbstractControl,FormBuilder,FormGroup,Validators,} from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})
export class CountryListComponent {
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
    this.getCountries();
   
    
  }
  getCountries(): void {
    this.http.getapi('api/Common/GetCountries').subscribe(
      (res) => {
        console.log(res);
        this.countrylist = res.data;
      },
      (error) => {
        console.error('Error fetching Countries', error);
      }
    );
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getCountries();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getCountries();
  }



  submitForm(): void {
    const formData = this.cityForm.getRawValue();
    if (this.currentCityId > 0) {
      this.http.putapi('api/Common/UpdateCity', formData).subscribe(
        () => {
          // Updated API endpoint
          console.log('City updated successfully');
          this.getCountries();
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
            
            this.getCountries();
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

  deleteCountry(id: number): void {
    this.http.deleteapi(`api/Common/DeleteCountry/${id}`).subscribe(
      () => {
        console.log('Country deleted successfully');
        this.ngOnInit();
        this.getCountries();
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
