import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrl: './contact-view.component.css'
})
export class ContactViewComponent {

  id: any;
  contactView: any
  allstages: any
  allstatus:any

  constructor(private route: ActivatedRoute,
    private http: BackendService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getRequiredData()
  }
  getRequiredData() {
    this.http.getapi('api/Contacts/GetContactsby/' + this.id).subscribe((res) => {
      if (res.status) {
        this.contactView = res.data
        console.log(this.contactView);
      }
    });
    this.http.getapi('api/Common/GetStages').subscribe((res) => {
      this.allstages = res
    });
    this.http.getapi('api/Common/GetStatus').subscribe((res) => {
      if (res.status) {
        this.allstatus = res.data
      }
    });
  }
}
