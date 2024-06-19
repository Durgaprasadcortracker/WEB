import { Component } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent {

  citylist:any
  myForm: FormGroup;

  constructor(private http: BackendService, private fb: FormBuilder )
   {
    this.myForm = this.fb.group({
      addcity: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-]+$')]]
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

  ngOnInit(){
    this.http.getapi('api/Common/Getcities').subscribe((res) => {
      console.log(res);
      this.citylist = res
    });

  }



}
