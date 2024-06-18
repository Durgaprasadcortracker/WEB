import { Component } from '@angular/core';

@Component({
  selector: 'app-crm-main',
  templateUrl: './crm-main.component.html',
  styleUrl: './crm-main.component.css'
})
export class CrmMainComponent {
  sideBarvalue=true

  sideBar(value: boolean){
    this.sideBarvalue=(this.sideBarvalue?false:true)
  }


}
