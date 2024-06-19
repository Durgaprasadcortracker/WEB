import { Component } from '@angular/core';

@Component({
  selector: 'app-configration',
  templateUrl: './configration.component.html',
  styleUrl: './configration.component.css'
})
export class ConfigrationComponent {
  
  currenttab=0

  list=["Status","Stage","Source", "Time Zone","Industry Type","City","Industry",]

  selectedTab(i:any){
    this.currenttab = i
  }



}
