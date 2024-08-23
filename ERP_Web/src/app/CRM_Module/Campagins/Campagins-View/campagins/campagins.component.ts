import { Component } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-campagins',
  templateUrl: './campagins.component.html',
  styleUrl: './campagins.component.css'
})
export class CampaginsComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  p:number=1;

  listOfCampaigns:any;
  editData:any;
  router: any;
  campaign: any;
  
  constructor(private http: BackendService,
    
    private snackBar: MatSnackBar,
  ) { }

  campaignPage = 0

  
  ngOnInit() {
    this.getData()
  }

  addCampaign(message: any) {
    console.log(message);
    this.campaignPage = 0;
    this.editData = null;
    this.ngOnInit()
  }
  getData(){
    this.http.getapi('api/Campaign/GetCampaigns').subscribe((res) => {
        console.log(res);
        console.log
        this.listOfCampaigns=res.data
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
  deleteCampaign(ID:any){
    this.http.deleteapi('api/Campaign/DeleteCampaign/'+ID).subscribe((res) => {
      this.snackBar.open('Campaign successfully Deleted!', 'Close', {
        duration: 3000, // Snackbar stays open for 3 seconds
      });
        console.log(res);
        this.listOfCampaigns=res
        this.ngOnInit()
      }
    );
  }
  edit(Id: any) {
    this.router.navigate(['/CRM/editcampaign', Id]);
  }
}
