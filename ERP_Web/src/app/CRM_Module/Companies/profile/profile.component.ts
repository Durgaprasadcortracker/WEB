import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../../Services/BackendConnection/backend.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  company: any;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    // const companyId = this.route.snapshot.paramMap.get('id');
    // this.backendService.getCompanyDetails(companyId).subscribe(data => {
    //   this.company = data;
    // });
  }
}