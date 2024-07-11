import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deal-created-vs-lost',
  templateUrl: './deal-created-vs-lost.component.html',
  styleUrl: './deal-created-vs-lost.component.css'
})
export class DealCreatedVsLostComponent {
  page: number = 1;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  p: number = 1;
  Id: any;
  listofdealswon: any;
  _loginlist: any;

  constructor(
    private http: BackendService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.Id = this.route.snapshot.paramMap.get('id');

  }


  myForm: any;

  ngOnInit() {
    this.myForm = this.fb.group({
      id: new FormControl(0),
      LeadOwner:new FormControl(null),
      fromDate:new FormControl(null),
      toDate:new FormControl(null)
    });

    this.getLogin();
    console.log(this.Id);


    if (this.Id) {
      this.http
        .getapi('api/Lead/GetLeadsby/' + this.Id)
        .subscribe((res) => {
          console.log(res);
          this.myForm.patchValue(res.data);
        });
    }
  }

  submitted: any;

  onTableDataChange(event: any) {
    this.page = event;
    // this.getData();
  }
  // getData() {
  //   this.http.getapi('api/GetDealCreatedReports').subscribe((res) => {
  //     console.log(res);
  //     this.listofdealswon = res.data
  //   }
  //   );
  // }
  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }



  getLogin() {
    this.http.getapi('api/Login/GetLogins').subscribe((res) => {
      console.log(res);
      this._loginlist = res;
    });
  }

  clear() {
    this.myForm.reset(['/dealcreatedvswon']);
    
  }
  downloadReport() {
     // Generate report data
     const reportData = this.generateCSVReport();

     // Trigger download
     this.triggerDownload(reportData, 'report.csv', 'text/csv');
  }
  triggerDownload(reportData: void, arg1: string, arg2: string) {
    throw new Error('Method not implemented.');
  }
  generateCSVReport() {
    throw new Error('Method not implemented.');
  }


  onSearch() {
    this.http.postapi('api/Common/GetDealCreatedReports',this.myForm.getRawValue()).subscribe((res) => {
      debugger;
      console.log(res);
     this.listofdealswon = res
    })
  }
  

}
