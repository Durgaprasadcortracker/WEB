import { Component } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { ExcelreadService } from '../../../../Services/Excel/excelread.service';
import { MyData } from '../../../../Services/Excel/sample-excel-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-bulk-upload-main',
  templateUrl: './bulk-upload-main.component.html',
  styleUrl: './bulk-upload-main.component.css'
})
export class BulkUploadMainComponent {
  uploadedData: any;
  uploadPage = 1;
  industrylist: any;
  timeZonelist: any;
  citylist: any;
  statelist: any;
  countrylist: any;
  industrytypelist: any
  loadingUploadButton: any;
  _alertmessage: any;

  constructor(private http: BackendService,
    private excelRead: ExcelreadService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.getDropdowns()
  }
  sampleCompanies = MyData.sampleCompanies;


  downloadFile() {
    this.excelRead.exportAsExcelFile(this.sampleCompanies, 'Companys_Bulk_Upload');
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.excelRead.readExcel(file)
        .then((data: any) => {
          console.log(data);
          this.uploadedData = data;
          this.uploadPage = 2
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }
  convertString(str: any) {
    return str.toLowerCase().split(' ').join('');
  }
  uploadData() {
    console.log(this.uploadedData);
    this.loadingUploadButton = true
    let updc = JSON.parse(JSON.stringify(this.uploadedData));
    for (let [i, a] of updc.entries()) {
      let CompanyIndustry = this.convertString(a.CompanyIndustry)
      let _CompanyIndustry = false
      for (let k of this.industrylist) {
        let description = this.convertString(k.description)
        if (CompanyIndustry == description) {
          let _numType = Number(k.id)
          a.CompanyIndustry = _numType
          _CompanyIndustry = true
          break;
        }
      }
      if(!_CompanyIndustry){
        this.alertMessages(i+1, CompanyIndustry)
      }
      let CompanyIndustryType = this.convertString(a.CompanyIndustryType)
      let _CompanyIndustryType = false
      for (let k of this.industrytypelist) {
        let description = this.convertString(k.description)
        if (CompanyIndustryType == description) {
          let _numType = Number(k.id)
          a.CompanyIndustryType = _numType
          _CompanyIndustryType = true
          break;
        }
      }
      if(!_CompanyIndustryType){
        this.alertMessages(i+1, CompanyIndustryType)
      }
      let Country = this.convertString(a.Country)
      let _Country = false
      for (let k of this.countrylist) {
        let description = this.convertString(k.description)
        if (Country == description) {
          let _numType = Number(k.id)
          a.Country = _numType
          _Country = true
          break;
        }
      }
      if(!_Country){
        this.alertMessages(i+1, Country)
      }
      let _City = this.convertString(a.City)
      let _City_ = false
      for (let k of this.citylist) {
        let description = this.convertString(k.description)
        if (_City == description) {
          let _numType = Number(k.id)
          a.City = _numType
          _City_ = true
          break;
        }
      }
      if(!_City_){
        this.alertMessages(i+1, _City)
      }
      let State = this.convertString(a.State)
      let _State = false
      for (let k of this.statelist) {
        let description = this.convertString(k.description)
        if (State == description) {
          let _numType = Number(k.id)
          a.State = _numType
          _State = true
          break;
        }
      }
      if(!_State){
        this.alertMessages(i+1, State)
      }
      let TimeZone = this.convertString(a.TimeZone)
      let _TimeZone = false
      for (let k of this.timeZonelist) {
        let description = this.convertString(k.description)
        if (TimeZone == description) {
          let _numType = Number(k.id)
          a.TimeZone = _numType
          _TimeZone =true
          break;
        }
      }
      if(!_TimeZone){
        this.alertMessages(i+1, TimeZone)
      }
    }
    console.log(updc);
    this.uploadtoBackend(updc)
  }
  alertMessages(row: any, type: any) {
    this._alertmessage = "In the " + row + " row " + type + " is invalid"
    this.loadingUploadButton = false

  }
  uploadtoBackend(_jsondata: any) {
    this.http.postapi('api/Company/Bulkupload1', _jsondata).subscribe((res) => {
      console.log(res);
      if(res){
        this.snackBar.open(_jsondata.length+' Companys successfully added!', 'Close', {
          duration: 3000, 
        });
        this.router.navigate(['/CRM/Companies']);
      }
      this.loadingUploadButton = false
    });
  }
  getDropdowns() {
    this.http.getapi('api/Common/GetIndustry').subscribe((res) => {
      this.industrylist = res.data;
      console.log(this.industrylist);
    });
    this.http.getapi('api/Common/GetIndustrytype').subscribe((res) => {
      this.industrytypelist = res.data;
      console.log(this.industrytypelist);
    });
    this.http.getapi('api/Common/GetTimezones').subscribe((res) => {
      this.timeZonelist = res.data;
      console.log(this.timeZonelist);
    });
    this.http.getapi('api/Common/GetStates').subscribe((res) => {
      this.statelist = res.data;
      console.log(this.statelist);
    });
    this.http.getapi('api/Common/GetCountry').subscribe((res) => {
      this.countrylist = res.data;
      console.log(this.countrylist);
    });
    this.http.getapi('api/Company/getAllCities').subscribe((res) => {
      this.citylist = res.data;
      console.log(this.citylist);
    });
  }
}
