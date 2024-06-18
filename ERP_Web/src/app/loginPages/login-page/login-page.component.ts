import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../Services/BackendConnection/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  submitted = false;
  constructor(private fb: FormBuilder,private router:Router ,private backendservice:BackendService){}
  loginform:FormGroup=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  })  
  ngOnInit():void{
    this.loginform=this.fb.group({
      email:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }
  errormsg:any;
  onSubmit(): void {
 
   this.submitted = true;

    if (this.loginform.invalid) {
      return;
    }
 
    console.log(this.loginform.getRawValue());
    this.backendservice.putapi('api/Login/authenticate',this.loginform.getRawValue()).subscribe(response=>{
    
      if(response.status==false){
         this.errormsg=response.message;
         return;
      }
      else{
      this.router.navigate(['/CRM/Home'])
      }
    })
    
  }
}
