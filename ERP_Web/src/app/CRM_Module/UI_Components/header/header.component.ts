import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() _sideBar = new EventEmitter<boolean>();
  currentTime: any;

  private subscription: any;
  username: any = "Admin";

  _sideBarValue=true

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


}
