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
  id: any;

  

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