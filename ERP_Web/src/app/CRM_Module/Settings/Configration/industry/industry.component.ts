import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  Industrylist: any; // Updated list variable
  currentIndustryId = 0; // Updated ID variable

  constructor(private fb: FormBuilder, private http: BackendService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.industryId = params.get('industryid');
    });

    this.industryForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.industryForm = new FormGroup({
      id: new FormControl(<Number>(0)),
      description: new FormControl('')
    });
    this.getapi();
  }

  getapi(): void {
    this.http.getapi('api/Common/GetIndustry').subscribe((res) => {
      this.Industrylist = res.data;
    }, (error) => {
      console.error('Error fetching industries', error);
    });
  }
  Id:any;
  submitForm(): void {
    const description = this.industryForm.get('description')?.value;
    this.industryForm.get("id").setValue(this.currentIndustryId);
    if (this.currentIndustryId > 0) {
      this.http.putapi(`api/Common/UpdateIndustry`, this.industryForm.getRawValue()).subscribe((res) => { // Updated API endpoint
        console.log('Industry updated successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error updating industry', error);
      });
    } else {
      this.http.postapi('api/Common/AddIndustry', { description }).subscribe(() => { // Updated API endpoint
        console.log('Industry added successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error adding industry', error);
      });
    }
  }

  industryId: any;
  edit(id: number): void {
    this.currentIndustryId = id;
    this.getIndustryById();
  }

  getIndustryById() {
    this.http.getapi('api/Common/GetIndustriesby/' + this.currentIndustryId).subscribe((res) => { 
      console.log(res);
      this.industryForm.get("industryId")?.setValue(res.data.industryId); 
      this.industryForm.get("description")?.setValue(res.data.description);
    });
  }

  deleteIndustry(id: number): void {
    this.http.deleteapi(`api/Common/DeleteIndustry/${id}`).subscribe(() => { 
      console.log('Industry deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deleting industry with id ${id}`, error);
    });
  }

  resetForm(): void {
    this.industryForm.reset();
    this.currentIndustryId = 0;
  }
}
