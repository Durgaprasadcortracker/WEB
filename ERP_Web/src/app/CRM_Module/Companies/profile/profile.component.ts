import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,FormControl } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  id:any;
  fullname:any;
  designation:any;
  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private http: BackendService
  ) { this.route.queryParamMap.subscribe((params) => {
    
    this.id=params.get('companyId');
   
  });}
  company:any;
 // id:any;
  ngOnInit(): void {
   // this.id = this.route.snapshot.params['id'];
  this.fullname=sessionStorage.getItem("FullName")
  this.designation=sessionStorage.getItem("Designation")
    this.http.getapi('api/Company/GetCompaniesbyId/' + this.id).subscribe((res) => {
      console.log(res);
      this.company=res.data
    });
    this.getloginById();
  }
  profiledetails:any;
  getloginById(){
    this.http.getapi(`api/Login/getloginById/${sessionStorage.getItem("id")}`).subscribe((res)=>{
this.profiledetails=res;
    });
  }
}