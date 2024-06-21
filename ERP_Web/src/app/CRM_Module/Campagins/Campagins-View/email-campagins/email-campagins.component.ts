import { Component } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';

@Component({
  selector: 'app-email-campagins',
  templateUrl: './email-campagins.component.html',
  styleUrl: './email-campagins.component.css'
})
export class EmailCampaginsComponent {

    
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  p:number=1;
  
  constructor(private http: BackendService) { }

  
  data = {
    records: 0
  }
  contactPage = 0
  listOfCampagins:any
  editData:any

  ngOnInit() {
    this.getData()
  }

  addEmail(message: any) {
    console.log(message);
    this.contactPage = 0;
    this.editData = null;
    this.ngOnInit()
  }

  //api/Campaign/GetEmailDetails
  //api/Campaign/GetCampaigns

  getData() {
    this.http.getapi('api/Campaign/GetEmailDetails').subscribe((res) => {
      console.log(res);
      this.listOfCampagins=res.data
    });
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
  deleteEmail(ID:any){
      this.http.deleteapi('api/Campaign/DeleteCampaign/'+ID).subscribe((res) => {
          console.log(res);
          this.listOfCampagins=res
          this.ngOnInit()
        }
      );
    }
 edit(data:any){
    this.contactPage=1;
    this.editData=data
  }
}
