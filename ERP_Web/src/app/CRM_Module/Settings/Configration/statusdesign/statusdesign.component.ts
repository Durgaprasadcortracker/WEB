import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';

@Component({
  selector: 'app-statusdesign',
  templateUrl: './statusdesign.component.html',
  styleUrl: './statusdesign.component.css'
})
export class StatusdesignComponent {
  statuses : any;
  myForm: FormGroup;
  Stagelist: any;
  
  constructor(private fb: FormBuilder, private http: BackendService) {
    // Initialize the form group with form controls and validators
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
      this.http.getapi('api/Common/GetStatus').subscribe((res) => {
        console.log(res);
        this.statuses = res
      });
    }

    getSatage() {
      this.http.getapi('api/Company/GetStage').subscribe((res) => {
        this.Stagelist = res;
      });
    }

}
