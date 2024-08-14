import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-industrytype-list',
  templateUrl: './industrytype-list.component.html',
  styleUrl: './industrytype-list.component.css'
})
export class IndustrytypeListComponent {

  industrytypeId: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  IndustrytypeList: any = [];

  constructor(
    private http: BackendService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.industrytypeId = params.get('industrytypeid'); 
      console.log(this.industrytypeId);
    });
  }

  ngOnInit(): void {
    this.getIndustryTypes();
  }

  getIndustryTypes(): void {
    this.http.getapi('api/Common/GetIndustrytype').subscribe((res) => {
      this.IndustrytypeList = res.data;
      this.count = res.data.length;
    }, (error) => {
      console.error('Error fetching industrytypes', error);
    });
  }

  deleteIndustrytype(id: number): void {
    this.http.deleteapi(`api/Common/DeleteIndustryType/${id}`).subscribe(() => {
      console.log('Industrytype deleted successfully');
      this.getIndustryTypes();
      this.snackBar.open('Industry Type Deleted successfully!', 'Close', {
        duration: 3000, // Snackbar stays open for 3 seconds
      });
    }, (error) => {
      console.error(`Error deleting industrytype with id ${id}`, error);
    });
  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.getIndustryTypes();
  }

  getSerialNumber(index: number): number {
    return (this.page - 1) * this.tableSize + index + 1;
  }

}
