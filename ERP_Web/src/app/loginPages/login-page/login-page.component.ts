import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../Services/BackendConnection/backend.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  ShowHide:boolean=true;
openForgotPassword: any;
  
  signup(){
    this.ShowHide=false
  }
    
  login(){
  this.ShowHide=true
  }

  submitted = false;
  constructor(private fb: FormBuilder,
    private router:Router ,
    private backendservice:BackendService,
    private snackBar: MatSnackBar,
  ){}
  loginform:FormGroup=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  })  
  signupform: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    company: new FormControl(''),
    designation:new FormControl(''),
    phonenumber:new FormControl(''),
    gender:new FormControl(<number>(0)),
    email:new FormControl(''),
    password:new FormControl('')
  });
  
  formBuilder: any;

  ngOnInit():void{
    this.loginform=this.fb.group({
      email:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })
    this.signupform = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: ['',Validators.required],
        company: ['',Validators.required],
        designation: ['',Validators.required],
        phonenumber: ['',Validators.required],
        gender:[0],
        email: ['', [Validators.required]],
        password: ['',[Validators.required,Validators.minLength(6),
            Validators.maxLength(40)]],
      });
  
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }
  get fg(): { [key: string]: AbstractControl } {
    return this.signupform.controls;
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
        this.snackBar.open('Logged in Successfully,Well Come !', 'Close', {
          duration: 3000, // Snackbar stays open for 3 seconds
        });
        sessionStorage.setItem("FullName",response.data.firstName+" "+response.data.lastName)
        sessionStorage.setItem("Designation",response.data.designation)
        sessionStorage.setItem("id",response.data.id)
      this.router.navigate(['/CRM/Home'])
      }
    })
    
  }
  successmsg:any;
  OnSignUp(){
    console.log(this.signupform.value)
    this.submitted = true;

    // if (this.signupform.invalid) {
    //   return;
    // }
    console.log(this.signupform.getRawValue());
    this.backendservice.postapi('api/Login/AddLogins',this.signupform.getRawValue()).subscribe(response=>{
      this.snackBar.open('SignUp Successfully Completed!', 'LogIn Now', {
        duration: 3000, // Snackbar stays open for 3 seconds
      });
      this.router.navigate(['/login']);
    });
    this.successmsg="Saved Successfully";
  }
   onReset(): void {
    this.submitted = false;
    this.signupform.reset();
  }

}