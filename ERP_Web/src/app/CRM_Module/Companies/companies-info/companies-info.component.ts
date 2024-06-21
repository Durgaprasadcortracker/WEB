import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-companies-info',
  templateUrl: './companies-info.component.html',
  styleUrl: './companies-info.component.css'
})
export class CompaniesInfoComponent {
  selectedTab = 0;
  myForm:any;
  Id:any;
  
  public tabs = [
      { label: 'Profile', content: 'onboard' },
      { label: 'Contacts', content: 'employeeDetails' },
      { label: 'Quotation', content: 'PersonalDetails' },
     
    ];
  selectTab(tab: any, index: number) {
      this.selectedTab = index;

    }
    constructor(private ActivatedRoute:ActivatedRoute,private router:Router){
      this.ActivatedRoute.queryParamMap.subscribe((params) => {
        this.Id = params.get('id');
       
      });
    }

}
