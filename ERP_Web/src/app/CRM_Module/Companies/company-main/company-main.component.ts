import { Component } from '@angular/core';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-company-main',
  templateUrl: './company-main.component.html',
  styleUrl: './company-main.component.css'
})
export class CompanyMainComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  p:number=1;

  listOfCompanys:any;
  editData:any;
  router: any;
  company: any;
  
  constructor(private http: BackendService,
    
    private snackBar: MatSnackBar,
  ) { }

  companyPage = 0

  
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
      this.snackBar.open('Company successfully Deleted!', 'Close', {
        duration: 3000, // Snackbar stays open for 3 seconds
      });
        console.log(res);
        this.listOfCompanys=res
        this.ngOnInit()
      }
    );
  }
  edit(Id: any) {
    this.router.navigate(['/CRM/editcompany', Id]);
  }
}