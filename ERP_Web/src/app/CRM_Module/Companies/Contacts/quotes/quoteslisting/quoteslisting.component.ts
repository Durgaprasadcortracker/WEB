import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendService } from '../../../../../Services/BackendConnection/backend.service';
import { MatSnackBar } from '@angular/material/snack-bar';




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
quotation: any;
 
  
  constructor(private http: BackendService,
    private snackBar: MatSnackBar,) { }

    data = {
      records: 0
    }
 
  quotePage = 0
 
  listOfQuotations:any
  editData:any

  ngOnInit() {
    this.getData()
  }

  addQuote(message: any) {
    console.log(message);
    this.quotePage = 0;
    this.editData = null;
    this.ngOnInit()
  }
  getData(){
    this.http.getapi('api/Quotation/GetQuotations').subscribe((res) => {
        console.log(res);
        
        this.listOfQuotations=res.data
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
  deleteQuotation(ID:any){
    this.http.deleteapi('api/Quotation/DeleteQuotations/'+ID).subscribe((res) => {
      this.snackBar.open('Quotation successfully Deleted!', 'Close', {
        duration: 3000, // Snackbar stays open for 3 seconds
      });
        console.log(res);
        this.listOfQuotations=res.data
        this.ngOnInit()
      }
    );
  }
 
  edit(data:any){
    this.quotation=1;
    this.editData=data
  }
}