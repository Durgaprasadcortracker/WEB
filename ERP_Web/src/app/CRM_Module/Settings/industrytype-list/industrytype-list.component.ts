import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'console';
@Component({
  selector: 'app-industrytype-list',
  templateUrl: './industrytype-list.component.html',
  styleUrl: './industrytype-list.component.css'
})
export class IndustrytypeListComponent {
  industrytypeForm: any;
  IndustrytypeList: any; 
  industrytypeId:any;
  submitted:any;
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
      this.industrytypeId = params.get('industrytypeid'); 
      console.log(this.industrytypeId);
      
    });
  }
  getIndustryTypes(): void {
    this.http.getapi('api/Common/GetIndustrytype').subscribe((res) => {
      this.IndustrytypeList = res.data;
    }, (error) => {
      console.error('Error fetching industrytypes', error);
    });
  }
  ngOnInit(): void {
   
    this.getIndustryTypes();
  }
  deleteIndustrytype(id: number): void {
    this.http.deleteapi(`api/Common/DeleteIndustryType/${id}`).subscribe(() => {
      console.log('Industrytype deleted successfully');
      this.getIndustryTypes();
    }, (error) => {
      console.error(`Error deleting industrytype with id ${id}`, error);
    });
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getIndustryTypes();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getIndustryTypes();
  }

}
