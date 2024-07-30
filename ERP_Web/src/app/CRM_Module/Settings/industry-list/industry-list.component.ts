import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrl: './industry-list.component.css'
})
export class IndustryListComponent {
  industryForm: any; // Updated form variable
  IndustryList: any; // Updated list variable
  submited: any;
  industryid: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  p:number=1;
  constructor(
    private fb: FormBuilder, 
    private http: BackendService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.industryid = params.get('industryid');
      console.log(this.industryid);
      
    });
  }
  ngOnInit(){
    this.getIndustrylist();
  }
  getIndustrylist(): void {
    this.http.getapi('api/Common/GetIndustry').subscribe((res) => {
      this.IndustryList = res.data;
    }, (error) => {
      console.error('Error fetching industries', error);
    });
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getIndustrylist();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getIndustrylist();
  }
  deleteIndustry(id: number): void {
    this.http.deleteapi(`api/Common/DeleteIndustry/${id}`).subscribe(() => { 
      console.log('Industry deleted successfully');
      this.getIndustrylist();
    }, (error) => {
      console.error(`Error deleting industry with id ${id}`, error);
    });
  }

}
