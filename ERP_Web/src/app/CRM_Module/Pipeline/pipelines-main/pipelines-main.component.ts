import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';

@Component({
  selector: 'app-pipelines-main',
  templateUrl: './pipelines-main.component.html',
  styleUrl: './pipelines-main.component.css',
})
export class PipelinesMainComponent {
  _loginlist: any;
  myForm: any;
  router: any;
  Leadstages: any;
  selectedTab = 0
  // public tabs = ['New','Prospect','Contacted','Qualified','Opportunitity','Proposalsent','Nuturing','Won'];
  piplineData: any;
  

 

  constructor(private http: BackendService,
    private fb: FormBuilder
  ) {
    this.getLogin();
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      id: [0],
      DealOwnerName: [null, Validators.required],
      DealCreateDate: [null, Validators.required],
      CloseDate: [null, Validators.required],
    });

  //   this.http.getStages(this.pipelineDto).subscribe((res) => {
  //     this.Stages = res;
  //   });
  // }
    
  }
  selectTab(i: any) {
    this.selectedTab = i
  }

  
  stages: any;
  getLogin() {
    this.http.getapi('api/Login/GetLogins').subscribe((res) => {
      console.log(res);
      this._loginlist = res;
    });
  }

  onSearch() {
    this.http
      .postapi('api/Common/Getpipeline', this.myForm.getRawValue())
      .subscribe((res) => {
        
        console.log(res);
        this.piplineData = res
      });
  }

  
}
