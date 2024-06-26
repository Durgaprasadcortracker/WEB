import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-campagins',
  templateUrl: './email-campagins.component.html',
  styleUrls: ['./email-campagins.component.css']
})
export class EmailCampaginsComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  p: number = 1;
  searchTerm: string = '';

  listOfCampagins: any[] = [];
  filteredCampaigns: any[] = [];
  contactPage = 0
  editData: any;

  constructor(
    private http: BackendService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  addEmail(message: any) {
    console.log(message);
    this.contactPage = 0;
    this.editData = null;
    this.ngOnInit();
  }

  getData() {
    this.http.getapi('api/Campaign/GetEmailDetails').subscribe((res) => {
      console.log(res);
      this.listOfCampagins = res.data;
      this.filteredCampaigns = this.listOfCampagins; // Initialize filteredCampaigns with the complete list
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

  filterCampaigns() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredCampaigns = this.listOfCampagins.filter(campaign => {
      return campaign.eMail.toLowerCase().includes(searchTermLower);
    });
  }

  deleteEmail(ID: any) {
    this.http.deleteapi('api/Campaign/DeleteCampaign/' + ID).subscribe((res) => {
      console.log(res);
      this.getData(); // Refresh the data after deletion
      this.snackBar.open('Company successfully deleted!', 'Close', {
        duration: 3000, // Snackbar stays open for 3 seconds
      });
    });
  }

  edit(data: any) {
    this.contactPage = 1;
    this.editData = data;
    this.router.navigate(['/CRM/AddEmailConversation', data.id]);
  }
}
