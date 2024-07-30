import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelreadService } from '../../../Services/Excel/excelread.service';


@Component({
  selector: 'app-deal-created-vs-lost',
  templateUrl: './deal-created-vs-lost.component.html',
  styleUrls: ['./deal-created-vs-lost.component.css']
})
export class DealCreatedVsLostComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  p: number = 1;
  Id: any;
  deals: any;
  _loginlist: any;
  _LostReason: string[] = ['Pricing', 'Product-Requirement', 'Lost to Competition', 'Prospecting'];

  myForm: FormGroup;
  submitted = false;

  constructor(
    private http: BackendService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private excelRead: ExcelreadService
  ) {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.myForm = this.fb.group({
      SalesOwnerName: new FormControl(null, Validators.required),
      fromDate: new FormControl(null, Validators.required),
      toDate: new FormControl(null, Validators.required),
      LostReason : new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.getLogin();

    if (this.Id) {
      this.http.getapi('api/Lead/GetLeadsby/' + this.Id).subscribe((res) => {
        this.myForm.patchValue(res.data);
      });
    }
  }

  get f() {
    return this.myForm.controls;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  getLogin() {
    this.http.getapi('api/Login/GetLogins').subscribe((res) => {
      this._loginlist = res;
    });
  }

  clear() {
    this.myForm.reset();
  }

  downloadReport() {
    this.excelRead.exportAsExcelFile(this.deals, 'Deal-created-vs-lost');
  }

  onSearch() {
    console.log(this.myForm.value)
    this.submitted = true;
    // if (this.myForm.invalid) {
    //   return;
    // }
    this.http.postapi('api/Common/GetDealLostReports', this.myForm.getRawValue()).subscribe((res) => {
      this.deals = res; 
    });
  }
}
