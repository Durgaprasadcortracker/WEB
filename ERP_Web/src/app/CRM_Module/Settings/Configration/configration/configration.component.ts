import { Component } from '@angular/core';

@Component({
  selector: 'app-configration',
  templateUrl: './configration.component.html',
  styleUrl: './configration.component.css'
})
export class ConfigrationComponent {
  
  currenttab=0

  list=["Status","Stage","Source",]

  selectedTab(i:any){
    this.currenttab = i
  }

  

}
