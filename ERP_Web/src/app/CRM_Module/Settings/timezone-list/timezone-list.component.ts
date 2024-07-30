import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-timezone-list',
  templateUrl: './timezone-list.component.html',
  styleUrls: ['./timezone-list.component.css']
})
export class TimezoneListComponent implements OnInit {
  timezoneId: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  p: number = 1;
  Timezonelist: any;

  constructor(
    private fb: FormBuilder,
    private http: BackendService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute
  ) {
    this.ActivatedRoute.queryParamMap.subscribe((params) => {
      this.timezoneId = params.get('timezoneId');
      console.log(this.timezoneId);
    });
  }

  ngOnInit() {
    this.gettimezonelist();
  }

  deleteTimezone(id: number): void {
    this.http.deleteapi(`api/Common/timezones/${id}`).subscribe(() => {
      console.log('Timezone deleted successfully');
      this.gettimezonelist();
    }, (error) => {
      console.error(`Error deleting timezone with id ${id}`, error);
    });
  }

  gettimezonelist(): void {
    this.http.getapi('api/Common/GetTimezones').subscribe((res) => {
      this.Timezonelist = res.data;
      this.count = res.data.length;  // Update the count for pagination
    }, (error) => {
      console.error('Error fetching timezones', error);
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.gettimezonelist();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.gettimezonelist();
  }
}
