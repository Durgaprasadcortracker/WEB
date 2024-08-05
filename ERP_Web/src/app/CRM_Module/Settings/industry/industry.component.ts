import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrl: './industry.component.css'
})
export class IndustryComponent {
  industryForm: any; // Updated form variable
  IndustryList: any; // Updated list variable
  submited: any;
  industryid: any;

  constructor(
    private fb: FormBuilder, 
    private http: BackendService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.industryid = params.get('industryid');
      console.log(this.industryid);
      if (this.industryid > 0) {
        this.getIndustryById(this.industryid)
      }
    });
  }

  ngOnInit(): void {
    this.industryForm = this.fb.group({
      id: [0],
      description: [null, Validators.required]
    });
    
    
  }
  submitForm(): void {

    this.submited = true;
    console.log(this.industryForm.value);
    const _ID = this.industryForm.value.id
    if (this.industryForm.invalid) {
      return;
    }
    if (_ID > 0) {
      this.http.putapi(`api/Common/UpdateIndustry`, this.industryForm.value).subscribe((res) => { 
        this.clear();
        this.router.navigate(['/CRM/Settings/industrylist'])
      }, (error) => {
        console.error('Error updating industry', error);
      });
    } else {
      this.http.postapi('api/Common/AddIndustry', this.industryForm.value).subscribe(() => { 
        this.clear();
        this.router.navigate(['/CRM/Settings/industrylist'])
      }, (error) => {
        console.error('Error adding industry', error);
      });
    }
  }
  getIndustryById(Id: any) {
    this.http.getapi('api/Common/GetIndustriesby/' + Id).subscribe((res) => { 
      console.log(res);
      this.industryForm.patchValue(res.data);
    
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.industryForm.controls;
  }
  clear(): void {
    this.industryForm.reset();
    this.submited = false;
    this.ngOnInit()
    this.router.navigate(['/CRM/Settings/industrylist']);
  }



}
