import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';

@Component({
  selector: 'app-stagedesign',
  templateUrl: './stagedesign.component.html',
  styleUrl: './stagedesign.component.css'
})
export class StagedesignComponent {

  Stagelist: any;
  myForm: FormGroup;
 

  constructor(private fb: FormBuilder, private http: BackendService) {
    
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
      this.http.getapi('api/Common/GetStages').subscribe((res) => {
        console.log(res);
        this.Stagelist = res
      });
    }
   
}
