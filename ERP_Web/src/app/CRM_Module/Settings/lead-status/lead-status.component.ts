import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-lead-status',
  templateUrl: './lead-status.component.html',
  styleUrl: './lead-status.component.css'
})
export class LeadStatusComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  p:number=1;
  statuses : any;
  myForm: FormGroup=new FormGroup({
    id:new FormControl(<Number>(0)),
    stageId:new FormControl(''),
    description:new FormControl('')

  });
  Stagelist: any;
  statusId:any;
  constructor(private fb: FormBuilder, private http: BackendService,private router:Router,private ActivatedRoute:ActivatedRoute) {
    this.ActivatedRoute.queryParamMap.subscribe((params) => {
      this.statusId = params.get('statusid');
     
    });
    debugger;
    if(this.statusId>0){
      this.http.getapi('api/Common/GetStatusById/'+this.statusId).subscribe((res) => {
        console.log(res);
        debugger;
        this.myForm.patchValue(res.data);
        // this.myForm.get("stageId")?.setValue(res.data.stageId);
        
        // this.myForm.get("description")?.setValue(res.data.description);
       
      });
    }

    // Initialize the form group with form controls and validators
    // this.myForm = this.fb.group({
    //   addcountry: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-]+$')]]
    // });
  }
 
  onTableDataChange(event: any) {
    this.page = event;
    this.getstatusList();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getstatusList();
  }
  

  onSubmit() {
    
    if(this.statusId>0){
      this.myForm.get("id")?.setValue(this.statusId);
    this.http.putapi('api/Common/UpdateStatus',this.myForm.getRawValue()).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/CRM/Settings/statuslist'])
      this.resetvalues();
      this.getstatusList();
     
    });
  }
  else{
    this.http.postapi('api/Common/AddStatus',this.myForm.getRawValue()).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/CRM/Settings/statuslist'])
      this.resetvalues();
      this.getstatusList();
    
    });
    debugger;
  
  }
  }
  resetvalues(){
    this.myForm.get("stageId")?.setValue(null);
      
    this.myForm.get("description")?.setValue(null);
  }
  getstatusbyId(){
   
  }
  
  close() {
    console.log('field closed');
    }

   
    ngOnInit(){
      this.getSatage();
      this.getstatusList();
      
     
    }
    getstatusList(){
      this.http.getapi('api/Common/GetStatus').subscribe((res) => {
        console.log(res);
        this.statuses = res.data
      });
    }

    getSatage() {
      this.http.getapi('api/Common/GetStages').subscribe((res) => {
        debugger;
        this.Stagelist = res;
      });
    }
}
