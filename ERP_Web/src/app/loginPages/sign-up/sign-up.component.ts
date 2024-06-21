import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../Services/BackendConnection/backend.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
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

  submitted = false;
  formBuilder: any;

  constructor(private fb: FormBuilder , private backendservice:BackendService) {}
  ngOnInit(): void {

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
    return this.signupform.controls;
  }
  successmsg:any;

  onSubmit(): void {
  
   this.submitted = true;

    if (this.signupform.invalid) {
      return;
    }
    console.log(this.signupform.getRawValue());
    this.backendservice.postapi('api/Login/AddLogins',this.signupform.getRawValue()).subscribe(response=>{
      this.successmsg="Saved Successfully";
    })
    
  }

  onReset(): void {
    this.submitted = false;
    this.signupform.reset();
  }

  
}
