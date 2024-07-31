import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-timezone-list',
  templateUrl: './timezone-list.component.html',
  styleUrls: ['./timezone-list.component.css']
})
export class TimezoneListComponent implements OnInit {
  // timezoneId: any;
  // page: number = 1;
  // count: number = 0;
  // tableSize: number = 5;
  // tableSizes: any = [5, 10, 15, 20];
  // p: number = 1;
  // Timezonelist: any;

  // constructor(
  //   private fb: FormBuilder,
  //   private http: BackendService,
  //   private router: Router,
  //   private ActivatedRoute: ActivatedRoute,
  //   private snackBar: MatSnackBar,
  // ) {
  //   this.ActivatedRoute.queryParamMap.subscribe((params) => {
  //     this.timezoneId = params.get('timezoneId');
  //     console.log(this.timezoneId);
  //   });
  // }

  // ngOnInit() {
  //   this.gettimezonelist();
  // }

  // deleteTimezone(id: number): void {
  //   this.http.deleteapi(`api/Common/timezones/${id}`).subscribe(() => {
  //     console.log('Timezone deleted successfully');
  //     this.gettimezonelist();
  //     this.snackBar.open('Time Zone Deleted successfully!', 'Close', {
  //       duration: 3000, // Snackbar stays open for 3 seconds
  //     });
  //   }, (error) => {
  //     console.error(`Error deleting timezone with id ${id}`, error);
  //   });
  // }

  // gettimezonelist(): void {
  //   this.http.getapi('api/Common/GetTimezones').subscribe((res) => {
  //     this.Timezonelist = res.data;
  //     this.count = res.data.length;  // Update the count for pagination
  //   }, (error) => {
  //     console.error('Error fetching timezones', error);
  //   });
  // }

  // onTableDataChange(event: any) {
  //   this.page = event;
  //   this.gettimezonelist();
  // }

  // onTableSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.gettimezonelist();
  // }
  timezoneId: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  Timezonelist: any = [];

  constructor(
    private http: BackendService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.ActivatedRoute.queryParamMap.subscribe((params) => {
      this.timezoneId = params.get('timezoneId');
    });
  }

  ngOnInit(): void {
    this.gettimezonelist();
  }

  deleteTimezone(id: number): void {
    this.http.deleteapi(`api/Common/timezones/${id}`).subscribe(() => {
      this.gettimezonelist();
      this.snackBar.open('Time Zone Deleted successfully!', 'Close', {
               duration: 3000, // Snackbar stays open for 3 seconds
         });
    }, (error) => {
      console.error(`Error deleting timezone with id ${id}`, error);
    });
  }

  gettimezonelist(): void {
    this.http.getapi('api/Common/GetTimezones').subscribe((res) => {
      this.Timezonelist = res.data;
      this.count = res.data.length;
    }, (error) => {
      console.error('Error fetching timezones', error);
    });
  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.gettimezonelist();
  }

  getSerialNumber(index: number): number {
    return (this.page - 1) * this.tableSize + index + 1;
  }
}
