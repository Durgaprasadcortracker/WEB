import { Component } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrl: './industry.component.css'
})
export class IndustryComponent {
  Industrylist: any;
  myForm: FormGroup;

  constructor(
    private http: BackendService,
    private fb: FormBuilder 
  
  ){
    this.myForm = this.fb.group({
      addcountry: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-]+$')]]
    });

  }
  
  onSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      console.log('Form Data:', formData);
          } else {
      console.log('Field is invalid');
    }
  }

  close() {
    console.log('field closed');
    }

  ngOnInit(){
    this.http.getapi('api/Common/GetIndustry').subscribe((res) => {
      console.log(res);
      this.Industrylist = res.data
    });
  }

  deleteIndustry(ID:any){
    this.http.deleteapi('aapi/Common/DeleteIndustry/'+ID).subscribe((res) => {
        console.log(res);
        this.Industrylist=res
        this.ngOnInit()
      }
    );
  }
}
