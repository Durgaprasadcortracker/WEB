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
    },

    {
      name: "Probability",
      url: "/CRM/Settings/configuration/probability"
    },
    {
      name: "State",
      url: "/CRM/Settings/configuration/state"
    },
    {
      name: "Country",
      url: "/CRM/Settings/configuration/country"
    }, {
      name: "Call Type",
      url: "/CRM/Settings/configuration/call-type"
    },
    {
      name: "Stage",
      url: "/CRM/Settings/configuration/stage"
    },
    {
      name: "Quote Type",
      url: "/CRM/Settings/configuration/Quotetype"
    }
  ]
}
