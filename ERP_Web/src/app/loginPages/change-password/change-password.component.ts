import { Component } from '@angular/core';

import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BackendService } from '../../Services/BackendConnection/backend.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  form: FormGroup = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmNewPassword: new FormControl(''),
   
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private backendService:BackendService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        
        currentPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],
    
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],
        confirmNewPassword: ['', Validators.required],
     
      },
      // {
      //   validators: [Validation.match('password', 'confirmPassword')],
      // }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    console.log(this.form.value)
    this.submitted = true;

    //if (this.form.invalid) {
      this.backendService.putapi('api/Login/ChangePassword',this.form.getRawValue()).subscribe((res)=>{
        console.log(res);
        this.ngOnInit();
      })
      return;
    //}

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  // onReset(): void {
  //   this.submitted = false;
  //   this.form.reset();
  // }


  
}