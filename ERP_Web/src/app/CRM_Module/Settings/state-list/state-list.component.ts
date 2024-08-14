import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrl: './state-list.component.css'
})
export class StateListComponent {
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
  stateId:any;
  constructor(private fb: FormBuilder,
     private http: BackendService,
     private ActivatedRoute:ActivatedRoute,
     private router: Router
    ) {
    this.ActivatedRoute.queryParamMap.subscribe((params) => {
      this.stateId = params.get('statusid');
     
    });
    if(this.stateId>0){
      this.http.getapi('api/Common/GetStatusById/'+this.stateId).subscribe((res) => {
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
    this.getstatesList();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getstatesList();
  }
  

  onSubmit() {
    
    if(this.stateId>0){
      this.myForm.get("id")?.setValue(this.stateId);
    this.http.putapi('api/Common/UpdateStatus',this.myForm.getRawValue()).subscribe((res) => {
      console.log(res);
      this.resetvalues();
      this.getstatesList();
     
    });
  }
  else{
    this.http.postapi('api/Common/AddStatus',this.myForm.getRawValue()).subscribe((res) => {
      console.log(res);
      this.resetvalues();
      this.getstatesList();
    });
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
      this.getCountry();
      this.getstatesList();
    }
    getstatesList(){
      this.http.getapi('api/Common/GetStates').subscribe((res) => {
        console.log(res);
        this.statuses = res.data
      });
    }
    deleteStates(id:any){
      this.http.deleteapi('api/Common/state/'+id).subscribe((res) => {
        console.log(res);
       this.getstatesList();
      });
    }
    getCountry() {
      this.http.getapi('api/Common/GetCountries').subscribe((res) => {
        this.Stagelist = res;
      });
    }
    edit(Id: any) {
      this.router.navigate(['/CRM/AddState', Id]);
    }
}
