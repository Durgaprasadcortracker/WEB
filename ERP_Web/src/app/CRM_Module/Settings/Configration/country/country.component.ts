import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent implements OnInit {

  countryForm: any;
  CountryList: any;
  countryid: any;
  submited: any;





  constructor(
    private fb: FormBuilder,
    private http: BackendService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute) {
    this.ActivatedRoute.queryParamMap.subscribe((params) => {
      this.countryid = params.get('countryid');
      console.log(this.countryid);
      if (this.countryid > 0) {
        this.getCountryById(this.countryid)
      }
    });
  }

  ngOnInit(): void {
    this.countryForm = this.fb.group({
      id: [0],
      description: [null, Validators.required]
    });
    this.getapi();
  }

  getapi(): void {
    this.http.getapi('api/Common/GetCountries').subscribe((res) => {
      this.CountryList = res.data;
    }, (error) => {
      console.error('Error fetching countries', error);
    });
  }

  submitForm(): void {
    this.submited = true;
    console.log(this.countryForm.value);
    const _ID = this.countryForm.value.id
    if (this.countryForm.invalid) {
      return;
    }
    if (_ID > 0) {
      this.http.putapi(`api/Common/UpdateCountry`, this.countryForm.value).subscribe((res) => { 
        this.clear();
      }, (error) => {
        console.error('Error updating country', error);
      });
    } else {
      this.http.postapi('api/Common/AddCountry', this.countryForm.value).subscribe(() => { 
        this.clear();
      }, (error) => {
        console.error('Error adding country', error);
      });
    }
  }

 

  getCountryById(Id: any)  {
    this.http.getapi('api/Common/GetCountry/' 
      + Id ).subscribe((res) => {
      console.log(res);
      this.countryForm.patchValue(res.data);
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.countryForm.controls;
  }


  deleteCountry(id: number): void {
    this.http.deleteapi(`api/Common/DeleteCountry/
      ${id}`).subscribe(() => {
      console.log('Country deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deleting country with id 
        ${id}`, error);
    });
  }

  clear(): void {
    this.countryForm.reset();
    this.submited = false;
    this.ngOnInit()
    this.router.navigate(['/CRM/Settings/country']);
  }
}
