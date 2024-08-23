import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelreadService } from '../../../Services/Excel/excelread.service';
@Component({
  selector: 'app-churn-overview',
  templateUrl: './churn-overview.component.html',
  styleUrls: ['./churn-overview.component.css']
})
export class ChurnOverviewComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  Id: any;
  listofdealswon: any;
  _loginlist: any;
  myForm: any;
  submitted: boolean = false;
  salesOwners: any
  churnData: any

  constructor(
    private http: BackendService,
    private route: ActivatedRoute,
    private router: Router,
    private excelRead: ExcelreadService,
    private fb: FormBuilder
  ) {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.getLogin();
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      salesOwner: new FormControl('', Validators.required),
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required)
    });

    if (this.Id) {
      this.http.getapi('api/Lead/GetLeadsby/' + this.Id).subscribe((res) => {
        this.myForm.patchValue(res.data);
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  getLogin() {
    this.http.getapi('api/Login/GetLogins').subscribe((res) => {
      this._loginlist = res;
      this.salesOwners = res
      console.log(res)
    });
  }

  clear() {
    this.myForm.reset();
    this.submitted = false;
    this.listofdealswon = [];
  }

  downloadReport() {
    this.excelRead.exportAsExcelFile(this.listofdealswon, 'churn-overview')
  }

  onSearch() {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.http.postapi('api/Common/GetDealCreatedReports', this.myForm.getRawValue()).subscribe((res) => {
      this.churnData= res;
      this.count = this.listofdealswon.length;
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
}
