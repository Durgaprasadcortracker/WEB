import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-calltype',
  templateUrl: './calltype.component.html',
  styleUrl: './calltype.component.css'
})
export class CalltypeComponent {
  calltypeForm: any; 
  CalltypeList: any;
  calltypeId: any;
  submited: any;


  constructor(
    private fb: FormBuilder, 
    private http: BackendService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.calltypeId = params.get('calltypeid');
      console.log(this.calltypeId);
      if (this.calltypeId > 0) {
        this.getCalltypeById(this.calltypeId)
      }
    });
  }
  ngOnInit(): void {
    this.calltypeForm = this.fb.group({
      id: [0],
      description: [null, Validators.required]
    });
    
  }
  submitForm(): void {
    this.submited = true;
    console.log(this.calltypeForm.value);
    const _ID = this.calltypeForm.value.id
    if (this.calltypeForm.invalid) {
      return;
    }
    if (_ID > 0) {
      this.http.putapi(`api/Common/UpdateCallType`, this.calltypeForm.value).subscribe((res) => { 
        this.clear();
        this.router.navigate(['/CRM/Settings/calltypelist'])
      }, (error) => {
        console.error('Error updating Calltype', error);
      });
    } else {
      this.http.postapi('api/Common/AddCallType', this.calltypeForm.value).subscribe(() => { 
        this.clear();
        this.router.navigate(['/CRM/Settings/calltypelist'])
      }, (error) => {
        console.error('Error adding Calltype', error);
      });
    }

  }
  getCalltypeById(Id: any) {
    this.http.getapi('api/Common/GetCallType/' + Id).subscribe((res) => {
      console.log(res);
      this.calltypeForm.patchValue(res.data);
    
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.calltypeForm.controls;
  }
  clear(): void {
    this.calltypeForm.reset();
    this.submited = false;
    this.ngOnInit()
    this.router.navigate(['/CRM/Settings/calltype']);
  }

}
