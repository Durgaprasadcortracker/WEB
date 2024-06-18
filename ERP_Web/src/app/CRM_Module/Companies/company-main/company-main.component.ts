import { Component } from '@angular/core';
import { BackendService } from '../../../Services/BackendConnection/backend.service';


@Component({
  selector: 'app-company-main',
  templateUrl: './company-main.component.html',
  styleUrl: './company-main.component.css'
})
export class CompanyMainComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  p:number=1;
  
  constructor(private http: BackendService) { }


  data = {
    records: 0
  }
  companyPage = 0
  listOfCompanys:any
  editData:any

  ngOnInit() {
    this.getData()
  }

  addCompany(message: any) {
    console.log(message);
    this.companyPage = 0;
    this.editData = null;
    this.ngOnInit()
  }
  getData(){
    this.http.getapi('api/Company/GetCompany').subscribe((res) => {
        console.log(res);
        console.log
        this.listOfCompanys=res.data
      }
    );
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getData();
  }
  deleteCompany(ID:any){
    this.http.deleteapi('api/Company/DeleteCompanies/'+ID).subscribe((res) => {
        console.log(res);
        this.listOfCompanys=res
        this.ngOnInit()
      }
    );
  }
  
}
