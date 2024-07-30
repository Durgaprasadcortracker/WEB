import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-lead-stage',
  templateUrl: './lead-stage.component.html',
  styleUrl: './lead-stage.component.css'
})
export class LeadStageComponent {
close() {
throw new Error('Method not implemented.');
}
  stageForm: any=FormGroup;
  stagelist: any;
  currentStageId = 0;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  p:number=1;
  Stagelist: any;
 
  constructor(
    private fb: FormBuilder,private http: BackendService, private router: Router,private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.stageId = params.get('stageid'); 
    });

    this.stageForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.stageForm = new FormGroup({
      id: new FormControl(<Number>(0)),
      description: new FormControl('')
    });
    this.getapi();
    if(this.stageId>0){
      this.getStageById();
     
    }
  }

  getapi(): void {
    this.http.getapi('api/Common/GetStages').subscribe((res) => {
      this.stagelist = res;
    }, (error) => {
      console.error('Error fetching stages', error);
    });
  }
  Id:any;
  submitForm(): void {
    debugger;
    this.currentStageId=this.stageId;
    this.stageForm.get("id").setValue(this.stageId)
    const formData = this.stageForm.getRawValue();
    if (this.currentStageId > 0) {
    
      this.http.putapi('api/Common/UpdateStage', formData).subscribe(() => { // Updated API endpoint
        console.log('Stage updated successfully');
        this.router.navigate(['/CRM/Settings/leadstagelist']);
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error updating stage', error);
      });
    } else {
      this.http.postapi('api/Common/AddStage', { description: formData.description }).subscribe(() => { // Updated API endpoint
        console.log('Stage added successfully');
        this.router.navigate(['/CRM/Settings/leadstagelist']);
        debugger
        this.getapi();
        this.resetForm();
        
      }, (error) => {
        console.error('Error adding stage', error);
      });
    }
   
  }
  stageId: any;
  edit(id: number): void {
    this.currentStageId = id;
    this.getStageById();
  }

  getStageById(): void {
    this.http.getapi(`api/Common/GetStage/${this.stageId}`).subscribe((res) => { 
      debugger;
      this.stageForm.patchValue({
        id: res.data.stageId, 
        description: res.data.description
      });
    }, (error) => {
      console.error('Error fetching stage details', error);
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getapi();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getapi();
  }
  
  deleteStage(id: number): void {
    this.http.deleteapi(`api/Common/stage/${id}`).subscribe(() => { 
      console.log('Stage deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deleting stage with id ${id}`, error);
    });
  }

  resetForm(): void {
    this.stageForm.reset({ id: 0, description: '' });
    this.currentStageId = 0;
  }
}
