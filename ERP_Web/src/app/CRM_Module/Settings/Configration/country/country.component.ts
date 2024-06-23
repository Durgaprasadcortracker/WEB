import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countryForm: FormGroup;
  countryList: any[] = [];
  currentCountryId = 0;

  constructor(
    private fb: FormBuilder,
    private http: BackendService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const param = params.get('countryid');
      this.currentCountryId = param ? +param : 0;
    });

    this.countryForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCountries();

    if (this.currentCountryId > 0) {
      this.getCountryById();
    }
  }

  getCountries(): void {
    this.http.getapi('api/Common/GetCountry').subscribe((res) => {
      this.countryList = res.data;
      console.log('Fetched country:', this.countryList); // Logging fetched countries
    }, (error) => {
      console.error('Error fetching countries', error);
    });
  }

  submitForm(): void {
    const formData = this.countryForm.value;
    formData.id = this.currentCountryId;

    if (this.currentCountryId > 0) {
      this.http.putapi('api/Common/UpdateCountry', formData).subscribe(() => {
        console.log('Country updated successfully');
        this.getCountries();
        this.resetForm();
      }, (error) => {
        console.error('Error updating country', error);
      });
    } else {
      this.http.postapi('api/Common/AddCountry', formData).subscribe(() => {
        console.log('Country added successfully');
        this.getCountries();
        this.resetForm();
      }, (error) => {
        console.error('Error adding country', error);
      });
    }
  }

  edit(id: number): void {
    this.currentCountryId = id;
    this.getCountryById();
  }

  getCountryById(): void {
    this.http.getapi(`api/Common/GetCountryById/${this.currentCountryId}`).subscribe((res) => {
      const country = res.data;
      this.countryForm.patchValue({
        description: country.description
      });
    }, (error) => {
      console.error('Error fetching country by ID', error);
    });
  }

  deleteCountry(id: number): void {
    this.http.deleteapi(`api/Common/DeleteCountry/${id}`).subscribe(() => {
      console.log('Country deleted successfully');
      this.getCountries();
    }, (error) => {
      console.error(`Error deleting country with id ${id}`, error);
    });
  }

  resetForm(): void {
    this.countryForm.reset();
    this.currentCountryId = 0;
  }
}
