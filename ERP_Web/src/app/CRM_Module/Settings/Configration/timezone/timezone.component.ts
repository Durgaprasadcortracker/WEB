import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-timezone', // Updated selector
  templateUrl: './timezone.component.html', // Updated template URL
  styleUrls: ['./timezone.component.css'] // Updated style URL
})
export class TimezoneComponent implements OnInit {
  timezoneForm: any;
  Timezonelist: any;
  timezoneId:any;
  submitted:any;


  constructor(
    private fb: FormBuilder, 
    private http: BackendService, 
    private router: Router, 
    private ActivatedRoute: ActivatedRoute
  ) {
    this.ActivatedRoute.queryParamMap.subscribe((params) => {
      this.timezoneId = params.get('timezoneId');
      console.log(this.timezoneId);
      if (this.timezoneId) {
        this.getTimezoneById(this.timezoneId)
      }
    });
  }

  ngOnInit(): void {
    this.timezoneForm = this.fb.group({
      id: [0],
      description: [null, Validators.required]
    });
    this.getapi();
  }

  getapi(): void {
    this.http.getapi('api/Common/GetTimezones').subscribe((res) => {
      this.Timezonelist = res.data;
    }, (error) => {
      console.error('Error fetching timezones', error);
    });
  }

  submitForm(): void {
    this.submitted = true;
    console.log(this.timezoneForm.value);
    const _ID = this.timezoneForm.value.id
    if (this.timezoneForm.invalid) {
      return;
    }
    if (_ID > 0) {
      this.http.putapi(`api/Common/UpdateTimezone`, this.timezoneForm.value).subscribe((res) => { 
        this.clear();
      }, (error) => {
        console.error('Error updating Timezone', error);
      });
    } else {
      this.http.postapi('api/Common/AddTimezone', this.timezoneForm.value).subscribe(() => { 
        this.clear();
      }, (error) => {
        console.error('Error adding quotetype', error);
      });
    }
  }

  getTimezoneById(id : any) {
    this.http.getapi('api/Common/GetTimezones/' + id).subscribe((res) => {
      console.log(res);
      this.timezoneForm.patchValue(res.data);
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.timezoneForm.controls;
  }

  deleteTimezone(id: number): void {
    this.http.deleteapi(`api/Common/timezones/${id}`).subscribe(() => {
      console.log('Timezone deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deleting timezone with id ${id}`, error);
    });
  }

  clear(): void {
    this.submitted = false;
    this.timezoneForm.reset();
    this.ngOnInit()
    this.router.navigate (['/CRM/Settings/time-zone']);
  }
}