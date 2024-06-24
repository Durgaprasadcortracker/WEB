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
  industrytypelist: any

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
  convertString(str: any) {
    return str.toLowerCase().split(' ').join('');
  }
  uploadData() {
    console.log(this.uploadedData);
    let updc = JSON.parse(JSON.stringify(this.uploadedData));
    for (let a of updc) {
      let CompanyIndustry = this.convertString(a.CompanyIndustry)
      for (let k of this.industrylist) {
        let description = this.convertString(k.description)
        if (CompanyIndustry == description) {
          let _numType = Number(k.id)
          a.CompanyIndustry = _numType
        }
      }
      let CompanyIndustryType = this.convertString(a.CompanyIndustryType)
      for (let k of this.industrytypelist) {
        let description = this.convertString(k.description)
        if (CompanyIndustryType == description) {
          let _numType = Number(k.id)
          a.CompanyIndustryType = _numType
        }
      }
      let Country = this.convertString(a.Country)
      for (let k of this.countrylist) {
        let description = this.convertString(k.description)
        if (Country == description) {
          let _numType = Number(k.id)
          a.Country = _numType
        }
      }
      let _City = this.convertString(a.City)
      for (let k of this.citylist) {
        let description = this.convertString(k.description)
        if (_City == description) {
          let _numType = Number(k.id)
          a.City = _numType
        }
      }
      let State = this.convertString(a.State)
      for (let k of this.statelist) {
        let description = this.convertString(k.description)
        if (State == description) {
          let _numType = Number(k.id)
          a.State = _numType
        }
      }
      let TimeZone = this.convertString(a.TimeZone)
      for (let k of this.timeZonelist) {
        let description = this.convertString(k.description)
        if (TimeZone == description) {
          let _numType = Number(k.id)
          a.TimeZone = _numType
        }
      }
      a.id = 0
    }
    console.log(updc);
    // this.uploadtoBackend(updc)
    // const companies = [
    //   {
    //     DomainName : "example.com",
    //     CompanyName : "Example Corp",
    //     CompanyOwner : "John Doe",
    //     CompanyIndustry : 2,
    //     CompanyIndustryType : 5,
    //     HeadCount : 500,
    //     AnnualRevenue : "5M",
    //     City : 101,
    //     State : 10,
    //     Country : 1,
    //     PostalCode : "12345",
    //     TimeZone : 2,
    //     Website : "http://www.example.com",
    //     LinkedinUrl : "http://www.linkedin.com/company/example",
    //     BusinessEmail : "contact@example.com",
    //     CompanyAddress1 : "123 Example Street",
    //     CampanyAddress2 : "Suite 100",
    //   },
    //   {
    //     DomainName : "aaa.com",
    //     CompanyName : "aaa Corp",
    //     CompanyOwner : "John Doe",
    //     CompanyIndustry : 2,
    //     CompanyIndustryType : 5,
    //     HeadCount : 500,
    //     AnnualRevenue : "5M",
    //     City : 101,
    //     State : 10,
    //     Country : 1,
    //     PostalCode : "12345",
    //     TimeZone : 2,
    //     Website : "http://www.aaa.com",
    //     LinkedinUrl : "http://www.linkedin.com/company/aaa",
    //     BusinessEmail : "contact@aaa.com",
    //     CompanyAddress1 : "123 aaa Street",
    //     CampanyAddress2 : "Suite 100",
    //   }
    // ];

    // console.log(companies);
    this.uploadtoBackend(updc)
  }
  uploadtoBackend(_jsondata: any) {
    this.http.postapi('api/Company/Bulkupload1', _jsondata).subscribe((res) => {
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
