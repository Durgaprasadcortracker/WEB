import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrl: './timezone.component.css'
})
export class TimezoneComponent {
close() {
throw new Error('Method not implemented.');
}
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
  submitForm(): void {
    debugger;
    this.submitted = true;
    console.log(this.timezoneForm.value);
    const _ID = this.timezoneForm.value.id
    if (this.timezoneForm.invalid) {
      return;
    }
    if (_ID > 0) {
      this.http.putapi(`api/Common/UpdateTimezone`, this.timezoneForm.getRawValue()).subscribe((res) => { 
        this.clear();
      }, (error) => {
        console.error('Error updating Timezone', error);
      });
    } else {
      this.http.postapi('api/Common/AddTimezone', this.timezoneForm.getRawValue()).subscribe(() => { 
        this.clear();
      }, (error) => {
        console.error('Error adding quotetype', error);
      });
    }
  }
  clear(): void {
    this.submitted = false;
    this.timezoneForm.reset();
    this.ngOnInit()
    this.router.navigate (['/CRM/Settings/timezone']);
  }

  getTimezoneById(id : any) {
    this.http.getapi('api/Common/GetTimezones/' + id).subscribe((res) => {
      console.log(res);
      this.timezoneForm.patchValue(res.data);
    });
  }
  ngOnInit(){
    this.timezoneForm = this.fb.group({
      id: [0],
      description: [null, Validators.required]
    });
    this.gettimezonelist();
  }
  deleteTimezone(id: number): void {
    this.http.deleteapi(`api/Common/timezones/${id}`).subscribe(() => {
      console.log('Timezone deleted successfully');
      this.gettimezonelist();
    }, (error) => {
      console.error(`Error deleting timezone with id ${id}`, error);
    });
  }
 
  gettimezonelist(): void {
    this.http.getapi('api/Common/GetTimezones').subscribe((res) => {
      this.Timezonelist = res.data;
    }, (error) => {
      console.error('Error fetching timezones', error);
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.timezoneForm.controls;
  }
}

