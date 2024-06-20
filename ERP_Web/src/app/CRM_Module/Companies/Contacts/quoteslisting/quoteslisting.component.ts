import { Component } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';


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
    this.http.getapi('api/Deals/GetQuotes').subscribe((res) => {
        console.log(res);
        this.listOfQuotes=res.data
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
  deleteQuote(ID:any){
    this.http.deleteapi('api/Deals/DeleteQuotes/'+ID).subscribe((res) => {
        console.log(res);
        this.listOfQuotes=res
        this.ngOnInit()
      }
    );
  }
  edit(data:any){
    this.addQuotes = 1;
    this.editData = data
  }
}