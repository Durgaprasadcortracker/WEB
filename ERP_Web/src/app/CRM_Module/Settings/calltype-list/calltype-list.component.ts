import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-calltype-list',
  templateUrl: './calltype-list.component.html',
  styleUrl: './calltype-list.component.css'
})
export class CalltypeListComponent {
  calltypeForm: any; 
  CalltypeList: any;
  calltypeId: any;
  submited: any;
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
      this.calltypeId = params.get('calltypeid');
      console.log(this.calltypeId);
      
    });
  }
  ngOnInit(): void {
  
    this.getcallTypes();
  }
  getcallTypes(): void {
    this.http.getapi('api/Common/GetCallTypes').subscribe((res) => {
      this.CalltypeList = res.data;
    }, (error) => {
      console.error('Error fetching calltypes', error);
    });
  }
  deleteCalltype(id: number): void { 
    this.http.deleteapi(`api/Common/CallType/${id}`).subscribe(() => { 
      console.log('Calltype deleted successfully');
      this.getcallTypes();
    }, (error) => {
      console.error(`Error deleting calltype with id ${id}`, error);
    });
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getcallTypes();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getcallTypes();
  }
}
