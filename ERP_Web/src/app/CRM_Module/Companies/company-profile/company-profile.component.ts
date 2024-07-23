import { Component } from '@angular/core';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent {
  constructor(private router:Router,private http:BackendService,  private route: ActivatedRoute){
    this.route.queryParamMap.subscribe((params) => {
      this.id=params.get('companyId');
    });
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
  }
  id:any;
  company:any;
  ngOnInit(){
    this.http.getapi(`api/Company/GetCompaniesbyId/${this.id}`).subscribe((res) => {
      console.log(res);
      this.company=res.data
    });
  }
  
}
