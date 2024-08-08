import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from '../../../Services/BackendConnection/backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  currentTime: any;
  expDate: any;
  @Output() _sideBar = new EventEmitter<boolean>();
  private subscription: any;
  username: string | null = sessionStorage.getItem("FullName");
  _sideBarValue = true;
  remainingDays: number = 0;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  sideBar() {
    this._sideBarValue = !this._sideBarValue;
    this._sideBar.emit(this._sideBarValue);
  }

  ngOnInit() {
    this.currentTime = new Date();
    this.subscription = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);

    this.calculateExpDate();
  }

  calculateExpDate() {
    const expDateStr = sessionStorage.getItem("expDate");
    console.log(expDateStr)
    if (expDateStr) {
      let expDate:any = new Date(expDateStr);
      const today = new Date();
      this.remainingDays = Math.ceil((expDate - today.getTime()) / (1000 * 3600 * 24));
    } else {
      this.remainingDays = 0; // Default value if no expiration date is found
    }
    console.log(this.remainingDays)
  }

  OnClick() {
    this.snackBar.open('Logged Out Successfully, Thank You!', 'Close', {
      duration: 3000, // Snackbar stays open for 3 seconds
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      clearInterval(this.subscription);
    }
  }
}


  // expDate: number = 0;
  // @Output() _sideBar = new EventEmitter<boolean>();
  

  // private subscription: any;
  // username: any = sessionStorage.getItem("FullName");

  // _sideBarValue=true

  // constructor(private fb: FormBuilder,
  //   private router:Router ,
  //   private snackBar: MatSnackBar,
  // ){}

  // sideBar() {
  //   const value = true; 
  //   this._sideBarValue = (this._sideBarValue?false:true)
  //   this._sideBar.emit(value);
  // }
  // ngOnInit() {
  //   const userName = sessionStorage.getItem("userName");
  //   if(userName){
  //     this.username=userName
  //   }
  //   this.currentTime = new Date();
  //   this.subscription = setInterval(() => {
  //     this.currentTime = new Date();
  //   }, 1000);

  //   const expDateStr = sessionStorage.getItem("expDate");
  //   if (expDateStr) {
  //     const expDate = new Date(expDateStr);
  //     const today = new Date();
  //     this.expDate = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  //   } else {
  //     this.expDate = 0; // Default value if no expiration date is found
  //   }
  // }

  // OnClick(){
  //   this.snackBar.open('Logged Out Successfully,Thank You !', 'Close', {
  //     duration: 3000, // Snackbar stays open for 3 seconds
  //   });
  // }