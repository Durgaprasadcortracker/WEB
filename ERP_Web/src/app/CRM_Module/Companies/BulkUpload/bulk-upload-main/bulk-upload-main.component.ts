import { Component } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { ExcelreadService } from '../../../../Services/Excel/excelread.service';
import { MyData } from '../../../../Services/Excel/sample-excel-data';

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
  industrytypelist:any

  constructor(private http: BackendService,
    private excelRead: ExcelreadService,
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
  convertString(str:any) {
    return str.toLowerCase().split(' ').join('');
  }
  uploadData() {
    console.log(this.uploadedData);
    let updc = JSON.parse(JSON.stringify(this.uploadedData));
    for(let a of updc){
      let companyIndustry = this.convertString(a.companyIndustry)
      for(let k of this.industrylist){
        let description = this.convertString(k.description)
        if(companyIndustry==description){
          let _numType = Number(k.id)
          a.companyIndustry = _numType
        }
      }
      let companyIndustryType = this.convertString(a.companyIndustryType)
      for(let k of this.industrytypelist){
        let description = this.convertString(k.description)
        if(companyIndustryType==description){
          let _numType = Number(k.id)
          a.companyIndustryType = _numType
        }
      }
      let country = this.convertString(a.country)
      for(let k of this.countrylist){
        let description = this.convertString(k.description)
        if(country==description){
          let _numType = Number(k.id)
          a.country = _numType
        }
      }
      let city = this.convertString(a.city)
      for(let k of this.citylist){
        let description = this.convertString(k.description)
        if(city==description){
          let _numType = Number(k.id)
          a.city = _numType
        }
      }
      let state = this.convertString(a.state)
      for(let k of this.statelist){
        let description = this.convertString(k.description)
        if(state==description){
          let _numType = Number(k.id)
          a.state = _numType
        }
      }
      let timeZone = this.convertString(a.timeZone)
      for(let k of this.timeZonelist){
        let description = this.convertString(k.description)
        if(timeZone==description){
          let _numType = Number(k.id)
          a.timeZone = _numType
        }
      }
      a.id=0
    }
    console.log(updc);
    this.uploadtoBackend(updc)
  }
  uploadtoBackend(_jsondata:any){
    this.http.postapi('api/Company/AddMultipleCompanies', _jsondata).subscribe((res) => {
      console.log(res);
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
