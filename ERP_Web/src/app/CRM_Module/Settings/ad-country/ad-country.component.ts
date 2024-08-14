import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ad-country',
  templateUrl: './ad-country.component.html',
  styleUrl: './ad-country.component.css'
})
export class AdCountryComponent {
  countryForm: any;
  countrylist: any;
  Id = 0;
  countryId: any;
  submited: any;

  constructor(
    private fb: FormBuilder,
    private http: BackendService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ActivatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.countryId = params.get('countryid'); 
      console.log(this.countryId);
      if (this.countryId > 0) {
        this.getCountryById(this.countryId)
      }
    });
  }
  // getCountryById(countryId: any) {
  //   throw new Error('Method not implemented.');
  // }
  getCountryById(id: any) {
    this.http.getapi('api/Common/GetCountryById/' + id).subscribe((res) => {
      console.log(res);
      this.countryForm.patchValue(res.data);
    });
  }
  ngOnInit(): void {
    this.countryForm = this.fb.group({
      id: [0],
      description:[null, Validators.required]
    });
  }


  submitForm(): void {
    this.submited = true;
    console.log(this.countryForm.value);
    const _ID = this.countryForm.value.id;
    if (this.countryForm.invalid) {
      return;
    }
    if (_ID > 0) {
      this.http.putapi('api/Common/UpdateCountry', this.countryForm.value).subscribe(
        (res) => {
          this.clear();
          this.snackBar.open('Country Updated successfully!', 'Close', {
            duration: 3000, // Snackbar stays open for 3 seconds
          });
        },
        (error) => {
          console.error('Error updating state', error);
        }
      );
    } else {
      this.http.postapi('api/Common/AddCountry', this.countryForm.value).subscribe(
        () => {
          this.clear();
          this.snackBar.open('Country Added successfully!', 'Close', {
            duration: 3000, // Snackbar stays open for 3 seconds
          });
        },
        (error) => {
          console.error('Error adding state', error);
        }
      );
    }
  }


  get f(): { [key: string]: AbstractControl } {
    return this.countryForm.controls;
  }

  clear(): void {
    this.countryForm.reset();
    this.submited = false;
    this.ngOnInit();
    this.router.navigate(['/CRM/Settings/countrylist']);
  }

}
