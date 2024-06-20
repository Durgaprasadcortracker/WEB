import { Component } from '@angular/core';

@Component({
  selector: 'app-configration',
  templateUrl: './configration.component.html',
  styleUrl: './configration.component.css'
})
export class ConfigrationComponent {

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
      name: "Probability",
      url: "/CRM/Settings/configuration/probability"
    },
    {
      name: "State",
      url: "/CRM/Settings/configuration/state"
    }
  ]
}
