import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';

@Component({
  selector: 'app-call-logs',
  templateUrl: './call-logs.component.html',
  styleUrl: './call-logs.component.css'
})
export class CallLogsComponent {

  calllogsList:any
  id: any;

  constructor(private route: ActivatedRoute,
    private http: BackendService
  ) {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
  }

  ngOnInit(){
    this.getRequiredData()

  }
  getRequiredData() {
    this.http.getapi('api/Lead/GetCallLog/' + this.id).subscribe((res) => {
      if (res) {
        this.calllogsList = res
        console.log(this.calllogsList);
      }
    });
  }

}
