import { Component } from '@angular/core';

import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contacts-main',
  templateUrl: './contacts-main.component.html',
  styleUrl: './contacts-main.component.css'
})
export class ContactsMainComponent {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  p:number=1;
  
  constructor(private http: BackendService,
    
    private snackBar: MatSnackBar,
  ) { }


  data = {
    records: 0
  }
  contactPage = 0
  listOfContacts:any
  editData:any

  ngOnInit() {
    this.getData()
  }

  addContact(message: any) {
    console.log(message);
    this.contactPage = 0;
    this.editData = null;
    this.ngOnInit()
  }
  getData(){
    this.http.getapi('api/Contacts/GetContacts').subscribe((res) => {
        console.log(res);
        this.listOfContacts=res.data
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
  deleteContact(ID:any){
    this.http.deleteapi('api/Contacts/DeleteContacts/'+ID).subscribe((res) => {
      this.snackBar.open('Contact successfully Deleted!', 'Close', {
        duration: 3000, // Snackbar stays open for 3 seconds
      });
        console.log(res);
        this.listOfContacts=res
        this.ngOnInit()
      }
    );
  }
  edit(data:any){
    this.contactPage=1;
    this.editData=data
  }
}
