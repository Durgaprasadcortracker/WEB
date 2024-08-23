import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-statusdesign',
  templateUrl: './statusdesign.component.html',
  styleUrl: './statusdesign.component.css'
})
export class StatusdesignComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  tableSizes: any = [20, 40, 60, 80];
  p:number=1;

  statusForm : any;
  Statuslist :any;
  Stagelist: any;
  statusId:any;
  submitted: any;

  statuses : any;
 
  constructor(
    private fb: FormBuilder, 
    private http: BackendService,
    private router: Router,
    private ActivatedRoute:ActivatedRoute
  ) {
    this.ActivatedRoute.queryParamMap.subscribe((params) => {
      this.statusId = params.get('statusid');
      console.log(this.statusId);
      if (this.statusId > 0) {
        this.getstatusbyId(this.statusId)
      }
    });
  }

  myForm: FormGroup=new FormGroup({
    id:new FormControl(<Number>(0)),
    stageId:new FormControl(''),
    description:new FormControl('')

  });

  ngOnInit(): void {
    this.getStage();
    this.getstatus();
    
    this.statusForm = this.fb.group({
      id: [0],
      description: [null, Validators.required],
      stageId: [null, Validators.required]
    });
    this.getapi();
  }
 
  getapi(): void {
    this.http.getapi('api/Common/GetStatus').subscribe((res) => {
      this.Statuslist = res.data;
    }, (error) => {
      console.error('Error fetching Status', error);
    });
  }

  submitForm(): void {
    this.submitted = true;
    console.log(this.statusForm.value);
    const _ID = this.statusForm.value.id
    if (this.statusForm.invalid) {
      return;
    }
    if (_ID > 0) {
      this.http.putapi('api/Common/UpdateStatus', this.statusForm.value).subscribe((res) => { 
        this.clear();
      }, (error) => {
        console.error('Error updating Status', error);
      });
    } else {
      this.http.postapi('api/Common/AddStatus', this.statusForm.value).subscribe(() => { 
        this.clear();
      }, (error) => {
        console.error('Error adding Status', error);
      });
    }
  }
   
 
  getstatusbyId(id: any){
    this.http.getapi('api/Common/GetStatusById/'+id).subscribe((res) => {
      console.log(res);
      
      this.myForm.get("statusid")?.setValue(res.data.statusid);
      this.statusForm.patchValue(res.data);
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.statusForm.controls;
  }
  
 

    
    getStage(): void {
      this.http.getapi('api/Common/GetStages').subscribe((res) => {
        this.Stagelist = res.data;
      }, (error) => {
        console.error('Error fetching stages', error);
      });
    }


    getstatus(){
      this.http.getapi('api/Common/GetStatus').subscribe((res)=> {
        console.log(res);
        this.statuses = res.data
      });
    }

    deletestatus(id: number): void {
      this.http.deleteapi(`api/Common/DeleteStatus/${id}`).subscribe(() => {
        console.log('Status deleted successfully');
        this.ngOnInit()
        this.getapi();
      }, (error) => {
        console.error(`Error deleting Status with id ${id}`, error);
      });
    }
  
    clear(): void {
      this.submitted = false;
      this.statusForm.reset();
      this.ngOnInit()
      this.router.navigate(['/CRM/Settings/status']);
    }


    onTableDataChange(event: any) {
      this.page = event;
      this.Statuslist();
    }
    onTableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.Statuslist();
    }

}