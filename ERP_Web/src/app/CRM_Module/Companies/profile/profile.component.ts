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
  company: any;
  id: any;

  // myForm: FormGroup  = new FormGroup({
  //   id: new FormControl(0),
  //   companyName: new FormControl(null),
  //   companyDomainName: new FormControl(null),
  //   companyOwner: new FormControl(null),
  //   industry: new FormControl(null),
  //   industryType: new FormControl(null),
  //   headCount: new FormControl(null),
  //   annualRevenue: new FormControl(null),
  //   city: new FormControl(null),
  //   state: new FormControl(null),
  //   country: new FormControl(null),
  //   postalCode: new FormControl(null),
  //   timeZone: new FormControl(null),
  //   website: new FormControl(null),
  //   linkedinUrl : new FormControl(null),
  //   businessEmail: new FormControl(null),
  //   address1: new FormControl(null),
  //   address2: new FormControl(null),
  //   });
  

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private http: BackendService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.http.getapi('api/Company/GetCompaniesby/' + this.id).subscribe((res) => {
      console.log(res);
      this.company=res.data
    });
  }
}