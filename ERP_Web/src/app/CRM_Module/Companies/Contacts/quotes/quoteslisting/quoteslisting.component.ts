import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendService } from '../../../../../Services/BackendConnection/backend.service';




@Component({
  selector: 'app-quoteslisting',
  templateUrl: './quoteslisting.component.html',
  styleUrls: ['./quoteslisting.component.scss']
})
export class QuoteslistingComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  p:number=1;
  a: any;
  router: any;
  
  constructor(private http: BackendService) { }


  data = {
    records: 0
  }
  addQuotes = 0
  listOfQuotes:any
  editData:any

  ngOnInit() {
    this.getData()
  }

  addQuote(message: any) {
    console.log(message);
    this.addQuotes = 0;
    this.editData = null;
    this.ngOnInit()
  }
  getData(){
    this.http.getapi('api/Quotation/GetQuotations').subscribe((res) => {
        console.log(res);
        this.listOfQuotes=res
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
  DeleteQuotations(ID:any){
    this.http.deleteapi('api/Quotation/DeleteQuotations/'+ID).subscribe((res) => {
      // this.snackBar.open('Quotation successfully Deleted!', 'Close', {
      //   duration: 3000, // Snackbar stays open for 3 seconds
      // });
      console.log(res);
      this.listOfQuotes=res
      this.ngOnInit()
      }
    );
  }
 
  edit(Id: any) {
    this.router.navigate(['/CRM/editcompany', Id]);
  }

}