import { Component } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrl: './timezone.component.css'
})
export class TimezoneComponent {
  constructor( private http: BackendService ){}

  Timezonelist : any;

  ngOnInit(){
    this.http.getapi('api/Common/GetSource').subscribe((res) => {
      console.log(res);
      this.Timezonelist = res.data
    });
  }

}
