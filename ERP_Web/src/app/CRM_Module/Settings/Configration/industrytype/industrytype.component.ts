import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'console';


@Component({
  selector: 'app-industrytype', 
  templateUrl: './industrytype.component.html',
  styleUrls: ['./industrytype.component.css']
})
export class IndustrytypeComponent implements OnInit {
  industrytypeForm: any;
  IndustrytypeList: any; 
  industrytypeId:any;
  submitted:any;

  constructor(
    private fb: FormBuilder, 
    private http: BackendService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.industrytypeId = params.get('industrytypeid'); 
      console.log(this.industrytypeId);
      if (this.industrytypeId > 0) {
        this.getIndustrytypeById(this.industrytypeId)
      }
    });
  }

  ngOnInit(): void {
    this.industrytypeForm = this.fb.group({
      id: [0],
      description:[null, Validators.required]
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

  submitForm(): void {
    this.submitted = true; 
    console.log (this.industrytypeForm.value);
    const _ID = this.industrytypeForm.value.id
    if (this.industrytypeForm.invalid){
      return;
    }

    if (_ID > 0){
      this.http.putapi(`api/Common/UpdateIndustryTypes`, this.industrytypeForm.value).subscribe((res) => {
        this.clear();
      },(error)=> {
        console.error('Error updating Industry Type', error);
      });
    }else {
      this.http.postapi('api/Common/AddIndustryType', this.industrytypeForm.value).subscribe(()=>{
        this.clear();
      },(error) => {
        console.error('Error adding quotetype', error);
      });
    }
    }


  getIndustrytypeById(id: any) {
    this.http.getapi('api/Common/GetIndustryTypesby/' + id).subscribe((res) => {
      console.log(res);
      this.industrytypeForm.patchValue(res.data);
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.industrytypeForm.controls;
  }

  deleteIndustrytype(id: number): void {
    this.http.deleteapi(`api/Common/DeleteIndustryType/${id}`).subscribe(() => {
      console.log('Industrytype deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deleting industrytype with id ${id}`, error);
    });
  }

  clear(): void {
    this.submitted = false;
    this.industrytypeForm.reset();
    this.ngOnInit()
    this.router.navigate(['/CRM/Settings/industry-type'])
  }
}