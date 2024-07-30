import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'console';
@Component({
  selector: 'app-industrytype',
  templateUrl: './industrytype.component.html',
  styleUrl: './industrytype.component.css'
})
export class IndustrytypeComponent {
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
        this.router.navigate(['/CRM/Settings/industrytypelist'])
      },(error)=> {
        console.error('Error updating Industry Type', error);
      });
    }else {
      this.http.postapi('api/Common/AddIndustryType', this.industrytypeForm.value).subscribe(()=>{
        this.clear();
        this.router.navigate(['/CRM/Settings/industrytypelist'])
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
  clear(): void {
    this.submitted = false;
    this.industrytypeForm.reset();
    this.ngOnInit()
    this.router.navigate(['/CRM/Settings/industrytype'])
  }
}
