import { Component } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';

@Component({
  selector: 'app-industrytype',
  templateUrl: './industrytype.component.html',
  styleUrl: './industrytype.component.css'
})
export class IndustrytypeComponent {
  Industrytypelist: any;
  constructor(private http: BackendService ){}
  

  ngOnInit(){
    this.http.getapi('api/Common/GetIndustry').subscribe((res) => {
      console.log(res);
      this.Industrytypelist = res.data
    });
  }

}
