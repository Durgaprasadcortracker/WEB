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

  

<<<<<<< Updated upstream
=======
  list = [
    {
      name: "Status",
      url: "/CRM/Settings/configuration/status"
    },
    {
      name: "Stage",
      url: "/CRM/Settings/configuration/stage"
    },
    {
      name: "Source",
      url: "/CRM/Settings/configuration/source"
    },
    {
      name: "Time zone",
      url: "/CRM/Settings/configuration/time-zone"
    },
    {
      name: "City",
      url: "/CRM/Settings/configuration/city"
    },
    {
      name: "Industry",
      url: "/CRM/Settings/configuration/industry"
    },
    {
      name: "Industry Type",
      url: "/CRM/Settings/configuration/industry-type"
    }
  ]
>>>>>>> Stashed changes
}
