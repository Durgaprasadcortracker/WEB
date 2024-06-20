import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-statusdesign',
  templateUrl: './statusdesign.component.html',
  styleUrl: './statusdesign.component.css'
})
export class StatusdesignComponent {
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
  constructor(private fb: FormBuilder, private http: BackendService,private ActivatedRoute:ActivatedRoute) {
    this.ActivatedRoute.queryParamMap.subscribe((params) => {
      this.statusId = params.get('statusid');
     
    });
    if(this.statusId>0){
      this.getstatusbyId();
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
     
    });
  }
  else{
    this.http.postapi('api/Common/AddStatus',this.myForm.getRawValue()).subscribe((res) => {
      console.log(res);
     
    });
    debugger;
  
  }
  }
  getstatusbyId(){
    this.http.getapi('api/Common/GetStatusById/'+this.statusId).subscribe((res) => {
      console.log(res);
      debugger;
      this.myForm.get("stageId")?.setValue(res.data.stageId);
      
      this.myForm.get("description")?.setValue(res.data.description);
     
    });
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
