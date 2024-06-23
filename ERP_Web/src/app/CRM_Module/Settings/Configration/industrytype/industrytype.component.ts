import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-industrytype', 
  templateUrl: './industrytype.component.html',
  styleUrls: ['./industrytype.component.css']
})
export class IndustrytypeComponent implements OnInit {
  industrytypeForm: any;
  IndustrytypeList: any; 
  currentIndustrytypeId = 0; 

  constructor(private fb: FormBuilder, 
    private http: BackendService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.industrytypeId = params.get('industrytypeid'); 
    });

    this.industrytypeForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.industrytypeForm = this.fb.group({
      id: new FormControl(<Number>(0)),
      description: new FormControl('')
    });
    this.getapi();
  }

  getapi(): void {
    this.http.getapi('api/Common/GetIndustrytype').subscribe((res) => {
      this.IndustrytypeList = res.data;
    }, (error) => {
      console.error('Error fetching industrytypes', error);
    });
  }
  Id:any;
  submitForm(): void {
    const description = this.industrytypeForm.get('description')?.value;
    this.industrytypeForm.get("id").setValue(this.currentIndustrytypeId);
    if (this.currentIndustrytypeId > 0) {
      this.http.putapi(`api/Common/UpdateIndustryTypes`, this.industrytypeForm.getRawValue()).subscribe((res) => { 
        console.log('Industrytype updated successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error updating industrytype', error);
      });
    } else {
      this.http.postapi('api/Common/AddIndustryType', { description }).subscribe(() => { 
        console.log('Industrytype added successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error adding industrytype', error);
      });
    }
  }

  industrytypeId: any;
  edit(id: number): void {
    this.currentIndustrytypeId = id;
    this.getIndustrytypeById();
  }

  getIndustrytypeById() {
    this.http.getapi('api/Common/GetIndustryTypesby/' + this.currentIndustrytypeId).subscribe((res) => {
      console.log(res);
      this.industrytypeForm.get("id")?.setValue(res.data.industrytypeId);
      this.industrytypeForm.get("description")?.setValue(res.data.description);
    });
  }

  deleteIndustrytype(id: number): void {
    this.http.deleteapi(`api/Common/DeleteIndustryType/${id}`).subscribe(() => {
      console.log('Industrytype deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deleting industrytype with id ${id}`, error);
    });
  }

  resetForm(): void {
    this.industrytypeForm.reset();
    this.currentIndustrytypeId = 0;
  }
}