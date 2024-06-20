import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-industrytype', 
  templateUrl: './industrytype.component.html',
  styleUrls: ['./industrytype.component.css']
})
export class IndustrytypeComponent implements OnInit {
  industrytypeForm: any;
  Industrytypelist: any;
  currentIndustrytypeId = 0;

  constructor(private fb: FormBuilder, private http: BackendService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.industrytypeId = params.get('industrytypeid');
    });

    this.industrytypeForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.industrytypeForm = new FormGroup({
      id: new FormControl(<Number>(0)),
      description: new FormControl('')
    });
    this.getapi();
  }

  getapi(): void {
    this.http.getapi('api/Common/GetIndustrytypes').subscribe((res) => {
      this.Industrytypelist = res.data;
    }, (error) => {
      console.error('Error fetching industry types', error);
    });
  }

  submitForm(): void {
    const description = this.industrytypeForm.get('description')?.value;
    this.industrytypeForm.get("id").setValue(this.currentIndustrytypeId);
    if (this.currentIndustrytypeId > 0) {
      this.http.putapi(`api/Common/UpdateIndustrytype`, this.industrytypeForm.getRawValue()).subscribe((res) => {
        console.log('Industry type updated successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error updating industry type', error);
      });
    } else {
      this.http.postapi('api/Common/AddIndustrytype', { description }).subscribe(() => {
        console.log('Industry type added successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error adding industry type', error);
      });
    }
  }

  industrytypeId: any;
  edit(id: number): void {
    this.currentIndustrytypeId = id;
    this.getIndustrytypeById();
  }

  getIndustrytypeById() {
    this.http.getapi('api/Common/GetIndustrytypeById/' + this.currentIndustrytypeId).subscribe((res) => {
      console.log(res);
      debugger;
      this.industrytypeForm.get("industrytypeId")?.setValue(res.data.industrytypeId);
      this.industrytypeForm.get("description")?.setValue(res.data.description);
    });
  }

  deleteIndustrytype(id: number): void {
    this.http.deleteapi(`api/Common/DeleteIndustrytype/${id}`).subscribe(() => {
      console.log('Industry type deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deleting industry type with id ${id}`, error);
    });
  }

  resetForm(): void {
    this.industrytypeForm.reset();
    this.currentIndustrytypeId = 0;
  }
}
