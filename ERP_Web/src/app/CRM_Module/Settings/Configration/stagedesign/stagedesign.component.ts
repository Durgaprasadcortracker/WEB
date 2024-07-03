import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stagedesign',
  templateUrl: './stagedesign.component.html',
  styleUrl: './stagedesign.component.css'
})
export class StagedesignComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  p:number=1;
  
  myForm: FormGroup=new FormGroup({
    id:new FormControl(<Number>(0)),
    stageId:new FormControl(''),
    description:new FormControl('')

  });
  stageForm: any;
  stageId: any;
  StageList: any;
  submited: any;

 
  constructor(
    private fb: FormBuilder,
    private http: BackendService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.stageId = params.get('stageid'); 
      console.log(this.stageId);
      if (this.stageId > 0) {
        this.getStageById(this.stageId)
      }
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.StageList();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.StageList();
  }

  ngOnInit(): void {
    this.stageForm = this.fb.group({
      id: [0],
      description: [null, Validators.required]
    });
    this.getapi();
  }

  getapi(): void {
    this.http.getapi('api/Common/GetStages').subscribe((res) => {
      this.StageList = res.data;
    }, (error) => {
      console.error('Error fetching stages', error);
    });
  }

  submitForm(): void {
    this.submited = true;
    console.log(this.stageForm.value);
    const _ID = this.stageForm.value.id
    if (this.stageForm.invalid) {
      return;
    }
    if (_ID > 0) {
      this.http.putapi(`api/Common/UpdateStage`, this.stageForm.value).subscribe((res) => { 
        this.clear();
      }, (error) => {
        console.error('Error updating Stage', error);
      });
    } else {
      this.http.postapi('api/Common/AddStage', this.stageForm.value).subscribe(() => { 
        this.clear();
      }, (error) => {
        console.error('Error adding stage', error);
      });
    }
   
  }
 

  getStageById(Id: any)   {
    this.http.getapi('api/Common/GetStage/' + Id).subscribe((res) => { 
      console.log(res);
      this.stageForm.patchValue(res.data);
    
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.stageForm.controls;
  }

  deleteStage(id: number): void {
    this.http.deleteapi(`api/Common/DeleteStage/${id}`).subscribe(() => { 
      console.log('Stage deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deleting stage with id ${id}`, error);
    });
  }

  clear(): void {
    this.stageForm.reset();
    this.submited = false;
    this.ngOnInit()
    this.router.navigate(['/CRM/Settings/stage']);
  }
}