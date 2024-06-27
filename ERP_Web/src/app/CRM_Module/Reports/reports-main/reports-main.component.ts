import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reports-main',
  templateUrl: './reports-main.component.html',
  styleUrls: ['./reports-main.component.css']
})

export class ReportsMainComponent implements OnInit {
  reportForm: FormGroup;
  performanceData: any[] = [];

  constructor(private fb: FormBuilder, private http: BackendService) {
    this.reportForm = this.fb.group({
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
      salesOwnerName: [null],
      salesOwnerId: [null]
    });
  }

  ngOnInit(): void { }

  onSearch(): void {
    if (this.reportForm.invalid) {
      return;
    }

    const formValues = this.reportForm.value;
    const salesTeamPerformance = {
      FromDate: formValues.fromDate,
      ToDate: formValues.toDate,
      SalesOwnerName: formValues.salesOwnerName,
      SalesOwnerId: formValues.salesOwnerId
    };

    this.http.getapi('api/Common/GetSalesTeamPerformance').subscribe(data => {
      this.performanceData = data;
    }, error => {
      console.error('Error fetching performance data', error);
    });
  }

  onClear(): void {
    this.reportForm.reset();
    this.performanceData = [];
  }
}
// export class ReportsMainComponent implements OnInit {

//   Lists: any[] = []; // Initialize Lists as an empty array or with actual data
//   filteredLists: any[] = []; // To hold filtered data
//   reportlist: any[] = []; // Initialize reportlist as an empty array
//   fromDate: string | undefined;
//   toDate: string | undefined;
//   selectedSalesOwner: any;

//   constructor(private backendService: BackendService) {}

//   ngOnInit() {
//     this.fetchData();
//     this.fetchSalesOwners(); // Assuming you have a method to fetch sales owners
//   }

//   fetchData() {
//     // Replace 'your-api-endpoint' with your actual API endpoint
//     this.backendService.getapi('api/Common/GetSalesTeamPerformance')
//       .subscribe(data => {
//         this.Lists = data; // Assign API response to Lists
//         this.filteredLists = this.Lists; // Initially show all data
//       }, error => {
//         console.error('Error fetching data: ', error);
//         // Handle error as needed (e.g., show error message)
//       });
//   }

//   fetchSalesOwners() {
//     // Assuming an API call to fetch sales owners
//     this.backendService.getapi('sales-owners-endpoint')
//       .subscribe(data => {
//         this.reportlist = data; // Assign API response to reportlist
//       }, error => {
//         console.error('Error fetching sales owners: ', error);
//         // Handle error as needed (e.g., show error message)
//       });
//   }

//   applyFilters() {
//     // Apply filters based on fromDate, toDate, and selectedSalesOwner
//     // Modify this method based on your specific filter requirements
//     console.log('Apply filters:', this.fromDate, this.toDate, this.selectedSalesOwner);
//     // Example filter implementation:
//     if (this.fromDate && this.toDate) {
//       const fromDateObj = new Date(this.fromDate);
//       const toDateObj = new Date(this.toDate);
//       this.filteredLists = this.Lists.filter(item => {
//         const itemDate = new Date(item.dateField); // Adjust 'dateField' as per your API response
//         return itemDate >= fromDateObj && itemDate <= toDateObj;
//       });
//     } else {
//       this.filteredLists = this.Lists;
//     }
//   }

//   clearFilters() {
//     this.fromDate = undefined;
//     this.toDate = undefined;
//     this.selectedSalesOwner = undefined;
//     this.filteredLists = this.Lists; // Reset filtered data to all data
//   }
// }
