import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';

@Component({
  selector: 'app-sourcedesign',
  templateUrl: './sourcedesign.component.html',
  styleUrl: './sourcedesign.component.css'
})
export class SourcedesignComponent {
  myForm: FormGroup;
  Sourcelist : any;

  constructor(private fb: FormBuilder, private http: BackendService ) {
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
      this.http.getapi('api/Common/GetSource').subscribe((res) => {
        console.log(res);
        this.Sourcelist = res.data
      });

}
}
