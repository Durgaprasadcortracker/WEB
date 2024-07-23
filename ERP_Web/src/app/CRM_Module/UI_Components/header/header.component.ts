import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() _sideBar = new EventEmitter<boolean>();
  currentTime: any;

  private subscription: any;
  username: any = sessionStorage.getItem("FullName");

  _sideBarValue=true

  constructor(private fb: FormBuilder,
    private router:Router ,
    private snackBar: MatSnackBar,
  ){}

  sideBar() {
    const value = true; 
    this._sideBarValue = (this._sideBarValue?false:true)
    this._sideBar.emit(value);
  }
  ngOnInit() {
    const userName = sessionStorage.getItem("userName");
    if(userName){
      this.username=userName
    }
    this.currentTime = new Date();
    this.subscription = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  OnClick(){
    this.snackBar.open('Logged Out Successfully,Thank You !', 'Close', {
      duration: 3000, // Snackbar stays open for 3 seconds
    });
  }

}


