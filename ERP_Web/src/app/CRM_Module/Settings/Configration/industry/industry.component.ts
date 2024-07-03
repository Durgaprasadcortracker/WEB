import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrl: './industry.component.css'
})
export class IndustryComponent implements OnInit {
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
    this.getapi();
  }

  getapi(): void {
    this.http.getapi('api/Common/GetIndustries').subscribe((res) => {
      this.IndustryList = res.data;
    }, (error) => {
      console.error('Error fetching industries', error);
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
      }, (error) => {
        console.error('Error updating industry', error);
      });
    } else {
      this.http.postapi('api/Common/AddIndustry', this.industryForm.value).subscribe(() => { 
        this.clear();
      }, (error) => {
        console.error('Error adding industry', error);
      });
    }
  }




    // const description = this.industryForm.get('description')?.value;
    // this.industryForm.get("id").setValue(this.currentIndustryId);
    // if (this.currentIndustryId > 0) {
    //   this.http.putapi(`api/Common/UpdateIndustry`, this.industryForm.getRawValue()).subscribe((res) => { // Updated API endpoint
    //     console.log('Industry updated successfully');
    //     this.getapi();
    //     this.resetForm();
    //   }, (error) => {
    //     console.error('Error updating industry', error);
    //   });
    // } else {
    //   this.http.postapi('api/Common/AddIndustry', { description }).subscribe(() => { // Updated API endpoint
    //     console.log('Industry added successfully');
    //     this.getapi();
    //     this.resetForm();
    //   }, (error) => {
    //     console.error('Error adding industry', error);
    //   });
    // }
 

  
  

  getIndustryById(Id: any) {
    this.http.getapi('api/Common/GetIndustry/' + Id).subscribe((res) => { 
      console.log(res);
      this.industryForm.patchValue(res.data);
    
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.industryForm.controls;
  }

  deleteIndustry(id: number): void {
    this.http.deleteapi(`api/Common/DeleteIndustry/${id}`).subscribe(() => { 
      console.log('Industry deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deleting industry with id ${id}`, error);
    });
  }

  clear(): void {
    this.industryForm.reset();
    this.submited = false;
    this.ngOnInit()
    this.router.navigate(['/CRM/Settings/industry']);
  }
}
