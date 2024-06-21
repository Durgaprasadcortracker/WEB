import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  currentTimezoneId = 0;

  constructor(private fb: FormBuilder, private http: BackendService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.timezoneId = params.get('timezoneid');
    });

    this.timezoneForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.timezoneForm = new FormGroup({
      id: new FormControl(<Number>(0)),
      description: new FormControl('')
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
Id:any;
  submitForm(): void {
    const description = this.timezoneForm.get('description')?.value;
    this.timezoneForm.get("id").setValue(this.currentTimezoneId);
    if (this.currentTimezoneId > 0) {
      this.http.putapi(`api/Common/UpdateTimezone`, this.timezoneForm.getRawValue()).subscribe((res) => {
        console.log('Timezone updated successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error updating timezone', error);
      });
    } else {
      this.http.postapi('api/Common/AddTimezone', { description }).subscribe(() => {
        console.log('Timezone added successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error adding timezone', error);
      });
    }
  }
  timezoneId:any;
  edit(id: number): void {
    this.currentTimezoneId = id;
    this.getTimezoneById();
  }

  getTimezoneById() {
    this.http.getapi('api/Common/GetTimezones/' + this.currentTimezoneId).subscribe((res) => {
      console.log(res);
      debugger;
      this.timezoneForm.get("timezoneId")?.setValue(res.data.timezoneId);
      this.timezoneForm.get("description")?.setValue(res.data.description);
    });
  }

  deleteTimezone(id: number): void {
    this.http.deleteapi(`api/Common/Deletetimezones/${id}`).subscribe(() => {
      console.log('Timezone deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deleting timezone with id ${id}`, error);
    });
  }

  resetForm(): void {
    this.timezoneForm.reset();
    this.currentTimezoneId = 0;
  }
}